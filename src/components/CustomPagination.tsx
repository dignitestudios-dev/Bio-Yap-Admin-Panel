"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import PageLoader from "./PageLoader";

type CustomPaginationProps = {
  loading: boolean;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  loading,
  totalPages,
  onPageChange,
  children,
}) => {
  const [page, setPage] = useState(1);

  const preventPrevious = useMemo(() => page === 1, [page, totalPages]);
  const preventNext = useMemo(() => page >= totalPages, [page, totalPages]);

  console.log("preventNext: ",preventNext)

  const goNext = () => {
    if (preventNext) return;
    setPage((prev) => {
      onPageChange(prev + 1);
      return prev + 1;
    });
  };

  const goPrevious = () => {
    if (preventPrevious) return;
    setPage((prev) => {
      onPageChange(prev - 1);
      return prev - 1;
    });
  };

  console.log(totalPages, "Total Pages in Custom Pagination");
  
  return (
    <>
      {loading && page <= 1 ? (
        <PageLoader />
      ) : (
        <div className="bg-white h-full flex flex-col gap-2 justify-between overflow-auto">
          {loading && page > 1 ? <PageLoader /> : children}
          <div className="w-full flex justify-end">
            <div className="w-fit flex gap-2 items-center">
              <button
                disabled={loading || preventPrevious}
                onClick={goPrevious}
                className={`flex justify-center items-center h-9 w-9 bg-primary text-white rounded-md ${
                  loading || preventPrevious ? "opacity-55" : "cursor-pointer"
                }`}
              >
                <IoChevronBack size={24} />
              </button>
              <p className="font-semibold text-gray-600">
                Page {page} of {totalPages || 1}
              </p>
              <button
                disabled={loading || preventNext}
                onClick={goNext}
                className={`flex justify-center items-center h-9 w-9 bg-primary text-white rounded-md ${
                  loading || preventNext ? "opacity-55" : "cursor-pointer"
                }`}
              >
                <IoChevronForward size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPagination;
