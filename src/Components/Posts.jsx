import { useState, useEffect } from "react";
import Post from "./Post";
import firebase from "../firebase";
import "firebase/database";
import { postsActions } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = firebase.database().ref("posts");
      try {
        const snapshot = await postsRef.once("value");
        const posts = snapshot.val();
        dispatch(postsActions.setPosts(posts));
      } catch (error) {
        dispatch(postsActions.setError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {posts &&
        Object.values(posts)
          .reverse()
          .map((post) => (
            <Post
              id={post.postId}
              name={post.displayName}
              text={post.text}
              photo={post.photoURL}
              time={moment(post.timestamp).fromNow()}
              key={post.timestamp}
              likes={post.howManyLikes}
              comments={post.comments}
              image={post.imageUrl}
            />
          ))}
    </div>
  );
}

export default Posts;
