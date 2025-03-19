import { useEffect, useState } from "react";
import socket from "../../utils/socket";

// Définition du type pour les joueurs
type PlayerType = {
  username: string;
  user_id: string;
  joined_at: number;
};

const Admin = () => {
  const  roomCode  = "VGQZCN";
  const [playersCount, setPlayersCount] = useState(0);  // Nombre de joueurs
  const [playersList, setPlayersList] = useState<PlayerType[]>([]);  // Liste des joueurs
  const [quizStarted, setQuizStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // 🔥 État pour la fin du quiz

  useEffect(() => {
    // Réception de l'événement 'broadcast_message' 
    interface BroadcastMessageData {
      message: string;
      players_count: number;
      players: PlayerType[];
    }

    socket.on("broadcast_message", (data: BroadcastMessageData) => {
      console.log("Message diffusé à tous les clients:", data.message);
      console.log("Nombre de joueurs:", data.players_count);
      console.log("Liste des joueurs:", data.players);

      setPlayersCount(data.players_count);
      setPlayersList(data.players);  
    });

    return () => {
      socket.off("broadcast_message");  
    };
  }, []);

  const startQuiz = () => {
    socket.emit("start_quiz", { room_code: roomCode });
    setQuizStarted(true);
  };
  const endQuiz = () => {
    socket.emit("end_room", { room_code: roomCode });
    setIsFinished(true);
  };

  return (
    <div>
      <h2>Admin - Room {roomCode}</h2>
      <div>
        <h2>Nombre de joueurs : {playersCount}</h2>
        <ul>
          {playersList.map((player, index) => (
            <li key={index}>{player.username} (ID: {player.user_id})</li>
          ))}
        </ul>
      </div>
      {!quizStarted ? (
        <button onClick={startQuiz}>Démarrer le quiz</button>
      ) : (
        <>
        <h3>Quiz en cours...</h3>
        <button onClick={endQuiz}>End quizz</button>
        </>
      )}
    </div>
  );
};

export default Admin;