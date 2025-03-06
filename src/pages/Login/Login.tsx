import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "antd";
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
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    return usernameRegex.test(username);
  };

  const isValidPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (currentState === "Sign up") {
      if (!userName || !email || !password) {
        alert("Please fill out all fields.");
        return;
      }

      if (!isValidUsername(userName)) {
        setUsernameError(
          "Username must be at least 3 characters long and contain only alphanumeric characters."
        );
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!isValidPassword(password)) {
        setPasswordError(
          "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }

      const user: User = { userName, email, password, isLoggedIn: false };
      localStorage.setItem("user", JSON.stringify(user));
      alert("User signed up successfully!");
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
          alert("Login successful!");
          navigate("/chat");
        } else {
          alert("Invalid username or password. Please try again.");
        }
      } else {
        alert("No user found. Please sign up first.");
      }
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currentState}</h2>

        {currentState === "Sign up" && (
          <>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
              value={userName}
              type="text"
              placeholder="Username"
              className="form-input"
              required
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
              type="email"
              placeholder="Email"
              className="form-input"
              required
            />
          </>
        )}

        {currentState !== "Sign up" && (
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
            value={userName}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        )}

        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        {passwordError && <p className="error-message">{passwordError}</p>}

        <Button type="primary" className="btn" htmlType="submit">
          {currentState === "Sign up" ? "Create Account" : "Login now"}
        </Button>

        <div className="login-forgot">
          {currentState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?
              <span
                className="spanTag"
                onClick={() => setCurrentState("Login")}
              >
                {" "}
                Login here{" "}
              </span>
            </p>
          ) : (
            <p className="login-toggle">
              Don't have an account?
              <span
                className="spanTag"
                onClick={() => setCurrentState("Sign up")}
              >
                {" "}
                Create an account{" "}
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
