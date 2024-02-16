import {
  TypeModalButtons,
  setLoginModalIsOpen,
  setModalBody,
  setModalButtonPrimaryText,
  setModalButtonSecondaryText,
  setModalIsOpen,
  setModalTitle,
  setModalType,
} from "@/redux/slices/modalSlice";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export const useModal = () => {
  const dispatch = useDispatch();
  const mTitle = useAppSelector((state) => state.modal.title);
  const mBody = useAppSelector((state) => state.modal.body);
  const mType = useAppSelector((state) => state.modal.type);
  const mButtonSecondaryText = useAppSelector(
    (state) => state.modal.buttonSecondaryText
  );
  const mButtonPrimaryText = useAppSelector(
    (state) => state.modal.buttonPrimaryText
  );

  const openModal = (
    title: string,
    body: string,
    type: TypeModalButtons,
    buttonSecondaryText: string = "",
    buttonPrimaryText: string
  ) => {
    dispatch(setModalTitle(title ?? mTitle));
    dispatch(setModalBody(body ?? mBody));
    dispatch(setModalType(type ?? mType));
    dispatch(
      setModalButtonSecondaryText(buttonSecondaryText ?? mButtonSecondaryText)
    );
    dispatch(
      setModalButtonPrimaryText(buttonPrimaryText ?? mButtonPrimaryText)
    );
    dispatch(setModalIsOpen(true));
  };

  const closeModal = () => {
    dispatch(setModalTitle("Modal Title. Change accordingly using Redux."));
    dispatch(setModalBody("Modal Body. Change accordingly using Redux."));
    dispatch(setModalType("singleButton"));
    dispatch(setModalButtonSecondaryText("Cancel"));
    dispatch(setModalButtonPrimaryText("Okay"));
    dispatch(setModalIsOpen(false));
    dispatch(setLoginModalIsOpen(false));
  };

  const openLoginModal = () => {
    dispatch(setModalTitle("Oops, Hold On!"));
    dispatch(
      setModalBody(
        "Looks like we need you to log in first before you can do that. No worries, just a quick step!"
      )
    );
    dispatch(setModalType("doubleButton"));
    dispatch(setModalButtonSecondaryText("Not now"));
    dispatch(setModalButtonPrimaryText("Let's Log In"));
    dispatch(setLoginModalIsOpen(true));
  };

  const openComingSoonModal = () => {
    dispatch(setModalTitle("Coming Soon!"));
    dispatch(
      setModalBody(
        "🚀 Exciting news! Our favorite feature is on its way. Stay tuned for updates!"
      )
    );
    dispatch(setModalType("singleButton"));
    dispatch(setModalButtonSecondaryText(""));
    dispatch(setModalButtonPrimaryText("Okay, I'll be waiting"));
    dispatch(setModalIsOpen(true));
  };

  return {
    openModal,
    openLoginModal,
    openComingSoonModal,
    closeModal,
  };
};
