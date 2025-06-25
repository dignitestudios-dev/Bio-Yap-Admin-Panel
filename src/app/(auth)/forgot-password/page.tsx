"use client";
import Image from "next/image";
import React, { useState } from "react";
import BInput from "@/components/BInput";
import BButton from "@/components/BButton";
import Link from "next/link";
import AuthHeading from "@/components/AuthHeading";
import BackArrow from "@/components/icons/BackArrow";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { postHooks } from "@/hooks/usePostRequests";

type FormDataType = {
  email: string;
};

const Login = () => {
  const router = useRouter();
  const { loading, forgotPassword } = postHooks.useForgotPassword();
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword(formData.email);
  };

  return (
    <>
      <div className="w-full">
        <Link href={"/login"}>
          <BackArrow />
        </Link>
      </div>
      <AuthHeading
        title="Forgot Password"
        desc="Enter your registered email address to recover password"
      />

      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col gap-5 justify-center  items-center"
      >
        <BInput
          id={"email"}
          label="Email Address"
          name="email"
          inputType="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          placeholder="Enter your email"
          required={true}
        />

        <BButton title="Next" type="submit" w="full" loading={loading} />
      </form>
    </>
  );
};

export default Login;
