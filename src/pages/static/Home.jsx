import Navbar from "../../components/Navbar";
import Share from "../../assets/ud_share.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <Navbar />
        <div className="container">
          <div className="left">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              quasi!
            </h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Inventore molestias ex ea quidem sequi repellendus voluptatem,
              rerum similique soluta, debitis iure quia culpa eius suscipit
              minima! Fugiat deserunt harum non?
            </p>
            <div className="left__btn">
              <Link to="/dashboard" className="share">Share now</Link>
            </div>
          </div>
          <div className="right">
            <img src={Share} alt="share" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
