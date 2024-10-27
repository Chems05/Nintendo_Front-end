import "../style/Tournament.css"; // Assicurati che questo sia il percorso corretto

const Tournament = () => {
  return (
    <div className="container my-5">
      <div className="bracket">
        {/* Round 1 */}
        <section aria-labelledby="round-1">
          <h2 id="round-1" className="text-center">
            Round 1
          </h2>
          <ol>
            {[
              { players: ["Player 1", "Player 2"], date: "01.01. 1pm" },
              { players: ["Player 3", "Player 4"], date: "01.01. 1.30pm" },
              { players: ["Player 5", "Player 6"], date: "01.01. 2pm" },
              { players: ["Player 7", "Player 8"], date: "01.01. 2.30pm" },
              { players: ["Player 9", "Player 10"], date: "01.01. 3pm" },
              { players: ["Player 11", "Player 12"], date: "01.01. 3.30pm" },
              { players: ["Player 13", "Player 14"], date: "01.01. 4pm" },
              { players: ["Player 15", "Player 16"], date: "01.01. 4.30pm" },
            ].map((match, index) => (
              <li key={index}>
                <div>
                  <a href="#">{match.players[0]}</a>
                  <span>{match.date}</span>
                  <a href="#">{match.players[1]}</a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Round 2 */}
        <section aria-labelledby="round-2">
          <h2 id="round-2" className="text-center">
            Round 2
          </h2>
          <ol>
            {[
              { players: ["Player 1", "Player 3"], date: "05.01. 1pm" },
              { players: ["Player 5", "Player 7"], date: "05.01. 1.30pm" },
              { players: ["Player 9", "Player 11"], date: "05.01. 2pm" },
              { players: ["Player 13", "Player 15"], date: "05.01. 2.30pm" },
            ].map((match, index) => (
              <li key={index}>
                <div>
                  <a href="#">{match.players[0]}</a>
                  <span>{match.date}</span>
                  <a href="#">{match.players[1]}</a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Round 3 */}
        <section aria-labelledby="round-3">
          <h2 id="round-3" className="text-center">
            Round 3
          </h2>
          <ol>
            <li>
              <div>
                <a href="#">Player 1</a>
                <span>07.01. 1pm</span>
                <a href="#">Player 5</a>
              </div>
            </li>
            <li>
              <div>
                <a href="#">Player 9</a>
                <span>07.01. 1.30pm</span>
                <a href="#">Player 13</a>
              </div>
            </li>
          </ol>
        </section>

        {/* Final Round */}
        <section aria-labelledby="round-4">
          <h2 id="round-4" className="text-center">
            Round 4
          </h2>
          <ol>
            <li>
              <div>
                <a href="#">Player 1</a>
                <span>10.01. 1pm</span>
                <a href="#">Player 9</a>
              </div>
            </li>
          </ol>
        </section>

        {/* Winner */}
        <section aria-labelledby="winner">
          <h2 id="winner" className="text-center">
            Winner
          </h2>
          <ol>
            <li>
              <div className="text-center bg-success text-white">
                <a href="#" className="text-white">
                  Player 1
                </a>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Tournament;
