import React from "react";
import { StyledNavLink, Nav } from "./styledComponents";
import LogOut from "../logout/logout";
import "./styleNavBar.scss"

const NavbarComponent = () => {

    return (
        <Nav>
            <StyledNavLink to='/posts'>Posts</StyledNavLink>
            <StyledNavLink to='/profile'>Profile</StyledNavLink>
            <LogOut />

        </Nav>
    );
}

export default NavbarComponent;