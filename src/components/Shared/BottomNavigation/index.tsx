import { BottomNav } from "../../../ltc-core/block";
import { HOME_BOTTOM_NAV_ITEM } from "../../../utils/constants/navigationConstant";

export default function BottomNavigation() {
  return (
    <>
      <BottomNav
        data={HOME_BOTTOM_NAV_ITEM}
        initialSelected={"home"}
        handleChange={() => console.log("move")}
      />
      <div className="h-20" />
    </>
  );
}
