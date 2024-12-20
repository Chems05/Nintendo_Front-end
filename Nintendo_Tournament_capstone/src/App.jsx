import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Navbar from "./component/NavBar";
import TournamentPage from "./component/TournamentPage";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import ProfilePage from "./component/ProfilePage";
import TournamentList from "./component/TournamentList";
import Tournament from "./component/Tournament";
import ChatPage from "./component/ChatPage";
import Regolamento from "./component/Regolamento";
import Contattaci from "./component/Contattaci";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tournamentlist" element={<TournamentList />} />
        <Route path="/tournament/:torneoId" element={<Tournament />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/regolamento" element={<Regolamento />} />
        <Route path="/contattaci" element={<Contattaci />} />
      </Routes>
    </Router>
  );
}

export default App;
