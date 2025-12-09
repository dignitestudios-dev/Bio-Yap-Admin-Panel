import React, { Suspense } from "react";
import OrdersTable from "./OrdersTable";


const page = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <OrdersTable />
    </Suspense>
  );
};

export default page;
