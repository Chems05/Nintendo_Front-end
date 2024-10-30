import { useState } from "react";
import "../style/Contattaci.css";

const Contattaci = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Stato per gestire la visibilità del popup

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted", { name, email, message });

    // Mostra il popup di successo
    setIsSuccess(true);

    // Resetta il modulo dopo l'invio
    setName("");
    setEmail("");
    setMessage("");

    // Nascondi il popup dopo 3 secondi
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="contact-form-container">
      <h2>Contatta il Team</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Messaggio:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Invia
        </button>
      </form>

      {/* Popup di successo */}
      {isSuccess && (
        <div className="success-popup">Richiesta inviata con successo!</div>
      )}
    </div>
  );
};

export default Contattaci;
