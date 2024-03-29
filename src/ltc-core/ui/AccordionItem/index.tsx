import { forwardRef } from "react";
import type { MouseEvent } from "react";
import classNames from "classnames";
import type { SfAccordionItemProps } from "@storefront-ui/react";

const SfAccordionItem = forwardRef<HTMLDetailsElement, SfAccordionItemProps>(
  function SfAccordionItem(
    { open, onToggle, children, summary, summaryClassName, ...attributes },
    ref
  ) {
    const handleClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onToggle?.(!open);
    };

    return (
      <details
        ref={ref}
        open={open}
        {...attributes}
        data-testid="accordion-item"
      >
        <summary
          onClick={handleClick}
          className={classNames(
            summaryClassName,
            "list-none [&::-webkit-details-marker]:hidden cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:outline focus-visible:rounded-sm"
          )}
        >
          {summary}
        </summary>
        {children}
      </details>
    );
  }
);

export default SfAccordionItem;
