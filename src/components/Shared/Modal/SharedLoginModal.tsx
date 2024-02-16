import { Button, Modal } from "@/ltc-core/ui";
import { useAppSelector } from "@/redux/store";
import { useModal } from "@/utils/hooks/useModal";
import { SfIconClose } from "@storefront-ui/react";
import { useRouter } from "next/router";

export default function SharedLoginModal() {
  const router = useRouter();
  const { closeModal } = useModal();
  const isOpen = useAppSelector((state) => state.modal.isLoginOpen);
  const title = useAppSelector((state) => state.modal.title);
  const body = useAppSelector((state) => state.modal.body);
  const type = useAppSelector((state) => state.modal.type);
  const buttonSecondaryText = useAppSelector(
    (state) => state.modal.buttonSecondaryText
  );
  const buttonPrimaryText = useAppSelector(
    (state) => state.modal.buttonPrimaryText
  );

  const handleToLoginPage = () => {
    closeModal();
    router.push("/login");
  };

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
          {type === "doubleButton" && (
            <Button variant="secondary" onClick={closeModal}>
              {buttonSecondaryText}
            </Button>
          )}
          <Button onClick={handleToLoginPage}>{buttonPrimaryText}</Button>
        </footer>
      </Modal>
    </>
  );
}
