export type TypeCheckout = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
  label: string;
  status: string;
  biddingRound: number;
};

export type TypeAddress = {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
};

export type TypeDelivery = {
  id: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  priceDiscount: number;
  isActive: boolean;
};

export type TypePayment = {
  id: string;
  name: string;
  image: string;
};
