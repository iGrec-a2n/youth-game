
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useUser} from "../../utils/context/UserContext";

interface UserRanking {
  country: string,
  pseudo: string,
  score: number,
  user_id: string
}

const Ranking: React.FC = () => {
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const [title, setTitle] = useState<string>("Ranking");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [viewNational, setViewNational] = useState<boolean>(true);
  const {user} = useUser()

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        setError("");
        const storedUserCountry = user?.country;
        const url = viewNational && storedUserCountry 
          ? `http://localhost:5000/ranking?country=${storedUserCountry}`
          : "http://localhost:5000/ranking";
        
        const response = await axios.get(url);
        
        setRanking(response.data.ranking);
        setTitle(response.data.title);
      } catch (err) {
        setError("Erreur lors du chargement du classement.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRanking();
  }, [viewNational, user]);

  return (
    <>
      <div>
        <h2>{title}</h2>
        <div>
          <button onClick={() => setViewNational(true)}>National</button>
          <button onClick={() => setViewNational(false)}>International</button>
        </div>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {ranking.map((user) => (
            <li key={user.user_id}>
              {user.pseudo} - {user.score} points ({user.country})
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Ranking