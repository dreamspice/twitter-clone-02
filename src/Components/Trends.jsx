import React from "react";
import TrendItem from "./TrendItem";

function Trends() {
  function show() {
    console.log("show");
  }
  return (
    <div
      className="bg-[#16181C] py-4 rounded-2xl mt-6 cursor-pointer"
      onClick={show}
    >
      <h3 className="text-2xl mb-8 font-medium px-4">Trends fo you</h3>
      <TrendItem />
      <TrendItem />
      <button className="text-blue-500 px-4 ">Show more</button>
    </div>
  );
}

export default Trends;
