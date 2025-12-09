import React, { Suspense } from "react";
import OrderDetail from "./OrderDetails";


const page = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <OrderDetail />
    </Suspense>
  );
};

export default page;
