"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Topbar = () => {
  const [admin, setAdmin] = useState({
    name: "",
    profileImage: "",
  });

  useEffect(() => {
    const adminData = Cookies.get("admin");
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setAdmin({
        name: parsedAdmin.name || "Admin",
        profileImage: parsedAdmin.profileImage || "/images/logo.png",
      });
    }
  }, []);
  return (
    <div className="w-full bg-secondary p-4 rounded-[10px] flex justify-end">
      <div className="flex items-center gap-2">
        <p className="text-white">{admin?.name}</p>
        <div className="border border-gray-400 bg-gray-400/20 rounded-full p-2 flex justify-center items-center">
          <div
            className="h-[43px] w-[43px] bg-contain bg-no-repeat bg-center "
            style={{
              backgroundImage: `url(${admin?.profileImage})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
