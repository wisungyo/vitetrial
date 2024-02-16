import { useModal } from "@/utils/hooks/useModal";
import { SfIconFavorite, SfIconLocalShipping } from "@storefront-ui/react";

type TypeProductDetailHeadline = {
  name?: string;
  shipping?: string;
  estimatedArrival?: string;
};

export default function ProductDetailHeadline({
  name = "",
  shipping = "",
  estimatedArrival = "",
}: TypeProductDetailHeadline) {
  const { openComingSoonModal } = useModal();

  const clickFavButton = () => {
    openComingSoonModal();
  };

  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <p className="flex-1 font-bold text-xl">{name}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-row gap-2 items-center">
              <SfIconLocalShipping size="xs" />
              <span className="text-sm">{shipping}</span>
            </div>
            <span className="text-sm italic text-gray-500">
              {estimatedArrival}
            </span>
          </div>
        </div>
        <div>
          <SfIconFavorite className="cursor-pointer" onClick={clickFavButton} />
        </div>
      </div>
      <span className="text-[11px] text-gray-500">Product sold by Laku6</span>
    </div>
  );
}
