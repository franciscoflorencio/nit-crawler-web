import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../../utils/api";
import { Container, Title, Content, Image } from "./style";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    loadProject();
  }, [id]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {/* Title */}
      <Title>{project.title}</Title>

      {/* Optional Image */}
      {project.image && <Image src={project.image} alt={project.title} />}

      {/* Description */}
      <Content>{project.description}</Content>
    </Container>
  );
};

export default ProjectDetail;
