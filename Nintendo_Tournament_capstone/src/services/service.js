const baseUrl = import.meta.env.VITE_API_BASE_URL;

const registerUser = async (formRegister) => {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(formRegister),
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
    console.log("Informazioni utente:", userData);

    if (userData.id && userData.username && userData.email && userData.ruolo) {
      const user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.ruolo,
      };

      localStorage.setItem("user", JSON.stringify(user));
      console.log(
        "Dati utente salvati nel localStorage sotto la chiave 'user'."
      );
    } else {
      throw new Error("Dati utente incompleti nella risposta.");
    }

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

export {
  createTournament,
  loginUser,
  registerUser,
  getUserInfo,
  updateUserProfile,
  fetchTournaments,
  updateTournament,
  deleteTournament,
};
