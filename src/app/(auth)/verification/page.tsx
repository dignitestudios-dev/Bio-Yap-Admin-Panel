"use client";
import React, { FormEvent, useState } from "react";
import BButton from "@/components/BButton";
import Link from "next/link";
import AuthHeading from "@/components/AuthHeading";
import BackArrow from "@/components/icons/BackArrow";
import OtpInput from "@/components/OtpInput";
import { postHooks } from "@/hooks/usePostRequests";

const Login = () => {
  const length = 5;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const { loading, verifyOtp } = postHooks.useVerifyOtp();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // If OTP is complete, trigger onComplete
    if (otp.every((digit) => digit !== "")) {
      handleVerify(otp.join(""));
    }
  };

  const handleVerify = async (otp: string) => {
    verifyOtp(otp);
  };

  return (
    <>
      <div className="w-full">
        <Link href={"/forgot-password"}>
          <BackArrow />
        </Link>
      </div>
      <AuthHeading
        title="Verification"
        desc="Enter verification code sent to your email"
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center  items-center"
      >
        <OtpInput
          otp={otp}
          setOtp={setOtp}
          onComplete={handleVerify}
          disabled={loading}
          length={length}
          label=""
        />

        <BButton title="Next" type="submit" w="full" loading={loading} />
      </form>
    </>
  );
};

export default Login;
