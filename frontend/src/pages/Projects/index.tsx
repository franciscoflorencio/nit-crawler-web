import React, { useEffect, useState } from "react";
import { Container, Title } from "./style";
import Card from "../../components/Card";
import { fetchProjects } from "../../utils/api";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <Container>
      <Title>Projects</Title>
      {projects.map((project: any) => (
        <Card
          key={project.id}
          title={project.title}
          content={project.description}
          url={project.url}
          image={project.image}
        />
      ))}
    </Container>
  );
};

export default Projects;
