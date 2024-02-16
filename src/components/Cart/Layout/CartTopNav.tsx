import { SfIconArrowBack } from "@storefront-ui/react";
import { useRouter } from "next/router";

export default function CartTopNav() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-row items-center px-4 gap-4">
      <SfIconArrowBack onClick={goBack} />
      <p className="font-bold text-3xl">My Cart</p>
    </div>
  );
}
