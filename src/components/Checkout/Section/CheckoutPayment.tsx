import { SfIconCreditCard } from "@storefront-ui/react";
import { useEffect, useState } from "react";

type TypeCheckoutPayment = {
  data: any;
  handlePayment: any;
};

export default function CheckoutPayment({
  data,
  handlePayment,
}: TypeCheckoutPayment) {
  const [payments, setPayments] = useState<any>([]);

  useEffect(() => {
    preparePayment();
  }, []);

  const preparePayment = () => {
    const paymentsWithIsActive = data.map((payment: any) => ({
      ...payment,
      isActive: false,
    }));
    setPayments(paymentsWithIsActive);
  };

  const handleClickPayment = (id: string) => {
    const updatedPayments = payments.map((payment: any) => ({
      ...payment,
      isActive: payment.id === id,
    }));

    setPayments(updatedPayments);

    const choosenAddress = updatedPayments.find(
      (payment: any) => payment.isActive === true
    );

    handlePayment(choosenAddress.code);
  };

  return (
    <div className="flex flex-col gap-4 px-4 mt-6">
      <p className="font-bold text-xl">Payment Method</p>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        {payments.length > 0
          ? payments.map((item: any) => (
              <div
                key={item.id}
                className={`flex flex-row justify-center items-center rounded-xl border-2 py-8 cursor-pointer ${
                  item.isActive
                    ? "border-[1px] border-primary-700"
                    : "border-[1px] border-gray-300"
                }`}
                onClick={() => handleClickPayment(item.id)}
              >
                <div className="flex flex-row gap-1">
                  <SfIconCreditCard />
                  <p className="font-bold">Pay with {item.name}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
