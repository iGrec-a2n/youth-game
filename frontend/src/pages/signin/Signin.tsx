import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { InputPassword, InputText } from '../../components/input/Input';

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
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("❌ Erreur lors de la connexion :", axiosError);
      setMessage((axiosError.response?.data as { message: string })?.message || "Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <InputText
          type="email"
          name='email'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputPassword
          placeholder="Mot de passe"
          value={password}
          name='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target) {
              setPassword(e.target.value);
            }
          }}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signin;
