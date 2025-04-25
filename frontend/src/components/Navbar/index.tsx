import { ImageLink, NavContainer, Logo, NavLinks, NavLink } from "./style";
import Nit from "../../assets/nit.png";

const Navbar = () => {
  return (
    <NavContainer>
      <ImageLink to="/">
        <Logo src={Nit} alt="Logo" />
      </ImageLink>
      <NavLinks>
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/opportunities">Funding Opportunities</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
