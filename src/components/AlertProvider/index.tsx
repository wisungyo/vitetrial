import AlertError from "@/ltc-core/block/Alert/AlertError";
import AlertNeutral from "@/ltc-core/block/Alert/AlertNeutral";
import AlertPositive from "@/ltc-core/block/Alert/AlertPositive";
import AlertSecondary from "@/ltc-core/block/Alert/AlertSecondary";
import AlertWarning from "@/ltc-core/block/Alert/AlertWarning";
import { useAppSelector } from "@/redux/store";
import { useAlert } from "@/utils/hooks/useAlert";

export default function AlertProvider() {
  const { closeAlert } = useAlert();
  const message = useAppSelector((state) => state.alert.message);
  const isOpen = useAppSelector((state) => state.alert.isOpen);
  const type = useAppSelector((state) => state.alert.type);

  const renderAlert = () => {
    switch (type) {
      case "error":
        return <AlertError title={message} onClose={closeAlert} />;
      case "neutral":
        return <AlertNeutral title={message} onClose={closeAlert} />;
      case "positive":
        return <AlertPositive title={message} onClose={closeAlert} />;
      case "secondary":
        return <AlertSecondary title={message} onClose={closeAlert} />;
      case "warning":
        return <AlertWarning title={message} onClose={closeAlert} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed z-50 left-0 right-0 top-0 p-4">
      {isOpen && (
        <div className="flex flex-row justify-end">{renderAlert()}</div>
      )}
    </div>
  );
}
