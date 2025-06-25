import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import BInput from "./BInput";
import BButton from "./BButton";
import { toast } from "react-hot-toast";
import { postHooks } from "@/hooks/usePostRequests";

type FormDataType = {
  title: string;
  description: string;
};

type CreateCommunityFromProps = {
  show: boolean;
  onClose: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCommunityFrom: React.FC<CreateCommunityFromProps> = ({
  show,
  onClose,
  setRefresh,
}) => {
  const { loading, createCommunity } = postHooks.useCreateCommunity();
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCommunity = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await createCommunity(
        formData.title,
        formData.description
      );

      if (success) {
        setFormData({
          title: "",
          description: "",
        });
        onClose();
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
        show ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`relative bg-white rounded-[20px] w-[550px] max-w-full flex flex-col justify-center items-center gap-3 ${
          show ? "animate-popupIn" : "animate-popupOut"
        }`}
      >
        <div className="w-full flex justify-between separator p-10 !pb-2">
          <p className="text-3xl font-general-semibold">Create Community</p>

          <IoCloseOutline
            className="cursor-pointer"
            size={28}
            onClick={onClose}
          />
        </div>

        <form
          onSubmit={handleCreateCommunity}
          className="flex flex-col gap-5 pb-8 pt-2"
        >
          <BInput
            id={"title"}
            label="Name of Community"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Enter Name Here"
          />

          <div className="w-full flex flex-col">
            <label
              htmlFor={"description"}
              className="font-general-semibold mb-3"
            >
              Description
            </label>
            <div className="flex justify-center items-center h-[140px] w-[280px] sm:w-[448px] bg-white border-2 border-[#00000030] rounded-[12px]">
              <textarea
                name="description"
                id="description"
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Description of community"
                className="p-[15px] w-full h-full rounded-[12px] outline-none"
              />
            </div>
          </div>

          <div className="mx-8 mt-3">
            <BButton
              title="Create Community"
              w="full"
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityFrom;
