import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: var(--card-background);
  border: 1px solid #e1e7ef;
  border-radius: 16px;
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #c6d2e1;
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
`;

export const CardTitle = styled.a`
  display: block;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary-green);
  margin: 0;
  text-decoration: none;

  &:hover {
    color: var(--primary-green-darker);
    text-decoration: underline;
  }
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #3d4a57;
  margin: 0 0 1.25rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const MetaPill = styled.span`
  background: #eef3f8;
  color: #2f3b4a;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
`;

export const Detail = styled.p`
  font-size: 0.92rem;
  color: #2f3b4a;
  margin: 0;
  line-height: 1.5;
  display: grid;
  grid-template-columns: minmax(110px, max-content) 1fr;
  gap: 0.5rem;
  align-items: baseline;

  .label {
    font-weight: 600;
    color: #6c7a89;
  }

  .value {
    color: #2f3b4a;
    word-break: break-word;
  }

  &.primary-detail {
    grid-column: 1 / -1;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: 1px solid #d5dee8;
  color: #2f3b4a;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: #f3f6fa;
    border-color: #c6d2e1;
  }
`;

export const LearnMoreButton = styled.a`
  display: inline-block;
  background: linear-gradient(120deg, var(--primary-green), #0c7a61);
  color: white;
  padding: 0.65rem 1.35rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 95, 75, 0.2);
    color: white;
    text-decoration: none;
  }
`;

