import { useState } from "react";
import {
  SfScrollable,
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
} from "@storefront-ui/react";
import classNames from "classnames";

type Image = {
  imageSrc: string;
  alt: string;
};

type TypeGalleryWithBullets = {
  images: Image[];
};

export default function GalleryWithBullets({ images }: TypeGalleryWithBullets) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative max-h-[600px] flex flex-col w-full aspect-[4/4] gap-1">
      <SfScrollable
        className="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        wrapperClassName="group/scrollable h-full"
        activeIndex={activeIndex}
        isActiveIndexCentered={false}
        prevDisabled={activeIndex === 0}
        nextDisabled={activeIndex === images.length - 1}
        buttonsPlacement="block"
        onPrev={() => {
          setActiveIndex(() => activeIndex - 1);
        }}
        onNext={() => {
          setActiveIndex(() => activeIndex + 1);
        }}
        onScroll={({ width, scrollWidth, left }) => {
          const fullScrolls = Math.floor(left / width);
          const activeIndex = Math.min(
            fullScrolls,
            Math.floor(scrollWidth / width) - 1
          );
          setActiveIndex(activeIndex);
        }}
        slotPreviousButton={
          <SfButton
            className="hidden group-hover/scrollable:block disabled:!hidden absolute !rounded-full !p-3 z-10 top-1/2 left-4 bg-white"
            variant="secondary"
            size="lg"
            slotPrefix={<SfIconChevronLeft />}
          />
        }
        slotNextButton={
          <SfButton
            className="hidden group-hover/scrollable:block disabled:!hidden absolute !rounded-full !p-3 z-10 top-1/2 right-4 bg-white"
            variant="secondary"
            size="lg"
            slotPrefix={<SfIconChevronRight />}
          />
        }
      >
        {images.map(({ imageSrc, alt }, index) => (
          <div
            className="relative flex justify-center basis-full snap-center snap-always shrink-0 grow"
            key={`${alt}-${index}`}
          >
            <img
              aria-label={alt}
              aria-hidden={activeIndex !== index}
              className="object-contain w-auto h-full"
              alt={alt}
              src={imageSrc}
              draggable="false"
            />
          </div>
        ))}
      </SfScrollable>
      <div className="flex-shrink-0 basis-auto">
        <div className="flex-row w-full flex gap-0.5 mt [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {images.map(({ alt }, index) => (
            <button
              key={`${index}-bullet`}
              aria-label={alt}
              aria-current={activeIndex === index}
              type="button"
              className={classNames(
                "w-full relative mt-1 border-b-4 transition-colors focus-visible:outline focus-visible:outline-offset-0 cursor-default",
                {
                  "border-primary-700": activeIndex === index,
                  "border-gray-200": activeIndex !== index,
                }
              )}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
