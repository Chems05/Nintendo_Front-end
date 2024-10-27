import { useState, useEffect } from "react";
import {
  updateUserProfile,
  getUserInfo,
  uploadAvatar,
} from "../services/service";
import { Button, Form, Alert, Spinner, Image } from "react-bootstrap";
import "../style/ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserData(data);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle informazioni dell'utente:",
          error
        );
        setError("Impossibile recuperare le informazioni dell'utente.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(userData);
      setUserData(updatedUser);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Errore durante l'aggiornamento del profilo:", error);
      setError("Errore durante l'aggiornamento del profilo.");
      setSuccess(false);
    }
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    setAvatarFile(selectedFile);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const updatedUser = await uploadAvatar(userData.id, formData);
      setUserData(updatedUser);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Errore durante il caricamento dell'avatar:", error);
      setError("Errore durante il caricamento dell'avatar.");
      setSuccess(false);
    } finally {
      setUploadingAvatar(false);
      setAvatarFile(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <h2 className="text-center">Modifica Profilo</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Profilo aggiornato con successo!</Alert>
      )}

      {userData.avatar && (
        <div className="avatar-container text-center">
          <Image src={userData.avatar} roundedCircle className="avatar-image" />
          <h5>Avatar Corrente</h5>
        </div>
      )}

      <Form.Group controlId="formAvatar" className="mt-3">
        <Form.Label>Carica un nuovo avatar</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <Button
          variant="primary"
          onClick={handleAvatarUpload}
          disabled={!avatarFile || uploadingAvatar}
          className="mt-2"
        >
          {uploadingAvatar ? "Caricamento..." : "Carica Avatar"}
        </Button>
      </Form.Group>

      <Form onSubmit={handleSubmit} className="profile-form mt-3">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userData.username || ""}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
            className="input-custom"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={userData.email || ""}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
            className="input-custom"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Nuova Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci nuova password (lascia vuoto per mantenere attuale)"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="input-custom"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 btn-custom">
          Aggiorna Profilo
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
