import React from "react";
import "../../styles/RightSideBar.css";
import profilepic from "../../assets/profilepic.webp";
import greendotbg from "../../assets/greendot-bgblack.webp";
import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.webp";
import image3 from "../../assets/image3.webp";
import image4 from "../../assets/image4.webp";
import image5 from "../../assets/image5.webp";
import image6 from "../../assets/image6.webp";
import { useNavigate } from "react-router-dom";

const RightSideBar: React.FC = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    if (user.userName) {
      user.isLoggedIn = false;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    navigate("/");
  };

  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={profilepic} alt="Profile" />
        <h3>
          {user.userName || "Guest"}
          {user.isLoggedIn && (
            <img src={greendotbg} className="green-dot" alt="Online Status" />
          )}
        </h3>
        <p>Hey there, I am {user.userName || "Guest"} using the chat app</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={image1} alt="Media 1" />
          <img src={image2} alt="Media 2" />
          <img src={image3} alt="Media 3" />
          <img src={image4} alt="Media 4" />
          <img src={image5} alt="Media 5" />
          <img src={image6} alt="Media 6" />
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RightSideBar;
