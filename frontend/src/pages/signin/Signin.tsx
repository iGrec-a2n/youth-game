import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { InputPassword, InputText } from '../../components/input/Input';
import "./Signin.scss"
import { ButtonDecline } from '../../components/button/ButtonDecline';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../utils/context/UserContext';
import Card from '../../components/Card/Card';
const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { user, setUser } = useUser(); 

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://8cb7-2a04-cec0-193b-e9df-e987-719b-684e-2a4a.ngrok-free.app/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const userData = response.data.data;
        console.log("✅ Utilisateur connecté :", userData);
        setUser(userData); // Met à jour le contexte utilisateur
        // Enregistrer l'ID de l'utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Rediriger vers la page du quiz
        navigate('/join');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("❌ Erreur lors de la connexion :", axiosError);
      setMessage((axiosError.response?.data as { message: string })?.message || "Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className='signin-container'>
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <label htmlFor="email">Email: </label>
        <InputText
          type="email"
          name='email'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Mot de passe: </label>
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
        {/* <button className='button' type="submit">Se connecter</button> */}
          <ButtonDecline type='primary' label='Se Connecter' />
      </form>
      {message && <p>{message}</p>}
      
    </div>
  );
};

export default Signin;
