"use client";

import React from "react";

const Pagination = () => {
  return (
    <div className="flex">
      <a
        href="#"
        className="flex items-center justify-center h-10 px-4 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Previous
      </a>
      <a
        href="#"
        className="flex items-center justify-center h-10 px-4 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg ms-3 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;
