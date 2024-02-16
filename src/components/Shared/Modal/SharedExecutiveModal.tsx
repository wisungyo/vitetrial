import { Button, Modal } from "@/ltc-core/ui";
import { SfIconClose } from "@storefront-ui/react";

type TypeModalProvider = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  body: string;
  buttonSecondaryText: string;
  buttonPrimaryText: string;
  onConfirm: () => void;
};

export default function SharedExecutiveModal({
  isOpen,
  closeModal,
  title,
  body,
  buttonSecondaryText,
  buttonPrimaryText,
  onConfirm,
}: TypeModalProvider) {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        as="section"
        className="max-w-[90%]"
      >
        <header>
          <Button
            square
            variant="tertiary"
            className="absolute right-2 top-2"
            onClick={closeModal}
          >
            <SfIconClose />
          </Button>
          <h3 className="font-bold typography-headline-4 md:typography-headline-3">
            {title}
          </h3>
        </header>
        <p className="mt-2">{body}</p>
        <footer className="flex justify-end gap-4 mt-8">
          <Button variant="secondary" onClick={closeModal}>
            {buttonSecondaryText}
          </Button>
          <Button onClick={onConfirm}>{buttonPrimaryText}</Button>
        </footer>
      </Modal>
    </>
  );
}
