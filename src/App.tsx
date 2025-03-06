import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import LoginForm from "./pages/Login/LoginForm";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
