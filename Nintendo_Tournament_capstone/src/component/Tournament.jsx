import { useParams } from "react-router-dom";

const Tournament = () => {
  const { id } = useParams();
  // Logica per caricare e visualizzare i dettagli del torneo
  return (
    <div>
      <h1>Dettagli del Torneo: {id}</h1>
      {/* Altri dettagli e logica */}
    </div>
  );
};

export default Tournament;
