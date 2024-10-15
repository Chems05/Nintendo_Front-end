import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../style/LoginPage.css"; // Se vuoi aggiungere del CSS personalizzato

const LoginPage = () => {
  // Stato per memorizzare l'email, la password e se il login ha avuto successo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Funzione di submit del form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulazione di un controllo di autenticazione
    if (email === "utente@example.com" && password === "password123") {
      setErrorMessage(""); // Reset messaggio di errore
      alert("Login effettuato con successo!"); // Puoi sostituirlo con un redirect o altre azioni
    } else {
      setErrorMessage("Email o password sbagliata");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-form-container shadow p-4">
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Accedi
          </button>
        </form>

        {/* Messaggio di errore */}
        {errorMessage && (
          <div className="alert alert-danger mt-3 text-center">
            {errorMessage}
          </div>
        )}

        {/* Link per la registrazione */}
        <div className="mt-3 text-center">
          <p>
            Non hai un account? <a href="/register">Registrati qui</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
