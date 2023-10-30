import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import firebase from "../firebase";
import "firebase/database";
import "firebase/storage";

const Overlay = (props) => {
  return (
    <div
      className={`
        ${props.isOpen ? "fixed" : "hidden"}
      top-0 left-0 bottom-0 right-0 z-[99] bg-gray-600 bg-opacity-40`}
      onClick={props.closeModal}
    ></div>
  );
};

const Modal = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { photoURL } = currentUser;
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const fileInputRef = useRef(null);

  const handleChooseImage = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbnail(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (image) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(image.name);
      await fileRef.put(image);
      const imageUrl = await fileRef.getDownloadURL();
      return imageUrl;
    }
    return null;
  };

  let comment;
  const handleInputChange = (e) => {
    comment = e.target.value;
    props.deliverComment(comment);
  };

  return (
    <div
      className={`rounded-md z-[99] ${
        props.isOpen ? "fixed" : "hidden"
      } w-[40%] h-auto top-10 left-[50%] -translate-x-2/4 bg-black`}
    >
      <div className="flex justify-between px-6 pt-4">
        <CloseIcon
          style={{ color: "white", cursor: "pointer" }}
          onClick={props.closeModal}
        />
        <span className="text-sky-500">Drafts</span>
      </div>
      <div className="flex gap-2 p-4">
        <div className="flex-col justify-center items-center">
          <Avatar
            sx={{ width: "40px", height: "40px" }}
            src={props.postData.photo}
          />
          <div className="w-[2px] h-[90%] bg-gray-700 m-auto mt"></div>
        </div>
        <div>
          <div className="flex">
            <span className="font-bold text-white">
              {props.postData.fullName}
            </span>
            <span className="ml-2 mr-2 text-gray-500">
              @{props.postData.name}
              {props.postData.uid}
            </span>
            <span className="text-gray-500">9h</span>
          </div>
          <div className="text-white">{props.postData.text}</div>
          <div className="mt-2 text-white">
            Replying to
            <span className="text-sky-500 ml-2">
              @{props.postData.name}
              {props.postData.uid}
            </span>
          </div>
        </div>
      </div>
      <div className="flex p-4">
        <Avatar sx={{ width: "40px", height: "40px" }} src={photoURL} />
        <form className="w-full" onSubmit={props.addComment}>
          <div className="mt-2 ml-4">
            <textarea
              cols="20"
              rows="4"
              placeholder="Post your reply"
              type="text"
              maxLength="152"
              className="w-full bg-black text-white outline-none placeholder:text-xl pb-16 max-w-md"
              onChange={handleInputChange}
              value={comment}
            ></textarea>
          </div>
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-12 h-12 rounded-xl"
            />
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4 -ml-10">
              <ImageIcon
                onClick={handleChooseImage}
                style={{ cursor: "pointer", color: "rgb(14 165 233)" }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              ></input>
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
        <Modal
          closeModal={props.closeModal}
          isOpen={props.isOpen}
          addComment={props.addComment}
          deliverComment={props.deliverComment}
          postData={props.postData}
        />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default CommentModal;
