import React, { useState } from 'react';
import axios from 'axios';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // Enregistrer l'ID de l'utilisateur dans localStorage
        localStorage.setItem('user_id', response.data.user_id);
        console.log("✅ User ID enregistré:", response.data.user_id);

        // Rediriger vers la page du quiz
        window.location.href = '/';
      }
    } catch (error: any) {
      console.error("❌ Erreur lors de la connexion :", error);
      setMessage(error.response?.data?.message || "Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signin;
