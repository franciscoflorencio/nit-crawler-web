import styled from "styled-components";
import { Link } from "react-router-dom";

// Cores oficiais
export const PRIMARY_COLOR = "#f7981a"; // Laranja
export const SECONDARY_COLOR = "#02714f"; // Verde
export const BACKGROUND_COLOR = "#ffffff"; // Branco

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem 4rem;
  gap: 2.5rem;

  position: relative;
  width: 100%;
  height: 2rem;
  left: 0px;
  top: 0px;
  right: 0px;
  background: ${BACKGROUND_COLOR};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Logo = styled.img`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 5.57px;
  width: 9rem;
  height: 6rem;
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem; // Increased gap between links
  padding: 0px;
  width: auto;
  margin-left: auto;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
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
  margin-right: 1.5rem; // Add spacing between links

  &:hover {
    color: ${SECONDARY_COLOR};
  }

  &:last-child {
    margin-right: 0; // Remove margin from the last link
  }
`;
