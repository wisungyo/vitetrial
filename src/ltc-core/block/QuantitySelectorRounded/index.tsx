import { SfButton, SfIconAdd, SfIconRemove } from "@storefront-ui/react";
import { useCounter } from "react-use";
import { useId, ChangeEvent, useState } from "react";
import { clamp } from "@storefront-ui/shared";

type TypeQuantitySelector = {
  min?: number;
  max?: number;
  currencyCode?: string;
  initValue?: number;
  increment?: number;
};

export default function QuantitySelector({
  min = 1,
  max = 999999999,
  currencyCode = "",
  initValue = 1,
  increment = 1,
}: TypeQuantitySelector) {
  const inputId = useId();
  const [value, setValue] = useState(initValue);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    setValue(nextValue);
  }

  function handleIncrease() {
    setValue(value + increment);
  }

  function handleDecrease() {
    setValue(value - increment);
  }

  return (
    <div className="inline-flex flex-col items-center">
      <div className="flex">
        <SfButton
          square
          className="!rounded-full"
          disabled={value <= min}
          aria-controls={inputId}
          aria-label="Decrease value"
          onClick={handleDecrease}
        >
          <SfIconRemove />
        </SfButton>
        <div className="flex items-center pl-3 pr-2">
          <p>{currencyCode}</p>
          <input
            id={inputId}
            type="number"
            role="spinbutton"
            className="appearance-none text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
            min={min}
            max={max}
            value={value}
            onChange={handleOnChange}
          />
        </div>

        <SfButton
          square
          className="!rounded-full"
          disabled={value >= max}
          aria-controls={inputId}
          aria-label="Increase value"
          onClick={handleIncrease}
        >
          <SfIconAdd />
        </SfButton>
      </div>
    </div>
  );
}
