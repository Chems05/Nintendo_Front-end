import "bootstrap/dist/css/bootstrap.css";
import "../style/TournamentPage.css";

const TournamentPage = () => {
  return (
    <div className="tournament-page">
      <section className="tournament-hero text-center py-5">
        <div className="container">
          <h1 className="display-4 text-light fw-bold">
            Scopri i Tornei più Entusiasmanti!
          </h1>
          <p className="lead text-light">
            Partecipa ai tornei ufficiali e sfida i migliori giocatori! Unisciti
            alla battaglia e dimostra il tuo valore.
          </p>
          <a href="#" className="btn btn-warning btn-lg mt-3">
            Iscriviti Ora!
          </a>
        </div>
      </section>
    </div>
  );
};

export default TournamentPage;
