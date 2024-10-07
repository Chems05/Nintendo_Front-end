import "bootstrap/dist/css/bootstrap.css";
import "../style/NavBar.css";
import logo from "../assets/nintendo.logo.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Nintendo Logo" width="160" height="160" />
        </a>
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
            {" "}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tornei
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                chat
              </a>
            </li>
            <li className="nav-item">
              <div className="user-icon"></div> {/* l'immagine dell'utente */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
