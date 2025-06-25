import BButton from "@/components/BButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      {" "}
      <Image
        src={"/images/logo.png"}
        alt="BioYap Admin"
        width={100}
        height={100}
      />
      <h1 className="font-general-bold text-[200px] leading-[200px] text-primary text-shadow-lg">
        404
      </h1>
      <p className="font-general-semibold text-5xl text-desc">Page Not Found</p>
      <p className="text-xl mb-5">The page you’re looking for doesn’t exist.</p>
      <Link href={"/"}>
        <BButton title="Go Home" />
      </Link>
    </div>
  );
};

export default NotFound;
