import { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import LeftSideBar from "../../components/LeftSidebar/LeftSideBar";
import RightSideBar from "../../components/RightSidebar/RightSideBar";
import "../../styles/Chat.css";
import Message from "../../types/Message";

const Chat = () => {
  const [userMessages] = useState<Map<string, Message[]>>(new Map());
  const [selectedUser, setSelectedUser] = useState<string>("Alexa");

  const handleSelectUser = (username: string) => {
    setSelectedUser(username);
  };

  return (
    <div className="chat">
      <div className="chat-container">
        <LeftSideBar onSelectUser={handleSelectUser} />

        <ChatBox
          selectedUser={selectedUser}
          selectedUserMessage={
            userMessages.get(selectedUser)?.[0]?.content || "No messages yet"
          }
        />

        <RightSideBar />
      </div>
    </div>
  );
};

export default Chat;
