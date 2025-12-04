"use client";
import BButton from "@/components/BButton";
import CreateProductForm from "@/components/CreateProductForm";
import CustomPagination from "@/components/CustomPagination";
import Search from "@/components/icons/Search";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { getHooks } from "@/hooks/useGetRequests";
import { utils } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductManagement = () => {
  const { loading, totalPages, products, getProducts } =
    getHooks.useGetProducts();
  const [refresh, setRefresh] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [searchValue, setSearhValue] = useState<string>("");
  const searchValueDebounce: string = useDebounceSearch(searchValue);

  const handleGetCommunity = () => {
    getProducts(searchValueDebounce, 1);
  };

  useEffect(() => {
    handleGetCommunity();
  }, [searchValueDebounce, refresh]);

  const onPageChange = (page: number) => {
    getProducts(searchValueDebounce, page);
  };

  console.log(totalPages, "Total Pages in Product Management");

  return (
    <>
      <div className="px-4 flex items-center justify-between">
        <h2 className="section-heading">Product Management</h2>

        <div className="flex items-center gap-4">
          {/* <div className="bg-white rounded-lg w-[250px] h-[50px] flex items-center gap-2 px-4">
            <Search />

            <input
              type="text"
              placeholder="Search"
              className="outline-none flex-1 h-full"
              onChange={(e) => setSearhValue(e.target.value)}
            />
          </div> */}

          <BButton
            title="Add New Product"
            onBtnClick={() => setShowAlert(true)}
          />
        </div>
      </div>
      {/* Community Table */}
      <CustomPagination
        loading={loading}
        onPageChange={onPageChange}
        totalPages={totalPages}
      >
        <div className="bg-white rounded-xl px-4 pb-4 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr>
                <th colSpan={7} className="h-[16px] bg-white" />
              </tr>
              <tr className="bg-[#F2FDE0]">
                <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                  #
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Title</th>
                <th className="px-4 py-5 text-left text-nowrap">Description</th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Created Date
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Price</th>
                <th className="px-4 py-5 text-left text-nowrap">Quantity</th>
                <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {products.map((community, index) => (
                <tr key={index} className="border-b-1 border-[#D4D4D4]">
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          community.pictures[0] || "/images/unnamed.jpg"
                        }
                        alt={community.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{community.title}</span>
                    </div>
                  </td>

                  <td className="px-4 py-6">
                    {community.description.length > 30
                      ? community.description.slice(0, 30) + "..."
                      : community.description}
                  </td>
                  <td className="px-4 py-6 text-nowrap">
                    {utils.formatDate(community.createdAt)}
                  </td>
                  <td className="px-4 py-6">{community.price}</td>
                  <td className={`px-4 py-6`}>{community.quantity}</td>
                  <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                    <Link href={`/product-management/${community._id}`}>
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomPagination>

      <CreateProductForm
        show={showAlert}
        onClose={() => setShowAlert(false)}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default ProductManagement;
