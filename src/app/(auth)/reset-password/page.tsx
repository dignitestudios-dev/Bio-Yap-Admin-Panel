"use client";
import React, { useState } from "react";
import BInput from "@/components/BInput";
import BButton from "@/components/BButton";
import Link from "next/link";
import AuthHeading from "@/components/AuthHeading";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Tick from "@/components/icons/Tick";
import { postHooks } from "@/hooks/usePostRequests";

type FormDataType = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const { loading, resetPassword } = postHooks.useResetPassword();
  const [formData, setFormData] = useState<FormDataType>({
    newPassword: "",
    confirmPassword: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("reset password data: ", formData);
    const { newPassword, confirmPassword } = formData;
    const success = await resetPassword(newPassword, confirmPassword);
    if (success) setShowAlert(true);
  };

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <>
      <AuthHeading title="Reset Password" desc="Set New Password" />

      <form
        onSubmit={handleResetPassword}
        className="flex flex-col gap-5 justify-center  items-center"
      >
        <BInput
          id={"newPassword"}
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          inputType="password"
          disabled={loading}
          placeholder="• • • • • • • •"
          required={true}
        />

        <BInput
          id={"confirmPassword"}
          label="Re-Enter New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          inputType="password"
          disabled={loading}
          placeholder="• • • • • • • •"
          required={true}
        />

        <BButton title="Update" type="submit" w="full" loading={loading} />
      </form>

      {showAlert && (
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
            showAlert ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          <div
            className={`relative bg-white p-10 rounded-[20px] w-[455px] h-[315px] flex flex-col justify-center items-center gap-5 ${
              showAlert ? "animate-popupIn" : "animate-popupOut"
            }`}
          >
            <IoClose
              className="absolute top-5 right-5 cursor-pointer"
              size={25}
              onClick={handleContinue}
            />
            <Tick />
            <p className="text-xl font-general-semibold">
              Password updated Successfully!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
