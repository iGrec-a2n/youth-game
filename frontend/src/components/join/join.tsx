import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import socket from "../../utils/socket";
import { useUser } from "../../utils/context/UserContext"; // Importer le contexte utilisateur
import Card from "../Card/Card";
import "./join.scss"

const JoinRoom: React.FC = () => {
  const roomCode = "VGQZCN";
  const navigate = useNavigate(); 
  const [players, setPlayers] = useState<string[]>([]);
  const { user } = useUser(); // Récupérer user depuis le contexte utilisateur
  console.log(localStorage.getItem("user"));
  const joinRoom = () => {
    if (user) {
      socket.emit("join_room", { room_code: roomCode, username: user?.username, user_id: user?.user_id });
      localStorage.setItem('username', user?.username);
      socket.on("player_joined", () => {
        navigate(`/Quiz`); 
      });
    } else {
      console.error("Aucun utilisateur connecté.");
      return;
    }
    socket.on("error", (data: { message: string }) => {
      alert(data.message);
    });
  };

  useEffect(() => {
    socket.on("new_player", (data) => {
      console.log("Nouveau joueur reçu :", data.username);
      setPlayers((prev) => {
        const updatedPlayers = [...prev, data.username];
        console.log("Liste mise à jour des joueurs : ", updatedPlayers);
        return updatedPlayers;                      
      });
    });
  
    return () => {
      socket.off("new_player");
    };
  }, [players]);
  return (
    <div className="select-room-container">
      <Card image="https://images.pexels.com/photos/30736845/pexels-photo-30736845/free-photo-of-homme-pensif-appuye-sur-un-escalier-a-l-interieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load" 
      name={user?.username} 
      location={user?.country} 
      score={12000} 
      rank={1} />
      <h2 className="select-room-title">Rejoindre une salle</h2>
      <button className="select-room-button" onClick={joinRoom}>Rejoindre</button>
    </div>
  );
};

export default JoinRoom;