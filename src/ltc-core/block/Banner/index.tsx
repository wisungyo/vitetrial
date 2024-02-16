import { Button } from "@/ltc-core/ui";
import classNames from "classnames";

export default function Banner({
  image = "images/iphone.png",
  title = "Sunny Days Ahead",
  subtitle = "Be inspired",
  description = "Step out in style with our sunglasses collection",
  buttonText = "Discover now",
  buttonColor = "",
  reverse = false,
  backgroundColor = "bg-neutral-100",
  titleClass = "md:typography-display-2",
  subtitleClass = "md:typography-headline-6",
  descriptionClass = "md:typography-text-lg",
  handleClick = () => {},
}) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px]">
      <div
        key={title}
        className={classNames(
          "relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full",
          backgroundColor
        )}
      >
        <div
          className={classNames("flex justify-between overflow-hidden grow", {
            "flex-row-reverse": reverse,
          })}
        >
          <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
            <p
              className={classNames(
                "uppercase typography-text-xs block tracking-widest",
                subtitleClass
              )}
            >
              {subtitle}
            </p>
            <h2
              className={classNames(
                "mb-4 mt-2 font-bold typography-display-3",
                titleClass
              )}
            >
              {title}
            </h2>
            <p className="typography-text-base block mb-4 text-sm">
              {description}
            </p>
            <Button size="sm" onClick={handleClick}>
              {buttonText}
            </Button>
          </div>
          <img
            src={image}
            alt={title}
            className="w-1/2 self-end object-contain"
          />
        </div>
      </div>
    </div>
  );
}
