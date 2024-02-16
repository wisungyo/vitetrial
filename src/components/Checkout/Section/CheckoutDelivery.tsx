import { Radio } from "@/ltc-core/ui";
import { TypeDelivery } from "../constants/types";
import { formatAsMoney } from "@/utils/formatter/moneyFormatter";
import { useMutation } from "@apollo/client";
import { SET_ORDER_SHIPPING_METHOD } from "@/graphql/documents/payment";
import { useAlert } from "@/utils/hooks/useAlert";

type TypeCheckoutDelivery = {
  data: any;
  currencyCode: string | undefined;
  handleDelivery: any;
};

export default function CheckoutDelivery({
  data,
  currencyCode,
  handleDelivery,
}: TypeCheckoutDelivery) {
  const { openAlert } = useAlert();
  const [setOrderShippingMethod, setOrderShippingMethodProps] = useMutation(
    SET_ORDER_SHIPPING_METHOD
  );

  const handleClickPayment = async (id: string) => {
    const response = await setOrderShippingMethod({
      variables: {
        shippingMethodId: [id],
      },
    });

    const status = response.data?.setOrderShippingMethod.__typename;

    if (
      status === "OrderModificationError" ||
      status === "IneligibleShippingMethodError" ||
      status === "NoActiveOrderError"
    ) {
      openAlert(response.data?.setOrderShippingMethod.message, "error");
      return;
    }
    console.log("here");

    handleDelivery(id);
  };

  return (
    <div className="flex flex-col gap-4 px-4 mt-6">
      <p className="font-bold text-xl">Delivery</p>
      <div className="flex flex-col gap-4">
        {data.map((item: any) => (
          <div key={item.id} className="flex flex-row items-center gap-4">
            <Radio
              key={item.id}
              name={item.name}
              value={item.name}
              className="block"
              checked={item.isActive}
              onChange={() => {
                handleClickPayment(item.id);
              }}
            />
            <div className="flex flex-row w-full justify-between">
              <div className="">
                <div className="font-medium">{item.name}</div>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
              <div className="flex flex-row items-center">
                <div className="flex flex-row gap-1">
                  {currencyCode} {formatAsMoney(item.priceWithTax)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
