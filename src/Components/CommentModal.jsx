import React, { useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Overlay = (props) => {
  return (
    <div
      className={`
        ${props.isOpen ? "fixed" : "hidden"}
      top-0 left-0 bottom-0 right-0 z-[98] bg-gray-600 bg-opacity-40`}
      onClick={props.closeModal}
    ></div>
  );
};

const Modal = (props) => {
  return (
    <div
      className={`rounded-md z-[99] ${
        props.isOpen ? "fixed" : "hidden"
      } w-[40%] h-auto top-10 left-[50%] -translate-x-2/4 bg-black`}
    >
      <div className="flex justify-between p-4">
        <CloseIcon style={{ color: "white" }} onClick={props.closeModal} />
        <span className="text-sky-500">Drafts</span>
      </div>
      <div className="flex gap-2 p-4">
        <div className="flex-col justify-center items-center">
          <Avatar sx={{ width: "40px", height: "40px" }} />
          <div className="w-[2px] h-[90%] bg-gray-700 m-auto mt"></div>
        </div>
        <div>
          <div className="flex">
            <span className="font-bold text-white">Borys Budka</span>
            <span className="ml-2 mr-2 text-gray-500">@bbudka</span>
            <span className="text-gray-500">9h</span>
          </div>
          <div className="text-white">
            Bezpieczna polska to polska bez pis! Bezpieczna polska to polska bez
            pis! Bezpieczna polska to polska bez pis! Bezpieczna polska to
            polska bez pis! Bezpieczna polska to polska bez pis! Bezpieczna
            polska to polska bez pis! Bezpieczna polska to polska bez pis!
            Bezpieczna polska to polska bez pis! Bezpieczna polska to polska bez
            pis! Bezpieczna polska to polska bez pis! Bezpieczna polska to
            polska bez pis! Bezpieczna polska to polska bez pis!
          </div>
          <div className="mt-2 text-white">Replying to @bbudka</div>
        </div>
      </div>
      <div className="flex p-4">
        <Avatar sx={{ width: "40px", height: "40px" }} />
        <form className="w-full">
          <div className="mt-2 ml-4">
            <textarea
              cols="20"
              rows="4"
              placeholder="Post your reply"
              type="text"
              maxLength="152"
              className="w-full bg-black text-white outline-none placeholder:text-xl pb-16 max-w-md"
            ></textarea>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-4 -ml-10">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              ></input>
              <ImageIcon
                style={{ cursor: "pointer", color: "rgb(14 165 233)" }}
              />
              <GifBoxIcon style={{ color: "rgb(14 165 233)" }} />
              <EmojiEmotionsIcon style={{ color: "rgb(14 165 233)" }} />
            </div>
            <button
              className="bg-sky-500 px-4 py-2 rounded-full font-medium text-lg"
              type="submit"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CommentModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Overlay closeModal={props.closeModal} isOpen={props.isOpen} />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <Modal closeModal={props.closeModal} isOpen={props.isOpen} />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default CommentModal;
