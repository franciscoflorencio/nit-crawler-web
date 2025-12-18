import React from "react";
import { ImageLink, NavContainer, Logo, NavLinks, NavLink } from "./style";
import Nit from "../../assets/nit.png";

const Navbar = () => {
  return (
    <NavContainer>
      <ImageLink style={{ marginLeft: "4rem" }} to="/">
        <Logo src={Nit} alt="Logo" />
      </ImageLink>
      <NavLinks style={{ marginRight: "4rem" }}>
        <NavLink to="/articles">Artigos</NavLink>
        <NavLink to="/opportunities">Bolsas</NavLink>
        <NavLink to="/crawlai">Crawl AI</NavLink>
        <NavLink to="/about">Sobre nós</NavLink>
        <NavLink to="/contact">Contato</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
