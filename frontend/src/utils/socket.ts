import { io } from "socket.io-client";

const socket = io("https://8cb7-2a04-cec0-193b-e9df-e987-719b-684e-2a4a.ngrok-free.app", {
  transports: ["websocket", "polling"],  // Mode de transport
  reconnectionAttempts: 5,               // Limite les tentatives de reconnexion
  reconnectionDelay: 1000,               // Délai entre les tentatives de reconnexion
  timeout: 20000,                       
});

export default socket;