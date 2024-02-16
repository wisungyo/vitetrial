import { setActiveBotNavItem } from "@/redux/slices/bottomNavigationSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { HOME_BOTTOM_NAV_ITEM } from "../constants/navigationConstant";

export const useNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const checkIsLogin = async () => {
    return !!(await localStorage.getItem("USER_ID"));
  };

  const handleChangeBotNavItem = async (label: string) => {
    const lowercaseLabel = label.toLowerCase();
    dispatch(setActiveBotNavItem(lowercaseLabel));

    const selectedItem = HOME_BOTTOM_NAV_ITEM.find(
      (item) => item.label.toLowerCase() === lowercaseLabel
    );

    const path = selectedItem ? selectedItem.path : null;

    if (!path) return;

    if (path === "/account") {
      const isLogin = await localStorage.getItem("USER_ID");
      const activeItem = await localStorage.getItem("activeItem");

      if (isLogin) {
        router.push(path);
      } else {
        dispatch(setActiveBotNavItem(activeItem || "home"));
        router.push("/login");
      }
    } else {
      router.push(path);
    }
  };

  const syncBotNavPage = (label: string) => {
    dispatch(setActiveBotNavItem(label));
  };

  const goBackElseToHome = () => {
    const hasHistory = window.history.length > 1;
    hasHistory ? router.back() : router.push("/");
  };

  return {
    checkIsLogin,
    handleChangeBotNavItem,
    syncBotNavPage,
    goBackElseToHome,
  };
};
