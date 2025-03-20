import { NavLink } from "react-router-dom";
import "./Home.scss"
import { Background } from "../../components/background/Background";
import { ButtonDecline } from "../../components/button/ButtonDecline";

export const Home: React.FC = () => {


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
                    <NavLink to="/Signin">
                        <ButtonDecline label="resume the game"  type="primary" />
                    </NavLink>
                    
                    <NavLink to="/Signup">
                        <ButtonDecline label="Discover" type="secondary" />
                    </NavLink>
                </div>
            </div>
        </section>
    )

}

export default Home;