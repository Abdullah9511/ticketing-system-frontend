import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("type");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" >
          Ticketing System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userType === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/create-agent" ? "active" : ""
                    }`}
                    to="/createagent"
                  >
                    Create Agent
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/viewagenttickets" ? "active" : ""
                    }`}
                    to="/viewagenttickets"
                  >
                    View Tickets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/createticket" ? "active" : ""
                    }`}
                    to="/createticket"
                  >
                    Create Ticket
                  </Link>
                </li>
              </>
            )}
            {userType === "agent" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/agentdashboard" ? "active" : ""
                  }`}
                  to="/agentdashboard"
                >
                  View Tickets
                </Link>
              </li>
            )}
          </ul>

          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
