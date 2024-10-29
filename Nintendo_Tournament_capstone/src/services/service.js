const baseUrl = import.meta.env.VITE_API_BASE_URL;
import _default from "../assets/default.jpg";

const registerUser = async (formRegister) => {
  try {
    const userData = {
      ...formRegister,
      avatar: { _default },
    };

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore sconosciuto durante la registrazione."
      );
    }

    const data = await response.json();
    console.log("Registrazione effettuata con successo:", data);
    localStorage.setItem("employeeId", data.employeeId);
    return data;
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    throw error;
  }
};

const loginUser = async (formLogin) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Risposta di errore:", errorText);
      throw new Error("Errore durante il login: " + errorText);
    }

    const data = await response.json();
    console.log("Login effettuato con successo:", data);

    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("employeeId", data.employeeId);
      return await getUserInfo();
    } else {
      throw new Error("Token non trovato nella risposta.");
    }
  } catch (error) {
    console.error("Errore durante il login:", error);
    throw error;
  }
};

const getUserInfo = async () => {
  try {
    const employeeId = localStorage.getItem("employeeId");
    const token = localStorage.getItem("token");

    if (!employeeId || !token) {
      throw new Error("Missing employeeId or token in localStorage.");
    }

    const response = await fetch(`${baseUrl}/utenti/${employeeId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          "Errore durante il recupero delle informazioni utente."
      );
    }

    const userData = await response.json();
    console.log("Informazioni utente:", userData); // Log della risposta

    // Controllo se i dati richiesti esistono
    if (
      !userData.id ||
      !userData.username ||
      !userData.email ||
      !userData.ruolo ||
      !userData.avatar
    ) {
      console.error("Dati mancanti:", userData); // Log dei dati incompleti
      throw new Error("Dati utente incompleti nella risposta.");
    }

    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: userData.ruolo,
      avatar: userData.avatar,
    };

    localStorage.setItem("user", JSON.stringify(user));
    console.log("Dati utente salvati nel localStorage sotto la chiave 'user'.");

    return userData;
  } catch (error) {
    console.error(
      "Errore durante il recupero delle informazioni dell'utente:",
      error
    );
    throw error;
  }
};

const updateUserProfile = async (updatedData) => {
  const employeeId = localStorage.getItem("employeeId");
  const token = localStorage.getItem("token");

  if (!token || !employeeId) {
    throw new Error(
      "Token o employeeId mancante. Impossibile aggiornare il profilo."
    );
  }

  const response = await fetch(`${baseUrl}/utenti/${employeeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'aggiornamento del profilo."
    );
  }

  return await response.json();
};

const fetchTournaments = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/tornei`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("Dati ricevuti:", data);

    return data;
  } catch (error) {
    console.error("Errore nel recupero dei tornei:", error);
    throw error;
  }
};

const createTournament = async (tournamentData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }

  const response = await fetch(`${baseUrl}/tornei`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tournamentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante la creazione del torneo."
    );
  }

  return await response.json();
};

const updateTournament = async (tournamentId, updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }

  const response = await fetch(`${baseUrl}/tornei/${tournamentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'aggiornamento del torneo."
    );
  }

  return await response.json();
};

const deleteTournament = async (tournamentId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }

  const response = await fetch(`${baseUrl}/tornei/${tournamentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'eliminazione del torneo."
    );
  }

  return await response.json();
};

const uploadAvatar = async (userId, formData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}/utenti/${userId}/avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il caricamento dell'avatar."
      );
    }

    const updatedUser = await response.json();

    localStorage.setItem("avatar", updatedUser.avatar);
    console.log("Avatar salvato nel localStorage:", updatedUser.avatar);

    return updatedUser;
  } catch (error) {
    console.error("Errore nel caricamento dell'avatar:", error);
    throw error;
  }
};

const fetchGames = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${baseUrl}/giochi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero dei giochi."
      );
    }

    const games = await response.json();
    console.log("Giochi ricevuti:", games);
    return games;
  } catch (error) {
    console.error("Errore nel recupero dei giochi:", error);
    throw error;
  }
};

const sendMessage = async (messageData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${baseUrl}/messaggi/invia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'invio del messaggio."
    );
  }

  return await response.json();
};

const getMessages = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${baseUrl}/messaggi`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante il recupero dei messaggi."
    );
  }

  return await response.json();
};

// Creare una nuova squadra
const creaSquadra = async (datiSquadra) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }

  const response = await fetch(`${baseUrl}/squadre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datiSquadra),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante la creazione della squadra."
    );
  }

  return await response.json();
};

// Ottenere una squadra per ID
const ottieniSquadraPerId = async (idSquadra) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }
  const response = await fetch(`${baseUrl}/squadre/${idSquadra}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Aggiungi il Bearer token qui
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante il recupero della squadra."
    );
  }

  return await response.json();
};

// Ottenere tutte le squadre
const ottieniTutteLeSquadre = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }
  const response = await fetch(`${baseUrl}/squadre`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Aggiungi il Bearer token qui
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante il recupero delle squadre."
    );
  }

  return await response.json();
};

// Aggiornare una squadra
const aggiornaSquadra = async (idSquadra, datiAggiornati) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }

  const response = await fetch(`${baseUrl}/squadre/${idSquadra}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datiAggiornati),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'aggiornamento della squadra."
    );
  }

  return await response.json();
};

// Eliminare una squadra
const eliminaSquadra = async (idSquadra) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token mancante. Effettua il login.");
  }

  const response = await fetch(`${baseUrl}/squadre/${idSquadra}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Errore durante l'eliminazione della squadra."
    );
  }

  return response.status === 204; // Restituisce true se la risposta è 204 No Content
};

export {
  fetchGames,
  createTournament,
  loginUser,
  registerUser,
  getUserInfo,
  updateUserProfile,
  fetchTournaments,
  updateTournament,
  deleteTournament,
  uploadAvatar,
  sendMessage,
  getMessages,
  creaSquadra,
  ottieniSquadraPerId,
  ottieniTutteLeSquadre,
  aggiornaSquadra,
  eliminaSquadra,
};
