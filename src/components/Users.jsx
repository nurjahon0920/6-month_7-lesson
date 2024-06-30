import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";

const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Error:", err));
  }, []);
  let users = data.map((user) => (
    <div key={user.id} className="user">
      <div className="user_icons">
        <IoPersonCircleSharp className="icon" />
        <LuSettings className="icon" />
      </div>
      <div className="line"></div>
      <p>
        <span>#ID : </span>
        {user.id}
      </p>
      <p>
        <span># NAME: </span>
        {user.name}
      </p>
      <p>
        <span># USER NAME: </span>
        {user.username}
      </p>
      <div className="user_buttons">
        <button className="animated-button">USER TODOS</button>
        <button className="animated-button">GALLARY</button>
      </div>
    </div>
  ));
  return (
    <div className="Users">
      <div>{users}</div>
    </div>
  );
};

export default Users;
