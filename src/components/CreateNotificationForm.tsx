import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import BInput from "./BInput";
import BButton from "./BButton";
import { toast } from "react-hot-toast";
import { notificationHooks } from "@/hooks/useNotificationRequests";

type FormDataType = {
  title: string;
  date: string;
  time: string;
  desc: string;
};

type CreateNotificationFormProps = {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const CreateNotificationForm: React.FC<CreateNotificationFormProps> = ({
  show,
  onClose,
  onSuccess,
}) => {
  const { loading, createNotification } =
    notificationHooks.useCreateNotification();
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    date: "",
    time: "",
    desc: "",
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

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.title) return toast.error("Title is required");
      if (!formData.time) return toast.error("Time is required");
      if (!formData.date) return toast.error("Date is required");
      if (!formData.desc) return toast.error("Description is required");

      const success = await createNotification({
        title: formData.title,
        description: formData.desc,
        date: formData.date,
        time: formData.time,
      });

      if (success) {
        setFormData({
          title: "",
          date: "",
          time: "",
          desc: "",
        });
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!show) return null;

  // Prevent past dates for notification
  const today = new Date().toISOString().split("T")[0];

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
          <p className="text-xl font-general-semibold">
            Create New Notification
          </p>

          <IoCloseOutline
            className="cursor-pointer"
            size={28}
            onClick={onClose}
          />
        </div>

        <form
          onSubmit={handleCreateNotification}
          className="flex flex-col gap-5 pb-8 pt-2"
        >
          <BInput
            id={"title"}
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Title Here"
          />

          <BInput
            id={"date"}
            label="Date"
            name="date"
            inputType="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Select"
            min={today}
          />

          <BInput
            id={"time"}
            label="Time"
            name="time"
            inputType="time"
            value={formData.time}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Select"
          />

          <div className="w-full flex flex-col">
            <label htmlFor={"desc"} className="font-general-semibold mb-3">
              Description
            </label>
            <div className="flex justify-center items-center h-[140px] w-[280px] sm:w-[448px] bg-white border-2 border-[#00000030] rounded-[12px]">
              <textarea
                name="desc"
                id="desc"
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Description of notification"
                className="p-[15px] w-full h-full rounded-[12px] outline-none"
              />
            </div>
          </div>

          <div className="mx-8 mt-3">
            <BButton
              title="Create Notification"
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

export default CreateNotificationForm;
