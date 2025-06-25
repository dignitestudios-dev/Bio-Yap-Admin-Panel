import Image from "next/image";
import React from "react";

const AuthHeading: React.FC<{ title: string; desc: string }> = ({
  title,
  desc,
}) => {
  return (
    <>
      <div className="bg-secondary h-24 w-24 flex justify-center items-center rounded-2xl">
        <Image src={"/images/logo.png"} alt="BioYap" width={70} height={70} />
      </div>
      <div>
        <h1 className="text-4xl font-general-semibold text-center">{title}</h1>
        <p className="text-[#868686] text-center mt-1 text-sm">{desc}</p>
      </div>
    </>
  );
};

export default AuthHeading;
