"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import BButton from "@/components/BButton";
import BackArrow from "@/components/icons/BackArrow";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { useParams, useRouter } from "next/navigation";
import { utils } from "@/lib/utils";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useParams();

  const { loading, product, getProductById } = getHooks.useGetProductDetails();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      getProductById(id as string);
    }
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product?.pictures.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (product?.pictures.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Link href={"/product-management"} className="outline-none">
            <BackArrow />
          </Link>

          <div className="flex justify-between items-center mb-6">
            <h1 className="section-heading">Product Details</h1>

            {/* <div className="flex gap-2 items-center">
              <BButton
                title="Back to Products"
                w="fit"
                varient="secondary"
                onBtnClick={() => router.push("/product-management")}
              />
            </div> */}
          </div>

          {product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Images Section */}
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative bg-gray-100 aspect-square flex items-center justify-center">
                  {product.pictures && product.pictures.length > 0 ? (
                    <>
                      <img
                        src={product.pictures[currentImageIndex]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />

                      {product.pictures.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                          >
                            ←
                          </button>

                          <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                          >
                            →
                          </button>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {product.pictures.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition ${
                                  index === currentImageIndex
                                    ? "bg-white"
                                    : "bg-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-400">No image available</div>
                  )}
                </div>

                {/* Thumbnails */}
                {product.pictures && product.pictures.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {product.pictures.map((pic, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                          index === currentImageIndex
                            ? "border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        <img
                          src={pic}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="bg-white rounded-lg p-6 flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-general-semibold mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="sub-text mb-2">Price</h3>
                    <p className="text-xl font-general-semibold text-green-600">
                      ${product.price}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="sub-text mb-2">Quantity</h3>
                    <p className="text-xl font-general-semibold">
                      {product.quantity} units
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="sub-text mb-2">Created Date</h3>
                  <p className="text-base">
                    {utils.formatDate(product.createdAt)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="sub-text mb-2">Last Updated</h3>
                  <p className="text-base">
                    {utils.formatDate(product.createdAt)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="sub-text mb-2">Product ID</h3>
                  <p className="text-xs text-gray-500 break-all">
                    {product._id}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500">
                Unable to load product details. Please try again.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
