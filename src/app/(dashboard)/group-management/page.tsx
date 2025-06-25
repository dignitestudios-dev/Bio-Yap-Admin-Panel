import React, { Suspense } from "react";
import GroupManagement from "./GroupManagement";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <GroupManagement />
      </Suspense>
    </>
  );
};

export default page;
