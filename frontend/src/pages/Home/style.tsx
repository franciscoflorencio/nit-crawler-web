import styled from "styled-components";

// Cores oficiais
export const PRIMARY_COLOR = "#f7981a"; // Laranja
export const SECONDARY_COLOR = "#02714f"; // Verde
export const BACKGROUND_COLOR = "#ffffff"; // Branco

// Container principal
export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${BACKGROUND_COLOR};
  color: #333;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

// Header
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: ${PRIMARY_COLOR};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

// Seção principal
export const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: ${SECONDARY_COLOR};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
`;

// Botão estilizado
export const Button = styled.button`
  background-color: ${PRIMARY_COLOR};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e68a0f; // Escurece o laranja ao passar o mouse
  }
`;

// Card para informações
export const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: ${SECONDARY_COLOR};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
`;

// Footer
export const Footer = styled.footer`
  display: flex;
  bottom: 0;
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${SECONDARY_COLOR};
  color: white;
  width: 100%;

  p {
    font-size: 0.9rem;
  }
`;
