import CountdownTimer from "@/components/Shared/CountdownTimer";
import { formatAsMoney } from "@/utils/formatter/moneyFormatter";

type TypeProductDetailBidding = {
  biddingRound?: number;
  totalBid?: number;
  currentBid?: number;
  currencyCode?: string;
};

export default function ProductDetailBidding({
  biddingRound = new Date().getTime(),
  totalBid = 0,
  currentBid = 0,
  currencyCode = "USG",
}: TypeProductDetailBidding) {
  return (
    <div className="flex flex-col px-4 gap-4 py-2">
      <p className="font-bold">Bidding Information</p>

      <div className="flex flex-wrap gap-4 text-sm">
        <CountdownTimer targetDate={biddingRound} />
      </div>

      <div className="flex flex-wrap gap-4 xs:gap-8 sm:gap-16 text-sm">
        <div className="flex flex-row gap-4 xs:gap-8 sm:gap-16">
          <div className="text-gray-500">
            <span>Current Bid</span>
          </div>
          <div className="font-medium">
            <span>
              {currencyCode} {formatAsMoney(currentBid)}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-4 xs:gap-8 sm:gap-16">
          <div className="text-gray-500">
            <span>Total Bidders</span>
          </div>
          <div className="font-medium">
            <span>{totalBid}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
