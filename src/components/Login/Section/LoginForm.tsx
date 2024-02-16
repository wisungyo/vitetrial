/* eslint-disable react/no-unescaped-entities */
import TextInput from "@/ltc-core/block/TextInput";
import Link from "next/link";
import { Button, Modal } from "@/ltc-core/ui";
import { useState } from "react";
import { LOGIN } from "@/graphql/documents/accounts";
import { useRouter } from "next/router";
import { SfIconClose } from "@storefront-ui/react";
import { useMutation } from "@apollo/client";

export default function LoginForm() {
  const router = useRouter();
  const [loginMutateFunction, { data, loading, error }] = useMutation(LOGIN);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const rememberMe = false;

  const onChangeUsername = (input: string) => {
    setUsername(input);
  };

  const onChangePassword = (input: string) => {
    setPassword(input);
  };

  const onSubmit = async () => {
    try {
      const loginResult = await loginMutateFunction({
        variables: { username, password, rememberMe },
      });

      if (loginResult.errors) {
        console.error(loginResult.errors);
        setErrorMessage(loginResult.errors.map((err) => err.message).join(","));
        setIsModalOpen(true);
        return;
      }

      if (
        loginResult.data?.login.__typename == "InvalidCredentialsError" ||
        loginResult.data?.login.__typename == "NativeAuthStrategyError" ||
        loginResult.data?.login.__typename == "NotVerifiedError"
      ) {
        setErrorMessage(loginResult.data.login.message);
        setIsModalOpen(true);
        return;
      }

      if (loginResult.data?.login.__typename == "CurrentUser") {
        localStorage.setItem("USER_ID", loginResult.data.login.id);
        localStorage.setItem(
          "CHANNEL_TOKEN",
          loginResult.data.login.channels[0].token
        );
        localStorage.setItem(
          "CHANNEL_ID",
          loginResult.data.login.channels[0].id
        );
        router.push("/");
      }
    } catch (error) {
      console.error("Login Failed. Error:", error);
    }
  };

  return (
    <>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={username}
        handleChange={onChangeUsername}
        invalid={errorMessage && !username ? true : false}
        errorText="Cannot be empty"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        handleChange={onChangePassword}
        invalid={errorMessage && !password ? true : false}
        errorText="Cannot be empty"
      />
      <Button className="w-full mt-2" onClick={onSubmit}>
        Login
      </Button>
      {/* <div className="mt-2">
        <p className="text-center text-gray-400">Forgot password?</p>
      </div>

      <div className="h-[1px] bg-gray-200 my-6" />

      <div className=" flex flex-col gap-2">
        <Button className="w-full mt-2" variant="secondary">
          Continue with Google
        </Button>
        <Button className="w-full mt-2" variant="secondary">
          Continue with Facebook
        </Button>
      </div> */}

      <div className="mt-4">
        <p className="text-center">
          <span>Don't have an account yet? </span>
          <Link href="/register" className="text-center text-primary-700">
            Create account
          </Link>
        </p>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        as="section"
        className="max-w-[90%] md:max-w-lg"
      >
        <header>
          <Button
            square
            variant="tertiary"
            className="absolute right-2 top-2"
            onClick={() => setIsModalOpen(false)}
          >
            <SfIconClose />
          </Button>
          <h3
            id="promoModalTitle"
            className="font-bold typography-headline-4 md:typography-headline-3"
          >
            Login Failed
          </h3>
        </header>
        <p id="promoModalDesc" className="mt-2">
          {errorMessage}
        </p>
        <footer className="flex justify-end gap-4 mt-4">
          <Button onClick={() => setIsModalOpen(false)}>Okay</Button>
        </footer>
      </Modal>
    </>
  );
}
