import React from "react";
import SearchBar from "./SearchBar";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";

function RightSlider() {
  return (
    <div className="content text-white overflow-y-scroll basis-1/3 border-gray-700 border-r-[1px] px-6 ">
      <SearchBar />
      <Trends />
      <WhoToFollow />
    </div>
  );
}

export default RightSlider;
