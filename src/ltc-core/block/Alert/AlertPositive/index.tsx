import { SfIconCheckCircle, SfIconClose } from "@storefront-ui/react";

type TypeAlertError = {
  title: string;
  onClose: () => void;
};

export default function AlertPositive({ title, onClose }: TypeAlertError) {
  return (
    <div
      role="alert"
      className="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md text-base"
    >
      <SfIconCheckCircle className="my-2 mr-2 text-positive-700 shrink-0" />
      <p className="py-2 mr-2">{title}</p>
      <button
        type="button"
        className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
        aria-label="Close positive alert"
        onClick={onClose}
      >
        <SfIconClose className="hidden md:block" />
        <SfIconClose size="sm" className="block md:hidden" />
      </button>
    </div>
  );
}
