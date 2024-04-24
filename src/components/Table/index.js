import React, { useState, useEffect } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
} from "@tabler/icons-react";
import { Loader } from "../loader";

export const TableComponent = ({ columns, rows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const totalRows = rows?.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startRecords = currentPage * pageSize - (pageSize - 1);
  const endRecords = currentPage === totalPages ? totalRows : pageSize * currentPage;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [currentPage, pageSize, rows]);

  const ResizableColumns = columns?.map((col) => {
    return { ...col, resizable: true, sortable: true, width: "14rem" };
  });

  return (
    <>
      {loading && (
        <div
          className="flex w-full items-center justify-center content-center"
          style={{ height: "calc(100vh - 130px)" }}
        >
          <Loader />
          <span className="pl-2 text-sm ">Loading...</span>
        </div>
      )}
      {!loading && (
        <>
          <DataGrid
            columns={ResizableColumns}
            rows={paginatedRows}
            style={{ blockSize: "100%" }}
            headerRowHeight={40}
            enableColumnResize={true}
          />
          <div className="flex justify-between w-100">
            <div className="pt-8 text-sm tracking-normal text-gray-500 font-semibold">
              <span>{`Showing ${currentPage === 1 ? 1 : startRecords} to ${
                totalRows === rows.length ? totalRows : endRecords
              } of ${totalRows} entries`}</span>
            </div>
            <div className="pt-6">
              <button
                disabled={currentPage === 1 || totalRows <= pageSize}
                onClick={() => onPageChange(1)}
                className="cursor-pointer"
                aria-label="First Page"
              >
                <IconChevronLeftPipe size={18} color="#6c717c" />
              </button>
              <button
                disabled={currentPage === 1 || totalRows <= pageSize}
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer"
                aria-label="Previous Page"
              >
                <IconChevronLeft size={18} color="#6c717c" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer"
                aria-label="Next Page"
              >
                <IconChevronRight size={18} color="#6c717c" />
              </button>
              <button
                disabled={currentPage === totalPages || totalRows <= pageSize}
                onClick={() => onPageChange(totalPages)}
                className="cursor-pointer"
                aria-label="Last Page"
              >
                <IconChevronRightPipe size={18} color="#6c717c" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
