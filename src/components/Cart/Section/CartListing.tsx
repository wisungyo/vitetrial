/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from "@/ltc-core/ui";
import { useEffect, useState } from "react";
import { ProductCardHorizontalCustom } from "@/ltc-core/block";
import { useRouter } from "next/router";
import { formatAsMoney } from "@/utils/formatter/moneyFormatter";
import { useMutation } from "@apollo/client";
import { REMOVE_ORDER_LINE } from "@/graphql/documents/orders";
import { useAlert } from "@/utils/hooks/useAlert";
import { useModal } from "@/utils/hooks/useModal";
import SharedExecutiveModal from "@/components/Shared/Modal/SharedExecutiveModal";

type TypeCartListing = {
  products: any;
};

export default function CartListing({ products }: TypeCartListing) {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { openModal, closeModal } = useModal();
  const [removeOrderLine, { data, loading, error }] =
    useMutation(REMOVE_ORDER_LINE);
  const [currencyCode, setCurrencyCode] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [idToRemove, setIdToRemove] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    products && getTotalPrice();
  }, [products]);

  const getTotalPrice = () => {
    let sumPrice = 0;
    products.forEach((product: any) => {
      sumPrice += product?.linePriceWithTax;
    });
    setTotalPrice(sumPrice);
    setCurrencyCode(products[0]?.productVariant?.currencyCode);
  };

  const removeCartItem = async (id: string) => {
    setIsModalOpen(true);
    setIdToRemove(id);
  };

  const cancelRemoveCartItem = () => {
    setIsModalOpen(false);
    setIdToRemove("");
  };

  const confirmRemoveCartItem = async () => {
    try {
      await removeOrderLine({
        variables: { id: idToRemove },
      });
      openAlert("Item removed from your cart!", "secondary");
    } catch (error: any) {
      openAlert(error.message as string, "error");
    }
    setIsModalOpen(false);
  };

  const goToCheckout = () => {
    router.push("/checkout");
  };

  const renderCartEmpty = () => (
    <div className="w-full py-12">
      <p className="text-center">Upss..</p>
      <p className="text-center">Your cart is empty!</p>
    </div>
  );

  return (
    <div className="p-2 mx-2 pb-6 flex flex-col gap-4 bg-neutral-50 rounded-xl">
      <div>
        {products.length > 0
          ? products.map((item: any) => (
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
                  onClose={() => removeCartItem(item.id)}
                />
              </div>
            ))
          : renderCartEmpty()}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="font-bold text-lg">{products.length} items</span>
          <span className="font-bold text-lg">
            {currencyCode} {formatAsMoney(totalPrice)}
          </span>
        </div>

        <Button
          onClick={goToCheckout}
          className="w-full"
          disabled={products.length <= 0}
        >
          Checkout
        </Button>

        {products.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-center gap-2">
              <img src="/images/car_box.png" alt="shipping" />
              <span className="text-sm text-center text-primary-700">
                Your order qualifies for FREE delivery
              </span>
            </div>
          </div>
        )}
      </div>

      <SharedExecutiveModal
        isOpen={isModalOpen}
        closeModal={cancelRemoveCartItem}
        title="Permanently remove item"
        body="Removing this item will forfeit the bid price and current promotion."
        buttonSecondaryText="Cancel"
        buttonPrimaryText="Remove"
        onConfirm={confirmRemoveCartItem}
      />
    </div>
  );
}
