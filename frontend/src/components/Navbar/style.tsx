import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavContainer = styled.nav`
  padding: 1rem;
  background-color: #f0f0f0;
  display: flex;
  gap: 1rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`;

