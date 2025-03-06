import React, { useState, useEffect, useRef } from "react";
import "../../styles/ChatBox.css";
import {
  UserOutlined,
  InfoCircleTwoTone,
  SendOutlined,
} from "@ant-design/icons";
import greendot from "../../assets/greendot.webp";
import Message from "../../types/Message";

interface ChatBoxProps {
  selectedUser: string;
  selectedUserMessage: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedUser,
  selectedUserMessage,
}) => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [messageInput, setMessageInput] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("chatMessages");
    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    } else {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: [
          {
            sender: selectedUser,
            content: selectedUserMessage,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      }));
    }
  }, [selectedUser, selectedUserMessage]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        sender: "You",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [selectedUser]: [...(prevMessages[selectedUser] || []), newMessage],
        };
        return updatedMessages;
      });

      setMessageInput("");

      setTimeout(() => {
        const botReply: Message = {
          sender: "Bot",
          content: getBotReply(messageInput),
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => {
          const updatedMessages = {
            ...prevMessages,
            [selectedUser]: [...(prevMessages[selectedUser] || []), botReply],
          };
          return updatedMessages;
        });

        scrollToBottom();
      }, 1000);
    }
  };
  const getBotReply = (userInput: string): string => {
    const lowerInput = userInput.trim().toLowerCase();

    if (lowerInput.includes("hi")) {
      return "hello";
    } else if (lowerInput.includes("good morning")) {
      return "Good morning!";
    } else if (lowerInput.includes("how are you")) {
      return "I'm doing great, thanks for asking!";
    } else if (lowerInput.includes("what is the time now")) {
      return `It's ${new Date().toLocaleTimeString()}`;
    } else {
      return "Sorry, I didn't understand that.";
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-bot">
      <div className="chat-user">
        <p>
          <UserOutlined className="user-icon" />
          {selectedUser}
          <img src={greendot} className="dot" alt="online" />
        </p>
        <InfoCircleTwoTone />
      </div>
      <div className="chat-msg">
        {messages[selectedUser]?.map((msg, index) => (
          <div key={index} className={msg.sender === "You" ? "s-msg" : "r-msg"}>
            <UserOutlined />
            <p className="msg">{msg.content}</p>
            <div>
              <p>{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Send a message"
        />
        <input type="file" id="image" accept="image/png,img/jpeg" hidden />
        <SendOutlined className="send-icon" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
