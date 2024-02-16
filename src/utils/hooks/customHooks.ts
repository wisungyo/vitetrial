export const convertLabel = (label: string) => {
  switch (label) {
    case "bidding":
      return "Winning Bid";
    case "buy":
      return "Buy Now";
    default:
      return "Unavailable";
  }
};
