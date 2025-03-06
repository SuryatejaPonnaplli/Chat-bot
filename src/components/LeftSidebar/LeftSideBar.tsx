import "../../styles/LeftSideBar.css";
import {
  WechatOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

interface LeftSideBarProps {
  onSelectUser: (username: string, message: string) => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const users = [
    { username: "Alexa", message: "Available" },
    { username: "Bixby", message: "Busy" },
    { username: "Siri", message: "Can't take calls" },
    { username: "Wiu", message: "Only messages" },
  ];

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <div className="icons-container">
            <WechatOutlined className="weChat" />
            <h2>Chat App</h2>
          </div>
          <div className="ls-search">
            <SearchOutlined className="search" />
            <input
              type="text"
              placeholder="Search here.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="ls-list">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className="friends"
              onClick={() => onSelectUser(user.username, user.message)}
            >
              <UserOutlined
                className="userIcon"
                style={{ fontSize: "24px", marginLeft: "12px" }}
              />
              <div>
                <p>{user.username}</p>
                <span>{user.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
