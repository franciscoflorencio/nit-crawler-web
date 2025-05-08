import styled from "styled-components";

// Container Principal
export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
`;

// Título da Página
export const ContactTitle = styled.h1`
  font-size: 2.5rem;
  color: #02714f; // Verde primário
  margin-bottom: 2rem;
  text-align: center;
`;

// Formulário de Contato
export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`;

// Rótulo dos Campos
export const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

// Campo de Entrada
export const FormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #02714f;
    outline: none;
  }
`;

// Área de Texto
export const FormTextarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #02714f;
    outline: none;
  }
`;

// Botão de Envio
export const SubmitButton = styled.button`
  background-color: #f7981a; // Laranja primário
  color: white;
  border: none;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e68a0f; // Escurece o laranja ao passar o mouse
  }
`;
