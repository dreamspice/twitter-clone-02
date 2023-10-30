import React from "react";

function FixedHeader() {
  return (
    <div className="sticky bg-[rgba(0,0,0,0.9)] top-0 text-white h-[109px] font-medium flex flex-col border-gray-700 border-b-[1px] z-[97]">
      <h3 className="ml-6 mt-2 pb-4 text-xl">Home</h3>
      <div className="flex text-lg ">
        <a
          href="https://www.w3schools.com"
          target="_blank"
          className="flex flex-col justify-center items-center flex-[50%]
           hover:bg-gray-800 py-2"
        >
          <span>For you</span>
          <div className="w-[65px] h-1 mt-2 bg-sky-500 rounded-full"></div>
        </a>
        <a
          href="https://www.w3schools.com"
          target="_blank"
          className="flex justify-center items-center flex-[50%] hover:bg-gray-800"
        >
          Following
        </a>
      </div>
    </div>
  );
}

export default FixedHeader;
