import React, { HTMLInputTypeAttribute, useState } from "react";
import ReqStar from "./ReqStar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type BInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  name: string;
  inputType?: HTMLInputTypeAttribute;
  value: string | number | null;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BInput: React.FC<BInputProps> = ({
  label,
  id,
  placeholder = "",
  name,
  inputType,
  required,
  value,
  disabled = false,
  min,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={id} className="font-general-semibold mb-3">
        {label} {required && <ReqStar />}
      </label>
      <div className="flex justify-center items-center h-[49px] w-[280px] sm:w-[448px] bg-white border-2 border-[#00000030] rounded-[12px]">
        <input
          type={
            inputType
              ? inputType === "password" && show
                ? "text"
                : inputType
              : "text"
          }
          id={id}
          name={name}
          placeholder={placeholder}
          value={value !== null && value !== undefined ? value : ""}
          onChange={onChange}
          disabled={disabled}
          min={min}
          className={`px-[15px] w-full h-full rounded-[12px] outline-none`}
        />
        {inputType === "password" && show ? (
          <FaEyeSlash
            size={22}
            className="text-[#D9D9D9] me-2 cursor-pointer"
            onClick={() => setShow(false)}
          />
        ) : inputType === "password" && !show ? (
          <FaEye
            size={22}
            className="text-[#D9D9D9] me-2 cursor-pointer"
            onClick={() => setShow(true)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BInput;
