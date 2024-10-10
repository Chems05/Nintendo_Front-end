// src/components/CreateTournament.js

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logica per inviare i dati al backend per creare un torneo
    const newTournament = { name, description };

    const response = await fetch("/api/tournaments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTournament),
    });

    if (response.ok) {
      alert("Torneo creato con successo!");
      // Reindirizza l'utente o ripulisci il modulo
    } else {
      alert("Errore nella creazione del torneo.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">Crea Torneo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome Torneo</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Crea Torneo
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;
