import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Title,
  Content,
  ProfileGrid,
  ProfileCard,
  Avatar,
  ProfileInfo,
  Name,
  Role,
  LinkRow,
  LinkButton,
  Bio,
  ToggleButton,
} from "./style";
import { researchers } from "../../data/researchers";

const AboutUs: React.FC = () => {
  const [expandedBio, setExpandedBio] = useState<Record<string, boolean>>({});

  const toggleBio = (key: string) => {
    setExpandedBio((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Container>
      {/* Animação do título */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Sobre nós</Title>
      </motion.div>

      {/* Animação do conteúdo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Content>
          <p>
            O NIT-Far (Núcleo de Inovação Tecnológica de Farmanguinhos) é o
            departamento responsável por inovação tecnológica da Fiocruz
            Farmanguinhos.
          </p>
          <p>
            Suas funções incluem proteger a propriedade intelectual, prospectar
            e monitorar parcerias, transferir tecnologia e promover a inovação
            em saúde.
          </p>
        </Content>
      </motion.div>

      <ProfileGrid>
        {researchers.map((r) => (
          <motion.div
            key={r.linkedin}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ProfileCard>
              <Avatar src={r.avatar} alt={`Foto de ${r.name}`} />
              <ProfileInfo>
                <Name>{r.name}</Name>
                <Role>{r.role}</Role>
                  <LinkRow>
                  {r.linkedin && (
                    <LinkButton href={r.linkedin} target="_blank" rel="noreferrer">
                      <span>LinkedIn</span>
                    </LinkButton>
                  )}
                    {r.lattes && (
                      <LinkButton
                        href={r.lattes}
                        target="_blank"
                        rel="noreferrer"
                        style={{ background: "#0b8457" }}
                      >
                        <span>Lattes</span>
                      </LinkButton>
                    )}
                  </LinkRow>
              </ProfileInfo>
              {r.bio && (
                <>
                  <Bio
                    style={{
                      maxHeight: expandedBio[r.linkedin] ? "none" : "110px",
                      overflow: "hidden",
                    }}
                  >
                    {r.bio}
                  </Bio>
                  <ToggleButton onClick={() => toggleBio(r.linkedin)}>
                    {expandedBio[r.linkedin] ? "Ler menos" : "Continue lendo"}
                  </ToggleButton>
                </>
              )}
            </ProfileCard>
          </motion.div>
        ))}
      </ProfileGrid>
    </Container>
  );
};

export default AboutUs;
