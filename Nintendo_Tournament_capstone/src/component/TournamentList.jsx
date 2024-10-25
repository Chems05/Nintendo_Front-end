import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/TournamentList.css";
import {
  fetchTournaments,
  createTournament,
  updateTournament,
  deleteTournament,
} from "../services/service";
import { Row, Col } from "react-bootstrap";

const TournamentList = () => {
  const [nomeTorneo, setNomeTorneo] = useState("");
  const [dataInizio, setDataInizio] = useState("");
  const [dataFine, setDataFine] = useState("");
  const [numeroMassimoPartecipanti, setNumeroMassimoPartecipanti] = useState(0);
  const [statoTorneo, setStatoTorneo] = useState("IN_CORSO");
  const [giocoId, setGiocoId] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [organizzatoreId, setOrganizzatoreId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tornei, setTornei] = useState([]);
  const [editingTournamentId, setEditingTournamentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setOrganizzatoreId(storedUser.id);
    }
    fetchTournamentsFromService();
  }, []);

  const fetchTournamentsFromService = async () => {
    try {
      const data = await fetchTournaments();
      console.log("Dati ricevuti:", data);
      if (data && data.content) {
        setTornei(data.content);
      } else {
        console.error("Dati non sono validi:", data);
        setTornei([]);
      }
    } catch (error) {
      console.error("Errore nel recupero dei tornei:", error);
      setTornei([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const torneoData = {
      nomeTorneo,
      dataInizio,
      dataFine,
      numeroMassimoPartecipanti,
      statoTorneo,
      giocoId,
      organizzatoreId,
      descrizione,
    };

    try {
      if (editingTournamentId) {
        const response = await updateTournament(
          editingTournamentId,
          torneoData
        );
        console.log("Torneo aggiornato con successo:", response);
      } else {
        const response = await createTournament(torneoData);
        console.log("Torneo creato con successo:", response);
      }
      fetchTournamentsFromService();
      resetForm();
    } catch (error) {
      console.error(
        "Errore nella creazione o aggiornamento del torneo:",
        error
      );
    }
  };

  const resetForm = () => {
    setNomeTorneo("");
    setDataInizio("");
    setDataFine("");
    setNumeroMassimoPartecipanti(0);
    setStatoTorneo("IN_CORSO");
    setGiocoId("");
    setDescrizione("");
    setEditingTournamentId(null);
  };

  const handleEdit = (torneo) => {
    setNomeTorneo(torneo.nomeTorneo);
    setDataInizio(torneo.dataInizio);
    setDataFine(torneo.dataFine);
    setNumeroMassimoPartecipanti(torneo.numeroMassimoPartecipanti);
    setStatoTorneo(torneo.statoTorneo);
    setGiocoId(torneo.giocoId);
    setDescrizione(torneo.descrizione);
    setEditingTournamentId(torneo.id);
    setShowForm(true);
  };

  const handleDelete = async (tournamentId) => {
    try {
      await deleteTournament(tournamentId);
      console.log("Torneo eliminato con successo");
      fetchTournamentsFromService();
    } catch (error) {
      console.error("Errore nell'eliminazione del torneo:", error);
    }
  };

  const toggleForm = () => {
    resetForm();
    setShowForm(!showForm);
  };

  const handleParticipate = (torneoId) => {
    navigate(`/tournament/${torneoId}`);
  };

  return (
    <div className="tournament-list-container">
      <button className="btn-open-form" onClick={toggleForm}>
        {showForm ? "Chiudi Form" : "Crea un Nuovo Torneo"}
      </button>
      <div className={showForm ? "form-visible" : "form-hidden"}>
        <div className="create-tournament-container">
          <h2>{editingTournamentId ? "Modifica Torneo" : "Crea un Torneo"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome del Torneo:</label>
              <input
                type="text"
                value={nomeTorneo}
                onChange={(e) => setNomeTorneo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Data di Inizio:</label>
              <input
                type="date"
                value={dataInizio}
                onChange={(e) => setDataInizio(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Data di Fine:</label>
              <input
                type="date"
                value={dataFine}
                onChange={(e) => setDataFine(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Numero Massimo di Partecipanti:</label>
              <input
                type="number"
                value={numeroMassimoPartecipanti}
                onChange={(e) => setNumeroMassimoPartecipanti(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Stato del Torneo:</label>
              <select
                value={statoTorneo}
                onChange={(e) => setStatoTorneo(e.target.value)}
              >
                <option value="IN_CORSO">In Corso</option>
                <option value="CONCLUSO">Concluso</option>
                <option value="CANCELLATO">Cancellato</option>
              </select>
            </div>
            <div className="form-group">
              <label>ID del Gioco:</label>
              <input
                type="text"
                value={giocoId}
                onChange={(e) => setGiocoId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Descrizione:</label>
              <textarea
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-create-tournament">
              {editingTournamentId ? "Aggiorna Torneo" : "Crea Torneo"}
            </button>
          </form>
        </div>
      </div>
      <div className="tournament-cards">
        <Row>
          {tornei.length > 0 ? (
            tornei.map((torneo) => (
              <Col md={4} key={torneo.id} className="mb-4">
                <div className="tournament-card">
                  <h3>{torneo.nomeTorneo}</h3>
                  <p>Data di Inizio: {torneo.dataInizio}</p>
                  <p>Data di Fine: {torneo.dataFine}</p>
                  <p>Partecipanti: {torneo.numeroMassimoPartecipanti}</p>
                  <p>Stato: {torneo.statoTorneo}</p>
                  <p>Descrizione: {torneo.descrizione}</p>
                  <button
                    onClick={() => handleEdit(torneo)}
                    className="btn-edit"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(torneo.id)}
                    className="btn-delete"
                  >
                    Elimina
                  </button>
                  <button
                    onClick={() => handleParticipate(torneo.id)}
                    className="btn-participate"
                  >
                    Partecipa
                  </button>
                </div>
              </Col>
            ))
          ) : (
            <p>Nessun torneo disponibile.</p>
          )}
        </Row>
      </div>
    </div>
  );
};

export default TournamentList;
