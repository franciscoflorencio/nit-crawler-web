import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../../utils/api";
import { Container, Title, Content, Image } from "./style";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      const data = await fetchProjectById(id);
      setProject(data);
    };
    loadProject();
  }, [id]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>{project.title}</Title>
      <Image src={project.image} alt={project.title} />
      <Content>{project.description}</Content>
    </Container>
  );
};

export default ProjectDetail;
