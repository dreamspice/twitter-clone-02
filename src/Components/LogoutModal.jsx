import React from "react";

function LogoutModal(props) {
  return (
    <div
      className="border-gray-700 border-[1.5px] text-lg font-medium pl-2 py-3 mb-1 cursor-pointer"
      onClick={props.logout}
    >
      <span>
        Log out @{props.displayName}
        {props.uid}
      </span>
    </div>
  );
}

export default LogoutModal;
