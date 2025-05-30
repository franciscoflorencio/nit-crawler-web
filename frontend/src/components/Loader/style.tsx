import styled, { keyframes } from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.25rem 0; /* margin: 20px auto (convertido) */
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top-color: #2563eb; /* Tailwind blue-600 */
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;
