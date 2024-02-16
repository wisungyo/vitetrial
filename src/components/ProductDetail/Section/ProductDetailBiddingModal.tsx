import { QuantitySelectorRounded } from "@/ltc-core/block";
import { Button, Modal } from "@/ltc-core/ui";
import { useModal } from "@/utils/hooks/useModal";
import { SfIconClose } from "@storefront-ui/react";
import { useState } from "react";

type TypeProductDetailBiddingModal = {
  isOpen?: boolean;
  toggleModal?: (isOpen: boolean) => void;
  productName?: string;
  productDescription?: string;
  currencyCode?: string;
  productPrice?: number;
};

export default function ProductDetailBiddingModal({
  isOpen = false,
  toggleModal = (isOpen) => {},
  productName = "iPhone 15 Pro Max",
  productDescription = "Brand New, 256GB, Dark Purple",
  currencyCode = "USG",
  productPrice = 988,
}: TypeProductDetailBiddingModal) {
  const { openComingSoonModal } = useModal();

  const confirmBid = () => {
    toggleModal(false);
    openComingSoonModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => toggleModal(false)}
      as="section"
      className="max-w-[90%] md:max-w-lg"
    >
      <header>
        <Button
          square
          variant="tertiary"
          className="absolute right-2 top-2"
          onClick={() => toggleModal(false)}
        >
          <SfIconClose />
        </Button>
        <h3
          id="promoModalTitle"
          className="font-bold typography-headline-4 md:typography-headline-3 text-center"
        >
          Placing bid for
        </h3>
      </header>

      <div className="flex flex-col gap-1">
        <p className="mt-6 text-xl font-bold text-center">{productName}</p>
        <p className="text-center">{productDescription}</p>
      </div>

      <div className="flex flex-col gap-1 text-center mt-6 text-gray-600">
        <p>Your max bid</p>
        <p className="text-xs">(Does not include shipping or GST)</p>
      </div>

      <div className="flex justify-center mt-4">
        <QuantitySelectorRounded
          min={productPrice + 5}
          max={2000}
          currencyCode={currencyCode}
          initValue={productPrice + 5}
          increment={5}
        />
      </div>
      <footer className="flex mt-10">
        <Button className="w-full" onClick={confirmBid}>
          Confirm Bid
        </Button>
      </footer>
    </Modal>
  );
}
