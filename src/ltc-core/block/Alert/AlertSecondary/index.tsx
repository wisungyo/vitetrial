import { SfIconClose, SfIconInfo } from "@storefront-ui/react";

type TypeAlertError = {
  title: string;
  onClose: () => void;
};

export default function AlertSecondary({ title, onClose }: TypeAlertError) {
  return (
    <div
      role="alert"
      className="flex items-center max-w-[600px] shadow-md bg-secondary-100 pr-2 pl-4 ring-1 ring-secondary-200 typography-text-sm md:typography-text-base py-1 rounded-md"
    >
      <SfIconInfo className="my-2 mr-2 text-secondary-700 shrink-0" />
      <p className="py-2 mr-2">{title}</p>
      <button
        type="button"
        className="p-1.5 md:p-2 ml-auto rounded-md text-secondary-700 hover:bg-secondary-200 active:bg-secondary-300 hover:text-secondary-800 active:text-secondary-900 focus-visible:outline focus-visible:outline-offset"
        aria-label="Close secondary alert"
        onClick={onClose}
      >
        <SfIconClose className="hidden md:block" />
        <SfIconClose size="sm" className="block md:hidden" />
      </button>
    </div>
  );
}
