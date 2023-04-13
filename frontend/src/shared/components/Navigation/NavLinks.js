import React from "react"
import { NavLink } from "react-router-dom"

import "./NavLinks.css"

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/u1/places">My Places</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">New Place</NavLink>
            </li>
            <li>
                <NavLink to="/authenticate">Authenticate</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks;