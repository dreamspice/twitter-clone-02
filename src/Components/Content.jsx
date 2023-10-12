import React, { useState } from "react";
import firebase from "../firebase";
import FixedHeader from "./FixedHeader";
import WhatsHappening from "./WhatsHappening";
import Posts from "./Posts";

function Content() {
  const [data, setData] = useState(null);

  firebase
    .database()
    .ref("/name")
    .once("value")
    .then((snapshot) => {
      setData(snapshot.val());
    });
  return (
    <div className="content text-white overflow-y-scroll basis-2/4 ml-20 border-gray-700 border-l-[1px] border-r-[1px]">
      <FixedHeader />
      <WhatsHappening />
      <Posts />
    </div>
  );
}

export default Content;
