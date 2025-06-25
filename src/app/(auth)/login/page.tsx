"use client";
import React, { useState } from "react";
import BInput from "@/components/BInput";
import BButton from "@/components/BButton";
import Link from "next/link";
import AuthHeading from "@/components/AuthHeading";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginInterface } from "@/lib/types";
import { postHooks } from "@/hooks/usePostRequests";

const Login = () => {
  const router = useRouter();
  const { loading, login } = postHooks.useLogin();
  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: LoginInterface) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login data: ", formData);

    login(formData);
  };

  return (
    <>
      <AuthHeading title="Log In" desc="Enter below details to log in" />

      <form
        onSubmit={handleLogin}
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

        <BInput
          id={"password"}
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          inputType="password"
          disabled={loading}
          placeholder="• • • • • • • •"
          required={true}
        />

        <div className="w-full flex justify-end">
          <Link
            href={"/forgot-password"}
            className="text-[#00A1FC] text-xs hover:underline font-bold tracking-wide select-none"
          >
            Forgot Password?
          </Link>
        </div>

        <BButton title="Log In" type="submit" w="full" loading={loading} />
      </form>
    </>
  );
};

export default Login;
