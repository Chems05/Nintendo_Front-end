import "bootstrap/dist/css/bootstrap.css";
import "../style/HomePage.css";
import VideoHome from "../assets/1002.mp4";

const HomePage = () => {
  const tournaments = [
    {
      image: "https://via.placeholder.com/400x400", // Immagini quadrate
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image: "https://via.placeholder.com/400x400",
    },
    {
      image:
        "https://64.media.tumblr.com/a008bc800d6dc2632ed6ade78fccd80a/tumblr_o14bsx7Obs1sf1pyoo9_400.jpg",
    },
  ];

  return (
    <div>
      {/* Sezione Hero */}
      <section className="hero text-center">
        <video
          className="video-background"
          src={VideoHome}
          autoPlay
          loop
          muted
        ></video>
        <div className="container">
          <h2 className="display-4 text-white fw-bold">
            SARAI TU IL PROSSIMO CAMPIONE?
            <p className="lead text-white fw-bold">
              Crea, sfida e vinci! nei migliori tornei ispirati ai giochi
              Nintendo. Che la battaglia abbia inizio!
            </p>
            <div className="mt-4">
              <a href="#" className="btn btn-primary btn-lg me-3 hero-btn">
                Crea un Torneo
              </a>
            </div>
          </h2>
        </div>
      </section>

      {/* Sezione Griglia 3x3 delle card */}
      <section className="tournament-grid py-5">
        <div className="container">
          <h3 className="text-center text-primary fw-bold mb-5">
            Tornei Recenti
          </h3>
          <div className="row">
            {tournaments.map((tournament, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card tournament-card shadow-lg square-card">
                  <img
                    src={tournament.image}
                    className="card-img-top"
                    alt={`Torneo ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark text-white">
        <p>© 2024 Nintendo Tournaments - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
};

export default HomePage;
