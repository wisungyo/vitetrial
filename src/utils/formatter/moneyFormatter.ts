export const formatAsMoney = (price: number): string => {
  if (!price) return "";

  const priceString = price.toString().split("");

  let commaCount = 0;
  let result = "";

  for (let i = priceString.length - 1; i >= 0; i--) {
    if (commaCount === 3) {
      result = "," + result;
      commaCount = 0;
    }

    result = priceString[i] + result;
    commaCount++;
  }

  return result;
};
