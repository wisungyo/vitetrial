import classNames from "classnames";
import { Button } from "@/ltc-core/ui";
import React from "react";

type BottomNav = {
  label: string;
  icon: JSX.Element;
};

type TypeBottomNav = {
  data: BottomNav[];
  initialSelected: string;
  handleChange?: (label: string) => void;
};

export default function BottomNav({
  data,
  initialSelected,
  handleChange = () => {},
}: TypeBottomNav) {
  function onClickHandler(label: string) {
    handleChange(label);
  }

  return (
    <nav className="max-w-4xl bottom-0 w-full fixed flex flex-row items-stretch bg-white text-primary-700 border-t border-neutral-200">
      {data.map(({ label, icon }) => (
        <Button
          key={label}
          variant="tertiary"
          slotPrefix={icon}
          className={classNames(
            "py-1 flex flex-col h-full w-full rounded-none hover:text-primary-800 hover:bg-primary-100 active:text-primary-900 active:bg-primary-200",
            {
              "text-primary-900 bg-primary-200":
                initialSelected.toLowerCase() === label.toLowerCase(),
            }
          )}
          size="sm"
          onClick={() => onClickHandler(label)}
        >
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </nav>
  );
}
