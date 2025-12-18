import React from "react";
import styled, { keyframes } from "styled-components";

// Define the floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const VennWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
  position: relative;
  width: 100%;
  height: 350px; 
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: multiply;
`;

const CircleA = styled(Circle)`
  width: 350px;
  height: 350px;
  background: rgba(74, 144, 226, 0.5);
  left: 50%;
  transform: translateX(-65%);
`;

const CircleB = styled(Circle)`
  width: 350px;
  height: 350px;
  background: rgba(80, 200, 120, 0.5);
  right: 50%;
  transform: translateX(65%);
`;

const SkillArea = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
`;

const SkillsA = styled(SkillArea)`
  left: 50%;
  transform: translateX(-140%);
  h3 { color: #2a62a2; }
`;

const SkillsB = styled(SkillArea)`
  right: 50%;
  transform: translateX(140%);
  h3 { color: #3b8b54; }
`;

const Intersection = styled(SkillArea)`
  h3 { color: #333; }
`;

const Skill = styled.span`
  background: white;
  padding: 0.4rem 0.9rem;
  border-radius: 18px;
  margin: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${() => Math.random() * 3}s;
  border: 1px solid #e0e0e0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.2rem;
  color: #222;
  font-weight: 600;
`;

type CompetenceMapProps = {
  memberA: { name: string; skills: string[] };
  memberB: { name: string; skills: string[] };
};

const CompetenceMap: React.FC<CompetenceMapProps> = ({ memberA, memberB }) => {
  const skillsA = new Set(memberA.skills.map(s => s.toLowerCase()));
  const skillsB = new Set(memberB.skills.map(s => s.toLowerCase()));

  const intersection = new Set([...skillsA].filter(skill => skillsB.has(skill)));
  const uniqueA = new Set([...skillsA].filter(skill => !skillsB.has(skill)));
  const uniqueB = new Set([...skillsB].filter(skill => !intersection.has(skill)));

  return (
    <div style={{ padding: "2rem 0" }}>
      <Title>Mapa de Competências</Title>
      <VennWrapper>
        <CircleA />
        <CircleB />
        <SkillsA>
          <h3>{memberA.name}</h3>
          {[...uniqueA].map(skill => <Skill key={skill}>{skill}</Skill>)}
        </SkillsA>
        <Intersection>
          <h3>Interseção</h3>
          {[...intersection].map(skill => <Skill key={skill}>{skill}</Skill>)}
        </Intersection>
        <SkillsB>
          <h3>{memberB.name}</h3>
          {[...uniqueB].map(skill => <Skill key={skill}>{skill}</Skill>)}
        </SkillsB>
      </VennWrapper>
    </div>
  );
};

export default CompetenceMap;
