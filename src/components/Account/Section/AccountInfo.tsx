import { ACTIVE_CUSTOMER, LOGOUT, ME } from "@/graphql/documents/accounts";
import { Button } from "@/ltc-core/ui";
import { useAlert } from "@/utils/hooks/useAlert";
import { useMutation, useQuery } from "@apollo/client";
import { SfIconLogout } from "@storefront-ui/react";
import { useRouter } from "next/router";

export default function AccountInfo() {
  const router = useRouter();
  const meProps = useQuery(ME);
  const activeCustomerProps = useQuery(ACTIVE_CUSTOMER);
  const [logout, logoutProps] = useMutation(LOGOUT);
  const { openAlert } = useAlert();
  const firstName = activeCustomerProps?.data?.activeCustomer?.firstName || "";
  const lastName = activeCustomerProps?.data?.activeCustomer?.lastName || "";

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.data?.logout.success) {
        localStorage.removeItem("USER_ID");
        router.push("/");
      } else {
        openAlert("Something went wrong", "error");
      }
    } catch (error: any) {
      openAlert(error.message, "error");
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col gap-10 items-center justify-center">
      <p className="text-xl">
        Hi, {firstName} {lastName}
      </p>

      <div
        className="flex flex-row gap-2 text-sm items-center p-2 text-red-500 cursor-pointer"
        onClick={handleLogout}
      >
        <p>Sign Out</p>
        <SfIconLogout size="sm" />
      </div>
    </div>
  );
}
