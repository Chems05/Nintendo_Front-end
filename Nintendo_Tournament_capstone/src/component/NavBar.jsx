// src/components/NavBar.js
import "bootstrap/dist/css/bootstrap.css";
import "../style/NavBar.css";
import logo from "../assets/nintendo.logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && storedUser) {
      const userObj = JSON.parse(storedUser);
      console.log("User from localStorage:", userObj); // Log per il debug
      setUser(userObj);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("avatar"); // Rimuovi l'avatar dal localStorage
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Nintendo Logo" width="160" height="160" />
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tournament">
                Tornei
              </Link>
            </li>
            {/* Visualizza la Chat solo se il token è presente */}
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link className="nav-link" to="/chat">
                  Chat
                </Link>
              </li>
            )}
            {user ? (
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle
                    className="nav-link dropdown-toggle btn-dark d-flex align-items-center"
                    id="navbarDropdown"
                    aria-expanded="false"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="Avatar"
                        roundedCircle
                        width={30}
                        height={30}
                        className="me-2"
                      />
                    ) : (
                      <div
                        className="me-2"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                        }}
                      ></div>
                    )}
                    {user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu aria-labelledby="navbarDropdown">
                    <Dropdown.Item as={Link} to="/profile">
                      Profilo
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
