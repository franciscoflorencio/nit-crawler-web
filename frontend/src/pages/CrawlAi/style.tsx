import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem; /* pt-8 p-4 */
  background-color: #f9fafb; /* Tailwind gray-50 */
`;

export const MainContentWrapper = styled.div`
  width: 100%;
  max-width: 48rem; /* max-w-3xl */
`;

export const Header = styled.header`
  margin-bottom: 2rem; /* mb-8 */
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  line-height: 2.25rem;
  font-weight: 700; /* font-bold */
  color: #1f2937; /* gray-800 */
  @media (min-width: 640px) {
    /* sm breakpoint */
    font-size: 2.25rem; /* text-4xl */
    line-height: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  color: #4b5563; /* gray-600 */
  margin-top: 0.5rem; /* mt-2 */
  font-size: 0.875rem; /* text-sm */
  line-height: 1.25rem;
  @media (min-width: 640px) {
    font-size: 1rem; /* text-base */
    line-height: 1.5rem;
  }
`;

export const ContentBox = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg (ajustado para corresponder ao HTML) */
  margin-bottom: 1.5rem; /* mb-6 */
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem; /* text-xl */
  line-height: 1.75rem;
  font-weight: 600; /* font-semibold */
  color: #374151; /* gray-700 */
  margin-bottom: 0.75rem; /* mb-3 (ajustado do HTML) */
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem; /* mb-4 */
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* text-sm */
  line-height: 1.25rem;
  font-weight: 500; /* font-medium */
  color: #374151; /* gray-700 */
  margin-bottom: 0.25rem; /* mb-1 */
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem; /* p-3 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  &:focus {
    outline: none;
    border-color: #2563eb; /* focus:border-blue-500 (ajustado) */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 (ajustado) */
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem; /* p-3 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  &:focus {
    outline: none;
    border-color: #2563eb; /* focus:border-blue-500 (ajustado) */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 (ajustado) */
  }
`;

export const HelpText = styled.p`
  margin-top: 0.25rem; /* mt-1 */
  font-size: 0.75rem; /* text-xs */
  line-height: 1rem;
  color: #6b7280; /* gray-500 */
`;

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean; // Adicionado para o segundo botão
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  background-color: ${(props) =>
    props.primary ? "#2563eb" : props.secondary ? "#16a34a" : "#6b7280"};
  color: white;
  font-weight: 600; /* font-semibold */
  padding: 0.75rem 1rem; /* py-3 px-4 */
  border-radius: 0.5rem; /* rounded-lg */
  border: none;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md (ajustado) */
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: ${(props) =>
      props.primary ? "#1d4ed8" : props.secondary ? "#15803d" : "#52525b"};
  }
  &:focus {
    outline: none;
    box-shadow:
      0 0 0 3px
        ${(props) =>
          props.primary
            ? "rgba(59, 130, 246, 0.5)"
            : props.secondary
              ? "rgba(22, 163, 74, 0.5)"
              : "rgba(107, 114, 128, 0.5)"},
      0 0 0 1px
        ${(props) =>
          props.primary
            ? "#2563eb"
            : props.secondary
              ? "#16a34a"
              : "#6b7280"}; /* focus:ring-offset-2 (simulado) */
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc2626; /* text-red-600 */
  text-align: center;
  margin-top: 1rem; /* mt-4 (ajustado) */
  font-size: 0.875rem; /* text-sm */
`;

export const ResultsTitle = styled.h3`
  font-size: 1.125rem; /* text-lg (ajustado do HTML) */
  line-height: 1.75rem;
  font-weight: 600; /* font-semibold */
  color: #374151; /* gray-700 */
  margin-bottom: 1rem; /* mb-4 ou mb-2 (ajustado) */
`;

export const Highlight = styled.span`
  font-weight: 700; /* font-bold */
  color: #2563eb; /* text-blue-600 */
`;

export const ProseContent = styled.div`
  /* Os estilos para .prose-custom e .grant-item em GlobalStyles cuidarão disso */
`;

export const Footer = styled.footer`
  margin-top: 3rem; /* mt-12 */
  text-align: center;
  color: #6b7280; /* gray-500 */
  font-size: 0.75rem; /* text-xs */
  line-height: 1rem;
  padding-bottom: 2rem; /* pb-8 */
  p {
    margin-bottom: 0.25rem;
  }
`;
