import React from "react";
import Card from "../../components/Card";
import { Container, Title } from "./style";

const projects = [
  {
    id: 1,
    title: "Health Innovation Hub",
    content: "A platform for fostering innovation in healthcare technologies.",
  },
  {
    id: 2,
    title: "Medicine Production",
    content: "Efforts to improve the production of essential medicines.",
  },
];

const Projects: React.FC = () => {
  return (
    <>
      <Container>
        <Title>Projects</Title>
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            content={project.content}
          />
        ))}
      </Container>
    </>
  );
};

export default Projects;
