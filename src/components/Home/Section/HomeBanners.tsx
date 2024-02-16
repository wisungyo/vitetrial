// import Banner from "@/ltc-core/block/Banner";
// import { useModal } from "@/utils/hooks/useModal";

import { Banner } from "../../../ltc-core/block";

export default function HomeBanners() {
  // const { openComingSoonModal } = useModal();
  const banners = [
    {
      image: "/images/iphone.png",
      title: "Hot deals. No sweat.",
      subtitle: "SPECIAL OFFER",
      description: "Unbeatable Prices, Exclusive Deals, Stay Ahead",
      buttonText: "Browse offers",
      reverse: false,
      backgroundColor: "bg-neutral-100",
      titleClass: "md:typography-display-2",
      subtitleClass: "md:typography-headline-6",
      descriptionClass: "md:typography-text-lg",
    },
    {
      image: "/images/bid.png",
      title: "Bid for Success",
      subtitle: "",
      description: "Elevate your opportunities, master the art of bidding.",
      buttonText: "Learn more",
      reverse: false,
      backgroundColor: "bg-neutral-100",
      titleClass: "md:typography-display-2",
      subtitleClass: "md:typography-headline-6",
      descriptionClass: "md:typography-text-lg",
    },
  ];

  return (
    <div className="mt-7">
      {banners.map((data, index) => (
        <div key={index} className="p-2">
          <Banner {...data} handleClick={() => console.log("modal")} />
        </div>
      ))}
    </div>
  );
}
