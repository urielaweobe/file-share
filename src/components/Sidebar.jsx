import { Link } from "react-router-dom";
import { Dashboard, Logout } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="">
          <span className="logo">Share</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <hr />
        <ul>
          <li>
            <Link to="">
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
