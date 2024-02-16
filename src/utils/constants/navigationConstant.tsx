import {
  SfIconEmail,
  SfIconFavorite,
  SfIconHome,
  SfIconMenu,
  SfIconPerson,
} from "@storefront-ui/react";

export const HOME_BOTTOM_NAV_ITEM = [
  {
    label: "Watchlist",
    icon: <SfIconFavorite />,
    path: "/watchlist",
  },
  {
    label: "Bidding",
    icon: <img src="/auction.svg" alt="bid" />,
    path: "/bidding",
  },
  {
    label: "Home",
    icon: <SfIconHome />,
    path: "/",
  },
  {
    label: "Updates",
    icon: <SfIconEmail />,
    path: "/updates",
  },
  {
    label: "Account",
    icon: <SfIconPerson />,
    path: "/account",
  },
];
