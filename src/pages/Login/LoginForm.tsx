import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

interface User {
  userName: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

const Login: React.FC = () => {
  const [currentState, setCurrentState] = useState<string>("Sign up");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      if (parsedUser.isLoggedIn) {
        navigate("/chat");
      }
    }
  }, [navigate]);

  const onFinish = (values: any) => {
    const { userName, email, password } = values;

    if (currentState === "Sign up") {
      const user: User = { userName, email, password, isLoggedIn: false };
      localStorage.setItem("user", JSON.stringify(user));
      message.success("User signed up successfully!");
      setCurrentState("Login");
    } else {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser: User = JSON.parse(savedUser);
        if (
          parsedUser.userName === userName &&
          parsedUser.password === password
        ) {
          const updatedUser = { ...parsedUser, isLoggedIn: true };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          message.success("Login successful!");
          navigate("/chat");
        } else {
          message.error("Invalid username or password. Please try again.");
        }
      } else {
        message.error("No user found. Please sign up first.");
      }
    }
  };

  return (
    <div className="login">
      <Form className="login-form" onFinish={onFinish} layout="vertical">
        <h2>{currentState}</h2>

        {currentState === "Sign up" && (
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Username" className="form-input" />
          </Form.Item>
        )}

        {currentState === "Sign up" && (
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input placeholder="Email" className="form-input" />
          </Form.Item>
        )}

        {currentState !== "Sign up" && (
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Username" className="form-input" />
          </Form.Item>
        )}

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" className="form-input" />
        </Form.Item>

        <Button type="primary" className="btn" htmlType="submit">
          {currentState === "Sign up" ? "Create Account" : "Login now"}
        </Button>

        <div className="login-toggle">
          {currentState === "Sign up" ? (
            <p>
              Already have an account?
              <span
                className="spanTag"
                onClick={() => setCurrentState("Login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?
              <span
                className="spanTag"
                onClick={() => setCurrentState("Sign up")}
              >
                Create an account
              </span>
            </p>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
