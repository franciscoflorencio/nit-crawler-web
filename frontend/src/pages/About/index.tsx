import React, { useState } from "react";
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
      <Title>Sobre nós</Title>

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

      <ProfileGrid>
        {researchers.map((r) => (
          <ProfileCard key={r.linkedin}>
            <Avatar src={r.avatar} alt={`Foto de ${r.name}`} />
            <ProfileInfo>
              <Name>{r.name}</Name>
              <Role>{r.role}</Role>
              <LinkRow>
                {r.linkedin && (
                  <LinkButton
                    href={r.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: "#131592" }}
                  >
                    <span>LinkedIn</span>
                  </LinkButton>
                )}
                {r.lattes && (
                  <LinkButton
                    href={r.lattes}
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: "#ca680d" }}
                  >
                    <span>Lattes</span>
                  </LinkButton>
                )}
                {r.orcid && (
                  <LinkButton
                    href={r.orcid}
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: "#0b8457" }}
                  >
                    <span>Orcid</span>
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
        ))}
      </ProfileGrid>
    </Container>
  );
};

export default AboutUs;
