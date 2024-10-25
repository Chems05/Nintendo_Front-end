CAPSTONE NINTENDO TOURNAMENT SYSTEM

back-end: https://github.com/Chems05/Nintendo_Back-end

1- copiare il nome della cartella e nel terminale fare npm cd "nome della cartella"

2- fare npm run dev

3- copiare il localhost in alto nel url e nel back end andare nella cartella security poi security config ed esattamente in questa riga di codice

        corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));

sostituire il local host corrente con quello che avete copiato

4- salvare e avviare il backend
