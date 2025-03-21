import { io } from "socket.io-client";

const socket = io("https://16d9-2a04-cec0-1931-b82e-818a-a755-3d6a-a343.ngrok-free.app/", {
  transports: ["websocket", "polling"],  // Mode de transport
  reconnectionAttempts: 5,               // Limite les tentatives de reconnexion
  reconnectionDelay: 1000,               // Délai entre les tentatives de reconnexion
  timeout: 20000,                       
});

export default socket;