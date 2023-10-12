import React from "react";
import WhoToFollowItem from "./WhoToFollowItem";

function WhoToFollow() {
  return (
    <div className="bg-[#16181C] py-4 rounded-2xl mt-8">
      <h3 className="font-medium text-2xl mb-8 px-4">Who to follow</h3>
      <WhoToFollowItem />
      <WhoToFollowItem />
      <button className="text-blue-500 px-4">Show more</button>
    </div>
  );
}

export default WhoToFollow;
