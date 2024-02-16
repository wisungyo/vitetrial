/* eslint-disable react/no-unescaped-entities */
import LoginForm from "../Section/LoginForm";
import LoginFooter from "../Section/LoginFooter";

export default function LoginBody() {
  return (
    <>
      <div
        className="p-4 flex flex-col gap-2"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <LoginForm />
        <LoginFooter />
      </div>
    </>
  );
}
