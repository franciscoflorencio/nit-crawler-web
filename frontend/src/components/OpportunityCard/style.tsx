import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    border-color: #cce2db;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const CardTitle = styled.a`
  display: block;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-green);
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    color: var(--primary-green-darker);
    text-decoration: underline;
  }
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Detail = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  margin: 0;
  line-height: 1.5;

  span {
    font-weight: 600;
    color: #6c757d;
    margin-right: 0.5rem;
  }
`;

export const LearnMoreButton = styled.a`
  display: inline-block;
  background-color: var(--primary-green);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--primary-green-darker);
    color: white;
    text-decoration: none;
  }
`;

