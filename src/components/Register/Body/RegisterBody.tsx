/* eslint-disable react/no-unescaped-entities */
import RegisterForm from "../Section/RegisterForm";
import RegisterFooter from "../Section/RegisterFooter";

export default function RegisterBody() {
  return (
    <>
      <div
        className="p-4 flex flex-col gap-2"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <RegisterForm />
        <RegisterFooter />
      </div>
    </>
  );
}
