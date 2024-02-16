import { useEffect, useState } from "react";
import CheckoutAddress from "../Section/CheckoutAddress";
import CheckoutDelivery from "../Section/CheckoutDelivery";
import CheckoutOrderListing from "../Section/CheckoutOrderListing";
import CheckoutOrderSummary from "../Section/CheckoutOrderSummary";
import CheckoutPayment from "../Section/CheckoutPayment";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ACTIVE_ORDER } from "@/graphql/documents/orders";
import { ACTIVE_CUSTOMER } from "@/graphql/documents/accounts";
import {
  ADD_PAYMENT_TO_ORDER,
  ELIGIBLE_PAYMENT_METHODS,
  ELIGIBLE_SHIPPING_METHODS,
  NEXT_ORDER_STATES,
  TRANSITION_ORDER_TO_STATE,
} from "@/graphql/documents/payment";
import { useModal } from "@/utils/hooks/useModal";
import { useAlert } from "@/utils/hooks/useAlert";
import SharedExecutiveModal from "@/components/Shared/Modal/SharedExecutiveModal";
import { useRouter } from "next/router";

type TypeAddress = {
  fullName: String;
  company: String;
  streetLine1: String;
  streetLine2: String;
  city: String;
  province: String;
  postalCode: String;
  countryCode: String;
  phoneNumber: String;
};

export default function CheckoutBody() {
  const router = useRouter();
  const { openModal } = useModal();
  const { openAlert } = useAlert();

  const activeOrderProps = useQuery(ACTIVE_ORDER);
  const activeCustomerProps = useQuery(ACTIVE_CUSTOMER);
  const eligiblePaymentMethodsProps = useQuery(ELIGIBLE_PAYMENT_METHODS);
  const eligibleShippingMethodsProps = useQuery(ELIGIBLE_SHIPPING_METHODS);
  const [nextOrderStates, nextOrderStatesProps] =
    useLazyQuery(NEXT_ORDER_STATES);
  const [transitionOrderToState, transitionOrderToStateProps] = useMutation(
    TRANSITION_ORDER_TO_STATE
  );
  const [addPaymentToOrder, addPaymentToOrderProps] =
    useMutation(ADD_PAYMENT_TO_ORDER);

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [delivery, setDelivery] = useState("");
  const [address, setAddress] = useState<TypeAddress>({
    fullName: "",
    company: "",
    streetLine1: "",
    streetLine2: "",
    city: "",
    province: "",
    postalCode: "",
    countryCode: "",
    phoneNumber: "",
  });

  const activeOrder = activeOrderProps.data?.activeOrder;
  const activeOrderLines = activeOrder?.lines || [];

  const addresses = activeCustomerProps.data?.activeCustomer?.addresses;
  const deliveries =
    eligibleShippingMethodsProps.data?.eligibleShippingMethods || [];
  const payments =
    eligiblePaymentMethodsProps.data?.eligiblePaymentMethods || [];

  useEffect(() => {
    console.log("recall");
    activeOrderProps.refetch();
  }, [activeCustomerProps.data, payment, address, delivery]);

  const handleSetDelivery = (id: string) => {
    console.log("setDelivery:", id);
    setDelivery(id);
  };

  const confirmOrder = async () => {
    console.log("selected address:", address);
    console.log("selected delivery:", delivery);
    console.log("selected payment:", payment);
    console.log(activeOrderProps.data);

    if (!address.fullName || !delivery || !payment) {
      openModal(
        "Cannot proceed to checkout",
        "Please make sure you have selected address, delivery, and shipping method before doing checkout.",
        "singleButton",
        "",
        "Okay"
      );
    }

    try {
      const response = await nextOrderStates();

      if (response?.data?.nextOrderStates.includes("ArrangingPayment")) {
        const responseTransition = await transitionOrderToState({
          variables: { state: "ArrangingPayment" },
        });
        const statusTransition =
          responseTransition.data?.transitionOrderToState?.__typename;

        if (statusTransition === "OrderStateTransitionError") {
          openAlert(
            responseTransition.data?.transitionOrderToState?.message,
            "error"
          );
          return;
        }

        const responsePayment = await addPaymentToOrder({
          variables: {
            method: payment,
            metadata: { id: "ovo sample" },
          },
        });

        const statusPayment =
          responsePayment.data?.addPaymentToOrder.__typename;

        if (
          statusPayment === "OrderPaymentStateError" ||
          statusPayment === "IneligiblePaymentMethodError" ||
          statusPayment === "OrderStateTransitionError" ||
          statusPayment === "NoActiveOrderError"
        ) {
          openAlert(responsePayment.data?.addPaymentToOrder?.message, "error");
          return;
        }

        setIsModalSuccessOpen(true);
      }
    } catch (error: any) {
      openAlert(error.message, "error");
    }
  };

  const goHome = () => {
    router.push("/");
  };

  if (
    activeOrderProps.error ||
    activeCustomerProps.error ||
    eligiblePaymentMethodsProps.error ||
    eligibleShippingMethodsProps.error ||
    !activeOrderProps.data?.activeOrder
  )
    return null;

  return (
    <>
      {!activeOrderProps.loading &&
        !activeCustomerProps.loading &&
        !eligiblePaymentMethodsProps.loading &&
        !eligibleShippingMethodsProps.loading && (
          <>
            <CheckoutOrderListing data={activeOrderLines} />
            <CheckoutAddress data={addresses} handleSetAddress={setAddress} />
            <CheckoutDelivery
              data={deliveries}
              currencyCode={activeOrder?.currencyCode}
              handleDelivery={handleSetDelivery}
            />
            <CheckoutPayment data={payments} handlePayment={setPayment} />
            <CheckoutOrderSummary
              data={activeOrderProps.data?.activeOrder}
              confirmOrder={confirmOrder}
            />

            <SharedExecutiveModal
              isOpen={isModalSuccessOpen}
              closeModal={goHome}
              title="Checkout Success"
              body="Your items are checked out successfully. Next, please proceed the payment!"
              buttonSecondaryText="Close"
              buttonPrimaryText="Okay"
              onConfirm={goHome}
            />
          </>
        )}
    </>
  );
}
