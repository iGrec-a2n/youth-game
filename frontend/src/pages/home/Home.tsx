import { useNavigate } from "react-router";
import "./Home.scss"
import { Background } from "../../components/background/Background";
import { ButtonDecline } from "../../components/button/ButtonDecline";

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    }

    return (
        <section>
            <Background />
            <div className="background">
                <h1>
                    <span className="title title-description">
                        Be part of
                    </span>
                    <span className="title title-medium ">
                        tomorrow's
                    </span>
                    <span className="title title-large">
                        EUROPE
                    </span>
                </h1>
                <div className="button-section">
                    <ButtonDecline label="resume the game" onClick={handleNavigate} type="primary" />
                    <ButtonDecline label="Discover" onClick={handleNavigate} type="secondary" />
                </div>
            </div>
        </section>
    )

}

export default Home;