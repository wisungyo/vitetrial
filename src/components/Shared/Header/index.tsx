import { SfIconShoppingCart } from "@storefront-ui/react";

export default function Header({ mode = "between" }) {
  const headerMode = () => {
    switch (mode) {
      case "center":
        return "justify-center";
      default:
        return "justify-between";
    }
  };

  return (
    <div
      className={`flex items-center h-[70px] py-2 px-4 sticky top-0 bg-white z-20 ${headerMode()}`}
    >
      <a href="/">
        <img src="/images/laku6.svg" alt="laku6" />
      </a>
      {mode == "between" ? (
        <a href="/cart">
          <SfIconShoppingCart />
        </a>
      ) : null}
    </div>
  );
}
