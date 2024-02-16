import { SfIconArrowBack, SfIconShoppingCart } from "@storefront-ui/react";
import { useRouter } from "next/router";
import { useNavigation } from "@/utils/hooks/useNavigation";

export default function HeaderTransparent() {
  const router = useRouter();
  const { goBackElseToHome } = useNavigation();

  return (
    <>
      <div
        className="flex items-center absolute left-0 z-10 h-[70px] py-2 px-4"
        onClick={goBackElseToHome}
      >
        <SfIconArrowBack />
      </div>
      <div
        className="flex items-center absolute right-0 z-10 h-[70px] py-2 px-4"
        onClick={() => router.push("/cart")}
      >
        <SfIconShoppingCart />
      </div>
    </>
  );
}
