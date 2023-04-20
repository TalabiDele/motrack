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
import { AnimatePresence } from "framer-motion";

function App() {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className="App">
      {user ? <UserNav /> : <Nav />}
      {(location.pathname === "/login" ||
        location.pathname === "/register") && <HomeNav />}
      <AnimatePresence>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={"/find"} replace={true} /> : <Home />}
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to={"/find"} replace={true} /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to={"/find"} replace={true} /> : <Register />
            }
          />
          <Route
            path="/find"
            element={
              user ? <Find /> : <Navigate to={"/login"} replace={true} />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
