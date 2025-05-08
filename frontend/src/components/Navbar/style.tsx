import styled from "styled-components";
import { Link } from "react-router-dom";

// Cores oficiais
export const PRIMARY_COLOR = "#f7981a"; // Laranja
export const SECONDARY_COLOR = "#02714f"; // Verde

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  right: 0;
  background-color: ${SECONDARY_COLOR}; /* Navbar background color */

  justify-content: space-between; /* Garante que o logo e os links fiquem alinhados */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: sticky;
  z-index: 1000; /* Garante que a navbar esteja sempre acima do conteúdo */
  height: 4rem;
`;

export const Logo = styled.img`
  width: 8rem;
  height: auto;
  cursor: pointer;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem; /* Espaçamento entre os links */
  font-size: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 100%; /* Posiciona abaixo da navbar */
    right: 0;
    background-color: ${SECONDARY_COLOR}; /* Same as navbar background */

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    border-radius: 4px;
  }
`;

export const ImageLink = styled(Link)`
  text-decoration: none;
`;

// Individual Link
export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: ${PRIMARY_COLOR}; /* Change hover to orange */
  }

  &:last-child {
    margin-right: 0; /* Remove margin from the last link */
  }
`;

export const Dropdown = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`;

export const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${SECONDARY_COLOR}; /* Same as navbar background */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 0.5rem 0;
  z-index: 1000;

  a {
    text-decoration: none;
    color: #fff; /* Default text color for dropdown links */
    padding: 0.5rem 1rem;
    font-size: 1rem;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;

    &:hover {
      background-color: ${PRIMARY_COLOR}; /* Orange background on hover */
      color: #fff; /* White text on hover */
    }
  }

  p {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff; /* Default text color for empty dropdown message */
  }
`;
