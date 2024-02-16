import { ProductCardHorizontalCustom } from "@/ltc-core/block";

type TypeCheckoutOrderListing = {
  data: any;
};

export default function CheckoutOrderListing({
  data,
}: TypeCheckoutOrderListing) {
  return (
    <div className="px-4 mt-6">
      <p className="font-bold text-xl">Order Details</p>
      <div>
        {data.length > 0
          ? data.map((item: any) => (
              <div key={item.id}>
                <ProductCardHorizontalCustom
                  title={item?.productVariant?.name}
                  description="Brand New, 1 TB, Natural Titanium, Apple"
                  currencyCode={item?.productVariant?.currencyCode}
                  price={item?.linePriceWithTax}
                  quantity={item?.quantity}
                  biddingRound={new Date().getTime() + 5446000}
                  image={item?.featuredAsset?.preview}
                  label={item.label}
                  status={item.status}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
