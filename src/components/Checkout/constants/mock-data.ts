import { TypeAddress, TypeCheckout, TypeDelivery, TypePayment } from "./types";

export const CHECKOUT_DATA: TypeCheckout[] = [
  {
    id: "123",
    title: "iPhone 15 Pro Max 256GB",
    description: "Brand New, 256GB, Deep Purple, Apple ",
    price: 1009,
    currency: "$",
    quantity: 1,
    image: "/images/iphone.png",
    label: "bidding",
    biddingRound: 1234555,
    status: "available",
  },
  {
    id: "124",
    title: "iPhone 15 Pro Max 256GB",
    description: "Brand New, 256GB, Deep Purple, Apple ",
    price: 2009,
    currency: "$",
    quantity: 1,
    image: "/images/iphone.png",
    label: "bidding",
    biddingRound: 1234555,
    status: "available",
  },
  {
    id: "125",
    title: "iPhone 15 Pro Max 256GB",
    description: "Brand New, 256GB, Deep Purple, Apple ",
    price: 3009,
    currency: "$",
    quantity: 1,
    image: "/images/iphone.png",
    label: "buy",
    biddingRound: 1234555,
    status: "available",
  },
];

export const ADDRESS_DATA: TypeAddress[] = [
  {
    id: "123",
    name: "John Doe",
    address: "23 Parliament House, #01-01, Singapore 460234",
    isActive: true,
  },
  {
    id: "1234",
    name: "Kherren Nattanya",
    address: "24 Parliament House, #01-01, Singapore 4602377",
    isActive: false,
  },
];

export const DELIVERY_DATA: TypeDelivery[] = [
  {
    id: "123",
    name: "Ninja Van",
    description: "3 - 5 working days. Tracked.",
    currency: "$",
    price: 4.6,
    priceDiscount: 0,
    isActive: true,
  },
  {
    id: "1234",
    name: "JNT",
    description: "3 - 5 working days. Tracked.",
    currency: "$",
    price: 2.6,
    priceDiscount: 2.6,
    isActive: true,
  },
];

export const PAYMENT_DATA: TypePayment[] = [
  {
    id: "1234",
    name: "Credit Card",
    image: "",
  },
  {
    id: "123",
    name: "Paynow",
    image: "/images/paynow.png",
  },
];
