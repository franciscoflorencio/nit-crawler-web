import styled from "styled-components";

export const Field = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0;

  span {
    font-weight: bold;
    color: #333;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const FilterContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  margin-right: 0.5rem;
  font-weight: bold;
  color: #333;
`;

export const OpportunitiesContainer = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const OpportunityList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const OpportunityItem = styled.li`
  background-color: #f9f9f9;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const OpportunityTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #007bff;
`;

export const OpportunityDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

export const LearnMoreLink = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;
