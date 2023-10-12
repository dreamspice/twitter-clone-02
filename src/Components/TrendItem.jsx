import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

function TrendItem() {
  return (
    <div className="flex items-center justify-between mb-6 hover:bg-gray-500 px-4">
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm">Trends in Poland</span>
        <span className="font-medium text-lg">#Eurovision</span>
        <span className="text-gray-500 text-sm">14.7K Tweets</span>
      </div>
      <div>
        <MoreHorizOutlinedIcon sx={{ color: "gray" }} />
      </div>
    </div>
  );
}

export default TrendItem;
