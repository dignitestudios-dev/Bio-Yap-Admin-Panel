import React, { Suspense } from "react";
import UserManagement from "./UserManagement";

const page = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <UserManagement />
    </Suspense>
  );
};

export default page;
