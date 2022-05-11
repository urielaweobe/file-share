import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
        <div className="wrapper">
          <div className="logo">
            <h1>SHARE</h1>
          </div>
          <div className="links">
            <Link to="#" className="about">About</Link>
            <Link to="/dashboard" className="share">Share now</Link>
          </div>
        </div>
    </div>
  )
}

export default Navbar