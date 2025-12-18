import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background-color: var(--background-color);
  color: var(--text-color);
  border-top: 1px solid var(--border-color);
  margin-top: auto; /* Pushes footer to the bottom */
`;

export const Text = styled.p`
  font-size: 0.875rem;
  color: #6c757d; /* Muted text color */
`;
