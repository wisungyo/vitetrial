import { TextInput } from "@/ltc-core/block";
import { Button } from "@/ltc-core/ui";
import { formatAsMoney } from "@/utils/formatter/moneyFormatter";
import { useModal } from "@/utils/hooks/useModal";
import Link from "next/link";
import { useState } from "react";

type TypeCheckoutOrderSummary = {
  data: any;
  confirmOrder: () => void;
};

export default function CheckoutOrderSummary({
  data,
  confirmOrder,
}: TypeCheckoutOrderSummary) {
  const { openComingSoonModal } = useModal();
  const [coupon, setCoupon] = useState("");
  const total = data?.subTotal;
  const totalWithTax = data?.subTotalWithTax;
  const tax = totalWithTax - total;
  const taxPercentage = Math.floor((tax / total) * 100);

  const applyCoupon = () => {
    openComingSoonModal();
  };

  return (
    <div className="flex flex-col gap-2 m-4 px-3 py-6 mt-6 border rounded-xl">
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-xl">Order Summary</p>
        <p className="text-sm">(Items: {data.totalQuantity})</p>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <p className="text-sm text-neutral-900">Item Subtotal</p>
        <p className="text-sm text-neutral-900">
          {data.currencyCode} {formatAsMoney(data.subTotalWithTax)}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-neutral-900">Delivery</p>
        <p className="text-sm text-neutral-900">
          {data.currencyCode} {formatAsMoney(data.shipping)}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-neutral-900">
          GST ({taxPercentage}%, included)
        </p>
        <p className="text-sm text-neutral-900">
          {data.currencyCode} {formatAsMoney(tax)}
        </p>
      </div>

      <div className="h-[1px] bg-neutral-200 my-2" />

      <div className="flex flex-row gap-3 pb-1">
        <div className="flex-1">
          <TextInput
            label=""
            placeholder="Enter Promo Code"
            value={coupon}
            handleChange={setCoupon}
          />
        </div>
        <div className="mt-1" onClick={applyCoupon}>
          <Button variant="secondary">Apply</Button>
        </div>
      </div>

      <div className="h-[1px] bg-neutral-200 my-2" />

      <div className="flex flex-row justify-between">
        <p className="text-lg text-neutral-900 font-bold">Total</p>
        <p className="text-lg text-neutral-900 font-bold">
          {data.currencyCode} {formatAsMoney(data.totalWithTax)}
        </p>
      </div>

      <div className="h-[1px] bg-neutral-200 my-2" />

      <Button className="w-full" onClick={confirmOrder}>
        Place Order
      </Button>
      <p className="mt-2 text-[10px] text-neutral-900 text-center italic">
        By placing this order, you agree to our{" "}
        <Link href="#">
          <span className="text-primary-700 underline">
            Terms and Conditions
          </span>
        </Link>{" "}
        and our{" "}
        <Link href="#">
          <span className="text-primary-700 underline">Privacy Policy</span>
        </Link>
        .
      </p>
    </div>
  );
}
