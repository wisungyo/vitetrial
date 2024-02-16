import {
  TypeAlerts,
  setAlertMessage,
  setAlertType,
  setIsAlertOpen,
} from "@/redux/slices/alertSlice";
import { useDispatch } from "react-redux";

export const useAlert = () => {
  const dispatch = useDispatch();

  const openAlert = (message = "", type: TypeAlerts = "error") => {
    dispatch(setAlertMessage(message));
    dispatch(setAlertType(type));
    dispatch(setIsAlertOpen(true));
  };

  const closeAlert = () => {
    dispatch(setAlertMessage(""));
    dispatch(setIsAlertOpen(false));
    dispatch(setAlertType("error"));
  };

  return { openAlert, closeAlert };
};
