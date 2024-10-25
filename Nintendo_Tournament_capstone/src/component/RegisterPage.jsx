import { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { registerUser } from "../services/service"; // Assicurati che registerUser sia importato
import { useNavigate } from "react-router-dom";
import "../style/RegisterPage.css";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Assicurati che tutti i valori siano inizializzati come stringhe vuote
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nome: "",
    cognome: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData); // Rimuovendo l'URL dalla chiamata
      setSuccessMessage("Registrazione effettuata con successo!");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/login"); // Reindirizza alla pagina di login dopo la registrazione
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || "Registrazione fallita. Riprova.");
      setSuccessMessage("");
    }
  };

  return (
    <Container className="register-page-container my-5 d-flex flex-column justify-content-center align-items-center w-50 border rounded">
      <h2 className="mb-5">Registrati</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label className="mt-3">Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSurname">
          <Form.Label className="mt-3">Cognome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo cognome"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="mt-3">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la tua password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Registrati
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
