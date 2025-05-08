import React, { useEffect, useState } from "react";
import { Container, Title } from "./style";
import Card from "../../components/DefaultCard";
import { fetchProjects } from "../../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ padding: "2rem" }}
      >
        <Title>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Projetos
          </motion.h1>
        </Title>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <Link to="/opportunities">
            <Card
              title="Nit Crawler Result"
              content=""
              url="https://github.com/franciscoflorencio/nit-crawler"
            />
          </Link>
          {projects.map((project: any) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                title={project.title}
                content={project.content}
                url={project.url}
                image={project.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Projects;
