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

export const ProfileGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
`;

export const ProfileCard = styled.div`
  background: #f7f9f8;
  border: 1px solid #e2e8e5;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #02714f;
  background: #e6f4ef;
`;

export const ProfileInfo = styled.div`
  min-width: 200px;
  text-align: left;
`;

export const Name = styled.h3`
  margin: 0 0 0.25rem 0;
  color: #014f38;
  font-size: 1.05rem;
`;

export const Role = styled.p`
  margin: 0 0 0.5rem 0;
  color: #4a4a4a;
  font-size: 0.95rem;
`;

export const LinkRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #0a66c2;
  color: #fff;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    background: #08559f;
    box-shadow: 0 4px 8px rgba(10, 102, 194, 0.25);
    transform: translateY(-1px);
  }
`;

export const Bio = styled.p`
  flex: 1;
  margin: 0;
  color: #2f2f2f;
  line-height: 1.55;
  font-size: 0.95rem;
  min-width: 260px;
`;

export const ToggleButton = styled.button`
  margin-top: 0.5rem;
  background: transparent;
  color: #0a66c2;
  border: none;
  padding: 0;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  align-self: flex-start;

  &:hover {
    color: #084f99;
  }
`;
