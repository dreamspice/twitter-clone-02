import { useState, useId, useRef } from "react";
import { Avatar, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import "firebase/database";
import "firebase/storage";
import moment from "moment";
import { useDispatch } from "react-redux";
import { postsActions } from "../store";

function WhatsHappening() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);
  const { displayName, email, photoURL, uid } = currentUser;
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const [images, setImages] = useState([]);

  const fileInputRef = useRef(null);

  const handleChooseImage = () => {
    fileInputRef.current.click();
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setThumbnail(e.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log(files);
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        imageArray.push({ file, thumbnail: event.target.result });
        if (imageArray.length === files.length) {
          setImages(imageArray);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // const uploadImage = async () => {
  //   if (image) {
  //     const storageRef = firebase.storage().ref();
  //     const fileRef = storageRef.child(image.name);
  //     await fileRef.put(image);
  //     const imageUrl = await fileRef.getDownloadURL();
  //     return imageUrl;
  //   }
  //   return null;
  // };

  const uploadImages = async () => {
    const imagesUrls = [];
    for (let i = 0; i < images.length; i++) {
      const { file } = images[i];
      if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const imageUrl = await fileRef.getDownloadURL();
        imagesUrls.push(imageUrl);
      }
    }
    return imagesUrls;
  };

  const submit = async (e) => {
    e.preventDefault();

    const imagesUrl = await uploadImages();
    const newPostRef = firebase.database().ref("posts").push();
    const postId = newPostRef.getKey();
    const newPost = {
      postId,
      displayName,
      text,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      photoURL,
      howManyLikes: 0,
      howManyComments: 0,
      comments: [],
      whoLiked: [],
      imagesUrl,
      uid,
    };
    if (!text) return;
    newPostRef.set(newPost);
    setText("");
    setImages([]);
    // setThumbnail(null);

    const postsRef = firebase.database().ref("posts");
    try {
      const snapshot = await postsRef.once("value");
      const posts = snapshot.val();
      dispatch(postsActions.setPosts(posts));
    } catch (error) {
      dispatch(postsActions.setError(error.message));
    }
  };
  return (
    <div className="w-full pb-2 border-b-[1px] border-gray-500">
      <div className="flex justify-center pl-8 mt-8">
        <div className="pr-8">
          <Avatar
            sx={{ width: "64px", height: "64px", zIndex: "-1" }}
            src={photoURL}
          />
        </div>
        <div className="flex flex-col gap-8 basis-full">
          <form onSubmit={submit}>
            <div className="pl-6 mt-4">
              <input
                placeholder="What's happening?"
                type="text"
                className="w-full bg-black outline-none placeholder:text-xl pb-16"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></input>
              {/* {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="w-12 h-12 rounded-xl"
                />
              )} */}
              <div className="flex">
                {images.map((image, index) => (
                  <div key={index} className="w-12 h-12 rounded-xl">
                    <img src={image.thumbnail} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-6 mt-2">
              <div className="flex gap-4">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  multiple
                ></input>
                <ImageIcon
                  onClick={handleChooseImage}
                  style={{ cursor: "pointer" }}
                />
                <GifBoxIcon />
                <EmojiEmotionsIcon />
              </div>
              <div>
                <button
                  className="bg-sky-500 px-4 py-2 rounded-full font-medium text-lg"
                  type="submit"
                >
                  Tweet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WhatsHappening;
