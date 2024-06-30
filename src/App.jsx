import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuLoader, LuSettings } from "react-icons/lu";
import "./index.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPhotos, setShowPhotos] = useState(true);
  const [showPosts, setShowPosts] = useState(false);
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

  const fetchPosts = (userId) => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
        setShowPosts(true);
        setActiveUserId(userId);
        setShowPhotos(false);
      });
  };

  const showGallery = () => {
    setShowPhotos(true);
    setShowPosts(false);
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
        <button className="animated-button" onClick={() => fetchPosts(user.id)}>
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

  const postElements = posts.map((post) => (
    <div key={post.id} className="post photo">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
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
              {showPosts && activeUserId && (
                <div
                  className="posts photos"
                  style={{ display: showPhotos ? "none" : "inline" }}>
                  {/* <h2>Posts by User {activeUserId}</h2> */}
                  {postElements}
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
