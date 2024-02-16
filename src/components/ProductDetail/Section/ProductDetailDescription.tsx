import { useState } from "react";

type TypeProductDetailDescription = {
  description?: string;
};
export default function ProductDetailDescription({
  description = "",
}: TypeProductDetailDescription) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col px-4 gap-4 py-2">
      <p className="font-bold">Product Details</p>

      <div className="flex flex-wrap gap-4 xs:gap-8 sm:gap-16 text-sm">
        <div className="flex flex-row gap-4 xs:gap-8 sm:gap-16">
          <div className="flex flex-col gap-1 text-gray-500">
            <span>Condition</span>
            <span>Storage</span>
          </div>
          <div className="flex flex-col gap-1 font-medium">
            <span>Brand New</span>
            <span>256GB</span>
          </div>
        </div>
        <div className="flex flex-row gap-4 xs:gap-8 sm:gap-16">
          <div className="flex flex-col gap-1 text-gray-500">
            <span>Brand</span>
            <span>Color</span>
          </div>
          <div className="flex flex-col gap-1 font-medium">
            <span>Apple</span>
            <span>Deep Purple</span>
          </div>
        </div>
      </div>

      <div className="text-sm leading-relaxed">
        {expanded ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description.length > 300
                    ? `${description.slice(0, 300)}...`
                    : description,
              }}
            />
            {description.length > 300 ? (
              <div
                className="text-primary-700 cursor-pointer py-2"
                onClick={toggleExpand}
              >
                Read More
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
