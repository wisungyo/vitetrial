import { useNavigation } from "@/utils/hooks/useNavigation";
import { SfIconArrowBack } from "@storefront-ui/react";

export default function CheckoutTopNav() {
  const { goBackElseToHome } = useNavigation();

  return (
    <div className="flex flex-row items-center px-4 gap-4 pb-2">
      <SfIconArrowBack onClick={goBackElseToHome} />
      <p className="font-bold text-3xl">Checkout</p>
    </div>
  );
}
