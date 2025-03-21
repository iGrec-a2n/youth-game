import { useEffect, useState } from "react";
import socket from "../../utils/socket";  
import { useUser } from "../../utils/context/UserContext";
import './Quiz.scss'
// import AnswerTimer from "../../components/AnswerTimer/AnswerTimer";


interface Question {
  _id: string;
  question: string;
  options: string[];
  points: number;
}

interface PlayerScore {
  username: string;
  score: number;
}

const Quiz:React.FC = () => {
  const  roomCode  = "VGQZCN";
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [player, setPlayer] = useState<string>('');
  const [isFinished, setIsFinished] = useState(false); 
  const [finalScores, setFinalScores] = useState<PlayerScore[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null); 
  const { user } = useUser();
  useEffect(() => {
    socket.on("quiz_started", (data: { questions: Question[] }) => {
      if (data.questions && data.questions.length > 0) {
        console.log("Questions reçues du serveur :", data.questions); // Vérifier les données reçues
        setQuestions(data.questions);
        setIsStarted(true);
      } else {
        console.log("Aucune question reçue.");
      }
    });
    socket.on("countdown", (data) => {
      setCountdown(data.count);
    });
    socket.on("score_updated", (data) => {
      if (data.user_id === user?.user_id) {
        console.log(data.new_score);
        
        setScore(data.new_score);
      }
    });
  
    socket.on("player_joined", (data) => {
      alert(`Bienvenue ${data.username}, vous avez rejoint la salle !`);
      setPlayer(data.username);
    });
  
    socket.on("end_room", (data: { player_scores: PlayerScore[] }) => {
      setFinalScores(data.player_scores);
      setIsFinished(true);
    });
  
    socket.on("error", (data: { message: string }) => {
      console.log(data.message);
    });
  
    return () => {
      socket.off("quiz_started");
      socket.off("player_joined");
      socket.off("error");
      socket.off("score_updated");
      socket.off("end_room");
      socket.off("countdown");
    };
  }, []);
  
  useEffect(() => {
    // Écouter l'événement de fin de la room
    socket.on("end_room", (data) => {
      console.log("🏁 Fin du jeu !", data);
      alert("Le jeu est terminé ! Voici les scores : " + JSON.stringify(data.player_scores));
    });
  
    return () => {
      socket.off("end_room");
    };
  }, []);

  const Send_answer = (answer: string) => {
    console.log(answer);
    socket.emit('receive_answer', {
      user_id: user?.user_id,
      room_code: roomCode,
      question: questions[currentQuestion]._id,
      answer: answer,
      // point:  
    });

    // ✅ Passer immédiatement à la question suivante
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true); // ✅ Fin du quiz
      socket.emit("player_finished", { room_code: roomCode, user_id: user?.user_id });
    }
  };

  return (
    <div className="quiz-container">
      <h1>Joueur: {player}</h1>
      <h1>Score: {score}</h1>
      
      {isFinished && countdown !== null && countdown > 0 ? (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem'}}>
          <h2>🎉 Quiz terminé ! 🎉</h2>
          <h3>🏆 Classement des joueurs :</h3>
          <ul style={{listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {finalScores.map((p, index) => (
              <li style={{fontSize: '1.5rem', fontWeight: 'bold'}} key={index}>
                {p.username} - {p.score} points
              </li>
            ))}
          </ul>
        </div>
      ) : isStarted ? (
        <div className="quiz-container">
          <h3>{questions[currentQuestion]?.question}</h3>
          {questions[currentQuestion]?.options.map((option: string, index: number) => (
            <div className="answer-button-container" key={index}>
              {/* <AnswerTimer duration={15} onTimeUp={() => Send_answer(option)} /> */}
              <button type="button" className="answer-button" onClick={() => Send_answer(option)}>
                {option}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2>Le jeu commence dans {countdown}...</h2>

      )}
    </div>
  );
};

export default Quiz;