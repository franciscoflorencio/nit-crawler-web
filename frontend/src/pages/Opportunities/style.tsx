import styled from "styled-components";

export const ControlsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1.5rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
`;

export const FilterControl = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: #6c757d; /* Muted text */
`;

// Legacy styles updated for consistency
export const OpportunitiesContainer = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  /* Styles are now handled by GlobalStyle */
`;

export const OpportunityList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1.5rem;
`;

export const OpportunityItem = styled.li`
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.06);
  }
`;

export const OpportunityTitle = styled.h2`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--primary-green);
`;

export const OpportunityDescription = styled.p`
  font-size: 1rem;
  color: var(--text-color);
`;

export const LearnMoreLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  font-weight: 600;
  color: var(--link-color);
`;
