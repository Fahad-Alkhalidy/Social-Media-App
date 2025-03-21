import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../../Styling/App.css";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Chat from "./Chat";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
