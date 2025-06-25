"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: "",
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: "#fff",
          color: "#818589",
        },
      }}
    />
  );
}
