import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import UserNav from "./components/UserNav/UserNav";
import AuthContext from "./components/context/AuthContext";
import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Find from "./pages/Find";
import HomeNav from "./components/HomeNav/HomeNav";

function App() {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className="App">
      {user ? <UserNav /> : <Nav />}
      {location.pathname === "login" ||
        (location.pathname === "register" && <HomeNav />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find" element={<Find />} />
      </Routes>
    </div>
  );
}

export default App;
