import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import firebase from "../firebase";
import "firebase/database";
import { useDispatch } from "react-redux";
import { postsActions } from "../store";
import CommentModal from "./CommentModal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { CSSTransition } from "react-transition-group";
import "../index.css";

function Post(props) {
  const userID = useSelector((state) => state.auth.currentUser.uid);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(() => {
    const firebasePostRef = firebase.database().ref(`posts/${props.id}`);
    firebasePostRef.once("value").then((snapshot) => {
      const value = snapshot.val();
      if (!value) return;
      const { whoLiked } = value;
      if (!whoLiked) return;
      const whoLikedArray = [];
      Object.values(whoLiked).forEach((val) => {
        whoLikedArray.push(val);
      });
      const user = whoLikedArray?.find((user) => user === userID);
      if (user) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  });

  const addOrRemoveLike = async () => {
    const firebasePostRef = firebase.database().ref(`posts/${props.id}`);
    firebasePostRef.once("value").then((snapshot) => {
      const value = snapshot.val();
      const { whoLiked } = value;
      const whoLikedArray = [];
      if (whoLiked) {
        Object.values(whoLiked).forEach((val) => {
          whoLikedArray.push(val);
        });
      }
      const userIndex = whoLikedArray?.indexOf(userID);
      console.log(userIndex);
      if (userIndex === -1) {
        let currentLikes;
        firebasePostRef.child("howManyLikes").once("value", (snapshot) => {
          currentLikes = snapshot.val();
          firebasePostRef.update({ howManyLikes: currentLikes + 1 });
          firebasePostRef.child("whoLiked").push(userID);
          setIsLiked(true);
        });
      }
      if (userIndex > -1) {
        let currentLikes;
        firebasePostRef.child("howManyLikes").once("value", (snapshot) => {
          currentLikes = snapshot.val();
          firebasePostRef.update({ howManyLikes: currentLikes - 1 });
          firebasePostRef
            .child("whoLiked")
            .child(Object.keys(whoLiked)[userIndex])
            .remove();
          setIsLiked(false);
        });
      }
    });

    const postsRef = firebase.database().ref("posts");
    try {
      const snapshot = await postsRef.once("value");
      const posts = snapshot.val();
      dispatch(postsActions.setPosts(posts));
    } catch (error) {
      dispatch(postsActions.setError(error.message));
    }
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deliveredComment, setDeliveredComment] = useState("");
  const [numberOfComments, setNumberOfComments] = useState();
  const [error, setError] = useState(false);

  const [postData, setPostData] = useState({});

  const warningRef = useRef(null);

  useEffect(() => {
    const firebasePostRef = firebase.database().ref(`posts/${props.id}`);
    const commentsRef = firebasePostRef.child("comments");
    commentsRef.once("value").then((snapshot) => {
      const numberOfComments = snapshot.numChildren();
      setNumberOfComments(numberOfComments);
    });
  }, [deliveredComment]);

  const openCommentModal = async () => {
    const firebasePostRef = firebase.database().ref(`posts/${props.id}`);
    try {
      const textSnapshot = await firebasePostRef.child("text").once("value");
      const text = textSnapshot.val();
      const nameSnapshot = await firebasePostRef
        .child("displayName")
        .once("value");
      const notSlicedName = nameSnapshot.val();
      const nameArray = notSlicedName.split(" ");
      const name = nameArray[0];
      const fullName = notSlicedName;
      const uidSnapshot = await firebasePostRef.child("uid").once("value");
      const notSlicedUid = uidSnapshot.val();
      const uid = notSlicedUid.slice(1, 6);
      const photoSnapshot = await firebasePostRef
        .child("photoURL")
        .once("value");
      const photo = photoSnapshot.val();
      setPostData({ text, name, uid, fullName, photo });
    } catch {
      console.error(error);
    }
    setIsOpenModal((prevstate) => !prevstate);
  };

  const closeModal = () => {
    setIsOpenModal((prevstate) => !prevstate);
  };

  const deliverComment = (comment) => {
    setDeliveredComment(comment);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!deliveredComment) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 9000);
      return;
    }

    const firebasePostRef = firebase.database().ref(`posts/${props.id}`);

    const commentsRef = firebasePostRef.child("comments");
    const newCommentRef = commentsRef.push(); // Generuj unikatowy identyfikator
    const commentKey = newCommentRef.key;

    const commentData = {
      id: commentKey,
      authorId: userID,
      text: deliveredComment,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    newCommentRef.set(commentData);

    const postsRef = firebase.database().ref("posts");
    try {
      const snapshot = await postsRef.once("value");
      const posts = snapshot.val();
      dispatch(postsActions.setPosts(posts));
    } catch (error) {
      dispatch(postsActions.setError(error.message));
    }
    setDeliveredComment("");
    closeModal();
  };

  return (
    <div className="w-full p-4 border-b-[1px] border-gray-700">
      {isOpenModal && (
        <CommentModal
          isOpen={isOpenModal}
          closeModal={closeModal}
          addComment={addComment}
          deliverComment={deliverComment}
          postData={postData}
        />
      )}
      <CSSTransition
        nodeRef={warningRef}
        in={error}
        timeout={6000}
        classNames="warning"
      >
        <div
          ref={warningRef}
          className="z-[999] fixed left-2/4 -translate-x-2/4 top-2"
        >
          {error && (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              <strong>Comment cannot be empty!</strong>
            </Alert>
          )}
        </div>
      </CSSTransition>
      <div className="flex">
        <div className="mr-4">
          <Avatar
            sx={{ width: "64px", height: "64px", zIndex: "-1" }}
            src={props.photo}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-1">
            <div>
              <span className="font-medium text-lg mr-2">{props.name}</span>
              <span className="text-gray-500">{props.time}</span>
            </div>
            <button>
              <MoreHorizOutlinedIcon sx={{ color: "rgb(107, 114, 128)" }} />
            </button>
          </div>
          <div>
            <span>{props.text}</span>
            <div>
              {props.images.length === 1 && (
                <img src={props.images} className="mt-2 " />
              )}
            </div>
            <div className={`grid grid-cols-${props.images.length}`}>
              {props.images.length > 1 &&
                props.images.map((image, key) => (
                  <img src={image} className="mt-2 "></img>
                ))}
            </div>
            {/* {props.images.map((image, key) => (
            <div>
              <img src={image}></img>
            </div>
          ))} */}
          </div>
          <div className="mt-2">
            <button
              className={"mr-4  text-gray-500 hover:text-sky-500"}
              onClick={openCommentModal}
            >
              <ChatBubbleOutlineOutlinedIcon />
              <span className="ml-1">{numberOfComments}</span>
            </button>
            <button
              className={`mr-4 text-gray-500 hover:text-red-500 ${
                isLiked ? "text-red-500" : ""
              }`}
              onClick={addOrRemoveLike}
            >
              <FavoriteBorderOutlinedIcon />
              <span className="ml-1">{props.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
