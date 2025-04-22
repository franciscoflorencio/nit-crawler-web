import { NavContainer, NavLink } from './style';

const Navbar = () => {
    return (
      <NavContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/opportunities">Funding Opportunities</NavLink>
      </NavContainer>
    )
}

export default Navbar;
