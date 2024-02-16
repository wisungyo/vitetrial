import TextInput from "@/ltc-core/block/TextInput";
import { Button } from "@/ltc-core/ui";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <>
      <TextInput label="Email" placeholder="Enter your email" />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        helpText="At least 6 characters"
      />
      <TextInput
        label="UEN Number"
        placeholder="Enter your UEN number"
        helpText="Optional"
      />
      <Button className="w-full mt-2">Create Account</Button>

      <div className="mt-4">
        <p className="text-center">
          <span>Already have an account? </span>
          <Link href="/login" className="text-center text-primary-700">
            Log In
          </Link>
        </p>
      </div>
    </>
  );
}
