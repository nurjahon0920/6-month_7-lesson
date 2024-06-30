import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuLoader, LuSettings } from "react-icons/lu";
import "./index.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPhotos, setShowPhotos] = useState(true);
  const [showTodos, setShowTodos] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("Error:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => setPhotos(res.data))
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchTodos = (userId) => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then((res) => setTodos(res.data))
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
        setShowTodos(true);
        setActiveUserId(userId);
        setShowPhotos(false);
      });
  };

  const showGallery = () => {
    setShowPhotos(true);
    setShowTodos(false);
  };

  const userElements = users.map((user) => (
    <div key={user.id} className="user">
      <div className="user_icons">
        <IoPersonCircleSharp className="icon" />
        <LuSettings className="icon" />
      </div>
      <div className="line"></div>
      <p>
        <span>#ID: </span>
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
        <button className="animated-button" onClick={() => fetchTodos(user.id)}>
          USER POSTS
        </button>
        <button className="animated-button" onClick={showGallery}>
          GALLERY
        </button>
      </div>
    </div>
  ));

  const photoElements = photos
    .filter((el) => el.albumId === 1)
    .map((item) => (
      <div key={item.id} className="photo">
        <img src={item.url} alt={item.title} />
        <p>
          <span>album id: </span>
          {item.albumId}
        </p>
        <p>
          <span>title: </span>
          {item.title}
        </p>
      </div>
    ));

  const todoElements = Todos.map((todo) => (
    <div key={todo.id} className="todo photo">
      <p>
        <span>post: </span>
        {todo.userId}
      </p>
      <p>
        <span>title: </span>
        {todo.title}
      </p>
    </div>
  ));

  return (
    <div style={{ backgroundColor: "#000000", color: "#84CC0C" }}>
      <div className="container">
        <div className="Header">
          <h1>USERS</h1>
          <IoPersonCircleSharp className="icon" color="#22c55e" />
        </div>
        <main>
          <div className="Users">{userElements}</div>
          {loading ? (
            <LuLoader className="loader" />
          ) : (
            <>
              {showPhotos && <div className="photos">{photoElements}</div>}
              {showTodos && activeUserId && (
                <div
                  className="Todos photos"
                  style={{ display: showPhotos ? "none" : "inline" }}>
                  {/* <h2>Todos by User {activeUserId}</h2> */}
                  {todoElements}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
