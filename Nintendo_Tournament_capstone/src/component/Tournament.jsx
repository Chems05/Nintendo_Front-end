import { useState, useEffect } from "react";
import { Modal, Button, Form, Card, Row, Col, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { creaSquadra, ottieniTutteLeSquadre } from "../services/service";
import "../style/Tournament.css";

const Tournament = () => {
  const { torneoId } = useParams();
  const [squadre, setSquadre] = useState([]);
  const [nome, setNome] = useState("");
  const [giocatori, setGiocatori] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [nomeTorneo, setNomeTorneo] = useState("");
  const [matchTeams, setMatchTeams] = useState({});

  useEffect(() => {
    fetchSquadre();
  }, [torneoId]);

  const fetchSquadre = async () => {
    try {
      const data = await ottieniTutteLeSquadre(torneoId);
      setSquadre(data.squadre);
      setNomeTorneo(data.nome);
    } catch (error) {
      console.error("Errore durante il recupero delle squadre:", error);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token mancante. Effettua il login.");
      return;
    }

    const newTeam = {
      nome: nome,
      torneoId: torneoId,
      giocatoriIds: giocatori.map((id) => id.trim()).filter((id) => id),
    };

    try {
      await creaSquadra(newTeam);
      setNome("");
      setGiocatori([]);
      fetchSquadre();
    } catch (error) {
      console.error("Errore durante la creazione della squadra:", error);
      alert(`Errore: ${error.message || "Errore sconosciuto."}`);
    }
  };

  const handleShowParticipants = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleSelectTeam = (matchIndex, team) => {
    setMatchTeams((prev) => ({ ...prev, [matchIndex]: team }));
  };

  return (
    <div className="tournament-container">
      <h2 className="tournament-title">
        Gestisci le Squadre per il Torneo {nomeTorneo}
      </h2>

      <Row>
        <Col md={4}>
          <Form onSubmit={handleCreateTeam} style={{ maxWidth: "250px" }}>
            <Form.Group controlId="formTeamName">
              <Form.Label>Nome della Squadra</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                size="sm"
              />
            </Form.Group>
            <Form.Group controlId="formPlayerIds">
              <Form.Label>ID Giocatori (separati da virgola)</Form.Label>
              <Form.Control
                type="text"
                value={giocatori.join(",")}
                onChange={(e) =>
                  setGiocatori(e.target.value.split(",").map((id) => id.trim()))
                }
                size="sm"
              />
            </Form.Group>
            <Button type="submit" size="sm">
              Crea Squadra
            </Button>
          </Form>

          <div className="team-cards">
            {squadre.length > 0 ? (
              squadre.map((squadra) => (
                <Card key={squadra.id} style={{ margin: "10px" }}>
                  <Card.Body>
                    <Card.Title>{squadra.nome}</Card.Title>
                    <Button
                      variant="secondary"
                      onClick={() => handleShowParticipants(squadra)}
                    >
                      Partecipanti
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Nessuna squadra trovata.</p>
            )}
          </div>
        </Col>

        <Col md={8}>
          <div className="bracket">
            <h3>Tabellone</h3>

            {[8, 4, 2, 1].map((numMatches, roundIndex) => (
              <div className="round" key={`round-${roundIndex}`}>
                <h4>
                  {roundIndex === 3
                    ? "FINALE"
                    : `Round ${roundIndex + 1} (${numMatches} Squadre)`}
                </h4>
                <div className="match-container">
                  {Array.from({ length: numMatches }, (_, i) => (
                    <div className="match" key={`match-${roundIndex}-${i}`}>
                      <Dropdown>
                        <Dropdown.Toggle variant="success">
                          {matchTeams[`match-${roundIndex}-${i}`]
                            ? matchTeams[`match-${roundIndex}-${i}`].nome
                            : "Seleziona Team"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {squadre.map((squadra) => (
                            <Dropdown.Item
                              key={squadra.id}
                              onClick={() =>
                                handleSelectTeam(
                                  `match-${roundIndex}-${i}`,
                                  squadra
                                )
                              }
                            >
                              {squadra.nome}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Partecipanti della {selectedTeam?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeam?.giocatori && selectedTeam.giocatori.length > 0 ? (
            selectedTeam.giocatori.map((giocatore) => (
              <div
                key={giocatore.id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={giocatore.avatar}
                  alt={`${giocatore.nome}'s avatar`}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <p>{giocatore.nome}</p>
              </div>
            ))
          ) : (
            <p>Nessun partecipante trovato.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tournament;
