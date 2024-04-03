import { Link } from "react-router-dom";
import "./Nav.scss";

function Navcom() {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="#">
            mdShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse align-items-center justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-white active"
                  aria-current="page"
                  to="/"
                >
                  All Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/create">
                  Create Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white">Cart[0]</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navcom;
