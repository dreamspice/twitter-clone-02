import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";

import TwitterIcon from "@mui/icons-material/Twitter";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Avatar from "@mui/material/Avatar";

function LeftSlider(props) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { displayName, email, photoURL, uid } = currentUser;

  const [modalLogoutIsShown, setModalLogoutIsShown] = useState(false);

  const openLogoutModal = () => {
    setModalLogoutIsShown((prevstate) => !prevstate);
  };
  return (
    <div className="flex flex-col h-screen justify-between text-white text-xl font-normal pr-18">
      <div className="flex flex-col flex-start gap-1">
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-3 rounded-full mb-0 mt-2"
        >
          <TwitterIcon sx={{ fontSize: 35, color: "white" }} className="" />
        </a>

        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-6  rounded-full"
        >
          <div className="flex flex-start items-center gap-3 hover:bg-gray-900">
            <HomeOutlinedIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>Home</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <TagIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>Explore</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <NotificationsNoneIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>Notifications</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <EmailOutlinedIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>Messages</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <BookmarkBorderOutlinedIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>Bookmarks</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <FeaturedPlayListOutlinedIcon
              sx={{ fontSize: 35, color: "white" }}
            />
            <h3>Lists</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <PersonOutlineOutlinedIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>Profile</h3>
          </div>
        </a>
        <a
          href="https://google.pl"
          target="_blank"
          className="self-start hover:bg-[#181919] py-3 pl-3 pr-7 rounded-full"
        >
          <div className="flex items-center gap-3">
            <MoreHorizOutlinedIcon sx={{ fontSize: 35, color: "white" }} />
            <h3>More</h3>
          </div>
        </a>
        <button
          className="bg-sky-500 py-3 rounded-full font-medium hover:bg-sky-600 transition-all
          duration-300 mt-4"
        >
          Tweet
        </button>
      </div>
      <div className="flex flex-col">
        {modalLogoutIsShown && (
          <LogoutModal
            displayName={displayName}
            uid={uid.slice(0, 10)}
            logout={props.logout}
          />
        )}
        <div
          className="flex justify-center items-center gap-3 text-base mb-6 hover:hover:bg-[#181919] p-2 rounded-full cursor-pointer"
          onClick={openLogoutModal}
        >
          <Avatar src={photoURL} />
          <div className="mr-4">
            <p className="font-medium">{displayName}</p>
            <p className="text-gray-400">{`@${displayName}${uid.slice(
              1,
              6
            )}`}</p>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default LeftSlider;
