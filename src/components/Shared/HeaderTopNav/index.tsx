import { useNavigation } from "@/utils/hooks/useNavigation";
import { SfIconArrowBack } from "@storefront-ui/react";

type TypeHeaderTopNav = {
  label: string;
};

export default function HeaderTopNav({ label }: TypeHeaderTopNav) {
  const { goBackElseToHome } = useNavigation();

  return (
    <div className="flex flex-row items-center px-4 gap-4 pb-2">
      <SfIconArrowBack onClick={goBackElseToHome} className="cursor-pointer" />
      <p className="font-bold text-3xl">{label}</p>
    </div>
  );
}
