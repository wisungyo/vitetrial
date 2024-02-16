// import { Input } from "@/ltc-core/ui";
import classNames from "classnames";
import { ChangeEvent } from "react";
import { Input } from "../../ui";

type TypeTextInput = {
  characterLimit?: number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  helpText?: string;
  required?: boolean;
  requiredText?: string;
  errorText?: string;
  size?: "base" | "sm" | "lg" | undefined;
  type?: "text" | "password";
  value?: string;
  handleChange?: (input: string) => void;
};

export default function TextInput({
  characterLimit = 0,
  label = "Label",
  placeholder = "placeholder",
  disabled = false,
  readonly = false,
  invalid = false,
  helpText = "",
  required = false,
  requiredText = "Required",
  errorText = "Error",
  size = "base",
  type = "text",
  value = "",
  handleChange = (input: string) => {},
}: TypeTextInput) {
  // const [value, setValue] = useState("");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    handleChange(event?.target.value);
  }
  const isAboveLimit = characterLimit ? value.length > characterLimit : false;
  const charsCount = characterLimit ? characterLimit - value.length : null;

  const getCharacterLimitClass = () =>
    isAboveLimit ? "text-negative-700 font-medium" : "text-neutral-500";

  return (
    <>
      <label>
        <p
          className={classNames("text-sm font-medium mb-1", {
            "cursor-not-allowed text-disabled-500": disabled,
          })}
        >
          {label}
        </p>
        <Input
          size={size}
          value={value}
          invalid={invalid}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onChange={onChange}
          type={type}
          wrapperClassName={classNames({
            "peer !bg-disabled-100 !ring-disabled-300 !ring-1 !text-disabled-500":
              disabled || readonly,
          })}
        />
      </label>
      <div className="flex justify-between">
        <div>
          {invalid && !disabled && (
            <p className="text-sm text-negative-700 font-medium mt-0.5">
              {errorText}
            </p>
          )}
          {helpText && (
            <p
              className={classNames(
                "typography-hint-xs text-sm",
                disabled ? "text-disabled-500" : "text-neutral-500"
              )}
            >
              {helpText}
            </p>
          )}
          {requiredText && required ? (
            <p className="mt-1 text-sm font-normal text-neutral-500 before:content-['*']">
              {requiredText}
            </p>
          ) : null}
        </div>
        {characterLimit && !readonly ? (
          <p
            className={classNames(
              "typography-error-xs mt-0.5",
              disabled ? "text-disabled-500" : getCharacterLimitClass()
            )}
          >
            {charsCount}
          </p>
        ) : null}
      </div>
    </>
  );
}
