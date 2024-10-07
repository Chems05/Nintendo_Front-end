import "bootstrap/dist/css/bootstrap.css";
import "../style/HomePage.css";
import Carousel from "react-bootstrap/Carousel";
import VideoHome from "../assets/1002.mp4";
import firstImage from "../assets/ads.jpg";
import secondImage from "../assets/CoronaAstrale.jpg";
import thirdImage from "../assets/cup.png";
import icona from "../assets/iconsBlue.png";
import nintendo from "../assets/nintendoSwitch.png";
import games from "../assets/GAMES.jpg";

const HomePage = () => {
  const tournaments = [
    {
      image: firstImage,
    },
    {
      image: secondImage,
    },
    {
      image: thirdImage,
    },
  ];

  return (
    <div>
      <section className="hero text-center">
        <video
          className="video-background"
          src={VideoHome}
          autoPlay
          loop
          muted
        ></video>
        <div className="container">
          <h2 className="display-3 text-white fw-bold">
            SARAI TU IL PROSSIMO CAMPIONE?
            <p className="lead text-white fw-bold">
              Crea, sfida e vinci! nei migliori tornei ispirati ai giochi
              Nintendo. Che la battaglia abbia inizio!
            </p>
            <div className="mt-2">
              <img src={icona} alt="" />
            </div>
          </h2>
        </div>
      </section>
      <section className="tournament-carousel-grid py-4">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Ultime Notizie</h2>
          <Carousel>
            {tournaments.map((tournament, index) => (
              <Carousel.Item key={index} interval={1000}>
                <img
                  className="d-block w-100 border-img"
                  src={tournament.image}
                  alt={`Torneo ${index + 1}`}
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>
      <section className="large-tournament-card py-4">
        <div className="container justify-content-center">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="text-primary fw-bold">
                Piattaforma esclusiva nintendo!
              </h3>
              <p>
                Una piattaforma totalmente dedicata agli utenti di nintendo
                switch o altre console nintendo dove è possibile sfidarsi con la
                stessa piattaforma equamente in vari tornei creati dalla
                community e perche no.
              </p>
              <a href="#" className="btn btn-primary btn-lg">
                Scopri di più
              </a>
            </div>
            <div className="col-md-6">
              <img
                src={nintendo}
                alt="Torneo Speciale"
                className="switch img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="large-tournament-card py-4">
        <div className="container justify-content-center">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src={games}
                alt="Torneo Speciale"
                className="games img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-md-6">
              <h3 className="text-primary fw-bold">una marea di giochi!</h3>
              <p>
                sfida i tuoi amici o altri utenti in centinaia di giochi in
                competizioni pvp,speedrun,achivment e moltissime altre modalità
                personalizzate per rendere la sfida sempre piua vvincente{" "}
              </p>
              <a href="#" className="btn btn-primary btn-lg">
                Scopri di più
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center py-4 bg-dark text-white">
        <p>© 2024 Nintendo Tournaments - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
};

export default HomePage;
