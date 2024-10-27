import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import torneoImg from "../assets/tornei.png";
import "../style/TournamentPage.css";
import { useNavigate } from "react-router-dom";

const TournamentPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleTournamentClick = () => {
    navigate("/tournamentlist");
  };

  return (
    <div className="tournament-page">
      {!user ? (
        <section className="tournament-hero text-left py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">REGISTRATI ORA!</h1>
            <p className="lead">
              Partecipa e crea tornei nella nuova piattaforma dedicata a
              Nintendo!
            </p>
            <a href="/register" className="btn btn-warning btn-lg mt-3">
              Iscriviti Ora!
            </a>
          </div>
        </section>
      ) : (
        <Container className="mt-5">
          <Row>
            <Col>
              <h2 className="mb-4">Benvenuto, {user.username}!</h2>
              <p>Scopri i tornei disponibili.</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12} md={6}>
              <img
                src={torneoImg}
                alt="Visualizza Tornei"
                className="zoom-image"
                onClick={handleTournamentClick}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TournamentPage;
