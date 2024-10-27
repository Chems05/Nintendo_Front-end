import { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { loginUser } from "../services/service";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      setSuccessMessage("Login effettuato con successo!");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/tournaments");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || "Login fallito. Riprova.");
      setSuccessMessage("");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Container className="login-page-container my-5 d-flex flex-column justify-content-center align-items-center w-50 border rounded">
      <h2 className="mb-5">Login</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            name="email"
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Accedi
        </Button>
      </Form>
      <div className="mt-3">
        <p>Non hai un account?</p>
        <Button variant="link" onClick={handleRegisterClick}>
          Registrati ora
        </Button>
      </div>
    </Container>
  );
};

export default Login;
