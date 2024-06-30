import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuLoader } from "react-icons/lu";

const Photos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  let links = data
    .filter((el) => el.albumId === 1)
    ?.map((item) => (
      <div key={item.id} className="photo">
        <img src={item.url} alt={item.title} />
        <p>
          <span>albom id : </span>
          {item.albumId}
        </p>
        <p>
          <span>title: </span>
          {item.title}
        </p>
      </div>
    ));
  return (
    <div className="photos">
      {loading ? <LuLoader /> : <></>} {links}
    </div>
  );
};

export default Photos;
