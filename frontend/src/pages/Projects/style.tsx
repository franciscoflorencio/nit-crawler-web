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
  font-size: 2.5rem;
  color: #02715f;
  margin-bottom: 2rem;
  text-align: center;
`;

export const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
`;

export const CardWrapper = styled.div`
  flex: 1 1 calc(33.333% - 2rem);
  max-width: calc(33.333% - 2rem);
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 2rem);
    max-width: calc(50% - 2rem);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;
