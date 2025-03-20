import React from'react'
import { NavLink } from 'react-router-dom'
import "./Footer.scss"
import home from "../../assets/icons/home.svg"
import menu from "../../assets/icons/menu.svg"
import rank from "../../assets/icons/rank.svg"
import user from "../../assets/icons/user.svg"

export const Footer: React.FC=()=>{

  //TODO: add a link to the another page
  return(
    <div className="footer">
      <div className="footer-content">
        <ul className="footer-links">
          <li className="footer-link"><NavLink to="/Quiz"><img className="footer-link-icon" src={home} alt="home" /></NavLink></li>
          <li className="footer-link"><NavLink to="/"><img className="footer-link-icon" src={menu} alt="menu" /></NavLink></li>
          <li className="footer-link"><NavLink to="/"><img className="footer-link-icon" src={rank} alt="rank" /></NavLink></li>
          <li className="footer-link"><NavLink to="/"><img className="footer-link-icon" src={user} alt="user" /></NavLink></li>
        </ul>
      </div>
        
      </div>
  )
}