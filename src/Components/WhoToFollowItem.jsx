import React from "react";
import { Avatar } from "@mui/material";

function WhoToFollowItem() {
  return (
    <div className="flex items-center justify-between mb-4 px-4">
      <div className="flex">
        <Avatar />
        <div className="flex flex-col ml-3">
          <span className="font-bold">Iza Leszczyna</span>
          <span className="text-gray-500 text-base">@Leszczyna</span>
        </div>
      </div>
      <div>
        <button className="text-black bg-white rounded-full px-6 py-2 font-bold">
          Follow
        </button>
      </div>
    </div>
  );
}

export default WhoToFollowItem;
