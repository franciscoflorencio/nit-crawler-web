import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 80vh;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #02714f;
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  max-width: 800px;
  text-align: center;
  line-height: 1.6;
  color: #333;
`;
