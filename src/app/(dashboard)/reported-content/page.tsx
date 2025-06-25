import React, { Suspense } from "react";
import ReportedContent from "./ReportedContent";

const page = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <ReportedContent />
    </Suspense>
  );
};

export default page;
