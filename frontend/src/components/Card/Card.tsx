import React from "react"
import styles from "./Card.module.scss"


interface CardProps {
    image: string;
    name: string;
    location: string;
    score: number;
    rank: number;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ image, name, location, score, rank }) => {
    return (
        <div className={styles.Card}>
            <div className={styles.CardId}>
                <div className={styles.CardImage}>
                    <img src={image} alt="photo profil" className={styles.PhotoProfil} />
                </div>
                <div className={styles.CardInfo}>
                    <span className={styles.CardNames}>{name}</span>
                    <span className={styles.CardLocation}>{location}</span>
                </div>
            </div>
            <div className={styles.CardStats}>
                <div className={styles.score}>
                    <span className={styles.p}>{rank}</span>
                </div>
                <div className={styles.rank}>
                    <span className={styles.p}>{score}th</span>
                </div>
            </div>
        </div>
    )
}

export default Card;