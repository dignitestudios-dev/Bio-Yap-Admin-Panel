"use client";
import React from "react";
import Image from "next/image";
import { LuLoaderCircle } from "react-icons/lu";

const MainLoder = () => {
  return (
    // <div className="w-full h-screen flex justify-center items-center">
    //   <div className="relative flex justify-center items-center">
    //     <Image
    //       src={"/images/logo.png"}
    //       alt="BioYap Admin"
    //       width={70}
    //       height={70}
    //       className="absolute"
    //     />
    //     <LuLoaderCircle className="animate-spin " size={150} />
    //   </div>
    // </div>

    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <span className="h-auto w-auto mb-5">
          <Image
            src={"/images/logo.png"}
            alt="BioYap Admin"
            width={70}
            height={70}
          />
        </span>
        <div className="loader-logo">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default MainLoder;
