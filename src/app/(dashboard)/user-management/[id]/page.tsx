import React, { Suspense } from "react";
import UserDetails from "./UserDetails";

const page = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <UserDetails />
    </Suspense>
  );
};

export default page;
