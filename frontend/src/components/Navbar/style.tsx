import styled from "styled-components";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  padding: 0 4rem;
  height: 4.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.img`
  width: 8rem;
  height: auto;
  cursor: pointer;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem; /* Increased spacing */
  font-size: 1rem;

  @media (max-width: 768px) {
    display: none; // Simple hiding on mobile for now, can be replaced with a hamburger menu later
  }
`;

export const ImageLink = styled(Link)`
  text-decoration: none;
`;

export const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-green);
  }

  &.active {
    color: var(--primary-green);
    font-weight: 700;
  }
`;

export const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--card-background);
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem 0;
  z-index: 1000;
  min-width: 160px;

  a {
    text-decoration: none;
    color: var(--text-color);
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
