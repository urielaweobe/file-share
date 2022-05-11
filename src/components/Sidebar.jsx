import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast} from "react-toastify"

import { Dashboard, Logout } from "@mui/icons-material";


import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then((user) => {
        // Sign-out successful.
        dispatch({ type: "LOGOUT", payload: user });
        toast.success("User logout successfully!")
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="#">
          <span className="logo">Share</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/dashboard">
            <li>
              <Dashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <hr />
        <ul>
          <li>
            <Link to="" onClick={logout}>
              <Logout className="icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
