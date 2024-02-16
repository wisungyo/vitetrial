import { Button } from "@/ltc-core/ui";
import { formatAsMoney } from "@/utils/formatter/moneyFormatter";

type TypeProductDetailButtons = {
  currencyCode?: string;
  bidPrice?: number;
  buyPrice?: number;
  handleOnBid?: () => void;
  handleOnBuy?: () => void;
};

export default function ProductDetailButtons({
  currencyCode = "USG",
  bidPrice = 0,
  buyPrice = 0,
  handleOnBid = () => {},
  handleOnBuy = () => {},
}: TypeProductDetailButtons) {
  return (
    <div className="flex flex-col xs:flex-row p-4 gap-2">
      <Button
        variant="secondary"
        className="flex-1"
        size="sm"
        onClick={handleOnBid}
      >
        <div className="flex flex-col text-sm">
          <span>
            Lowest Ask {currencyCode} {formatAsMoney(bidPrice)}
          </span>
          <span className="font-bold">Place Bid</span>
        </div>
      </Button>
      <Button className="flex-1" size="sm" onClick={handleOnBuy}>
        <div className="flex flex-col text-sm">
          <span>
            {currencyCode} {formatAsMoney(buyPrice)}
          </span>
          <span className="font-bold">Buy Now</span>
        </div>
      </Button>
    </div>
  );
}
