import styled from "styled-components";

// Cores oficiais
export const PRIMARY_COLOR = "#f7981a"; // Laranja
export const SECONDARY_COLOR = "#02714f"; // Verde

// Container principal
export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const Upper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4rem 9rem;
  gap: 5rem;
`;

export const BigText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 1.5rem;
`;

export const Title = styled.h1`
  width: 37rem;
  height: 7rem;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 3rem;
  line-height: 4rem;

  color: #4d4d4d;
`;

export const SubTitle = styled.h2`
  width: 30rem;
  height: 3.5rem;
  margin-top: 0.5rem;

  font-style: normal;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
`;

export const TitleAndSub = styled.div`
  display: flex;
  gap: 3rem;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  border-radius: 10px;
`;

export const Patterns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 67rem;
`;

export const SubSubTitle = styled.h3`
  width: 48.25rem;

  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  color: #4d4d4d;
`;

export const Description = styled.p`
  width: 24rem;

  font-style: normal;
  font-weight: 400;
  font-size: 0.75rem;
  text-align: center;
  color: #717171;
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

export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  z-index: 100;

  overflow-x: auto; // Permite rolagem horizontal
  gap: 1rem; // Espaçamento entre as imagens
  padding: 1rem 0;

  &::-webkit-scrollbar {
    height: 8px; // Altura da barra de rolagem
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; // Cor da barra de rolagem
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; // Fundo da barra de rolagem
  }
`;

export const SmallImage = styled.img`
  width: 10%;
  height: 10%;
`;
