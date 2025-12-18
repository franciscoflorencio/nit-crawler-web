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
import CompetenceMap from "../../components/VennDiagram";

const AboutUs: React.FC = () => {
  const [expandedBio, setExpandedBio] = useState<Record<string, boolean>>({});

  const toggleBio = (key: string) => {
    setExpandedBio((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const extractSkills = (bio: string): string[] => {
    const stopwords = new Set([
      "a","o","as","os","de","do","da","das","dos","em","para","por","com","no","na","nos","nas","e","ou","que","uma","um","num","numa","ao","aos","à","às","se","suas","seus","sua","seu","their","the","and","or","of","in","on","to","for","with","at","by","an","all","from","this","that","these","those","as","is","are","was","were","be","been","being","it","its","de","di","del","la","el","los","las","un","una","unos","unas","y","en"
    ]);

    const noise = new Set([
      "lise","mercadololo","mercadolo","cieti","inovac","ncias","blica","como","posssui","possui",
    ]);

    const domainKeywords: { label: string; match: string }[] = [
      { label: "Química", match: "quimica" },
      { label: "Químico", match: "quimico" },
      { label: "Química Analítica", match: "quimica analitica" },
      { label: "Química Inorgânica", match: "quimica inorganica" },
      { label: "Processos Químicos", match: "processos quimicos" },
      { label: "Processos Químicos e Bioquímicos", match: "processos quimicos e bioquimicos" },
      { label: "Bioquímicos", match: "bioquimicos" },
      { label: "Compostos Organometálicos", match: "compostos organometalicos" },
      { label: "Organometálicos", match: "organometalicos" },
      { label: "Inovação", match: "inovacao" },
      { label: "Tecnologia", match: "tecnologia" },
      { label: "Gestão", match: "gestao" },
      { label: "Gestão do Conhecimento", match: "gestao do conhecimento" },
      { label: "Inteligência Competitiva", match: "inteligencia competitiva" },
      { label: "Saúde Pública", match: "saude publica" },
      { label: "Saúde Global", match: "saude global" },
      { label: "One Health", match: "one health" },
      { label: "Propriedade Intelectual", match: "propriedade intelectual" },
      { label: "Patentes", match: "patentes" },
      { label: "Big Data", match: "big data" },
      { label: "Análises Bibliométricas", match: "analises bibliometricas" },
      { label: "Análise Bibliométrica", match: "analise bibliometrica" },
      { label: "Bibliométrica", match: "bibliometrica" },
      { label: "Farmacêutica", match: "farmaceutica" },
      { label: "Oncológicos", match: "oncologicos" },
      { label: "Saúde Digital", match: "saude digital" },
      { label: "Prospeção Tecnológica", match: "prospeccao tecnologica" },
      { label: "Prospecção Tecnológica", match: "prospeccao tecnologica" },
      { label: "Translação do Conhecimento", match: "translacao do conhecimento" },
      { label: "Indústria Química", match: "industria quimica" },
      { label: "Avaliação de Tecnologias em Saúde", match: "avaliacao em tecnologias em saude" },
      { label: "Bibliometria", match: "bibliometric" },
      { label: "Estratégia de Negócios", match: "estrategia de negocios" },
      { label: "Gestão Estratégica", match: "gestao estrategica" },
    ];

    const normalized = bio
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z\s]/g, " ")
      .replace(/\bcienti\b/g, "cientifica")
      .replace(/cient\s*f\s*ica/g, "cientifica")
      .replace(/gest\s*a\s*o/g, "gestao")
      .replace(/farmace\s*utic[ao]s?/g, "farmaceuticas");

    // Prioridade: frases/termos de domínio
    const selected = new Set<string>();
    domainKeywords.forEach(({ label, match }) => {
      if (normalized.includes(match)) {
        selected.add(label);
      }
    });

    // Contagem de palavras remanescentes
    const counts = new Map<string, number>();
    normalized
      .split(/\s+/)
      .filter((w) => {
        if (w.length < 4) return false;
        if (stopwords.has(w) || noise.has(w)) return false;
        if (!/[aeiou]/.test(w)) return false; // descarta fragmentos sem vogais
        return true;
      })
      .forEach((word) => {
        counts.set(word, (counts.get(word) || 0) + 1);
      });

    const ranked = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word)
      .filter((word) => !Array.from(selected).some((sel) => sel.toLowerCase().includes(word))); // evita duplicidade textual

    const remainingSlots = Math.max(12 - selected.size, 0);
    ranked.slice(0, remainingSlots).forEach((word) => selected.add(word));

    return Array.from(selected).slice(0, 12);
  };

  const ensureDomainPresence = (bio: string, skills: string[]): string[] => {
    const normalized = bio
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z\s]/g, " ")
      .replace(/\bcienti\b/g, "cientifica")
      .replace(/cient\s*f\s*ica/g, "cientifica")
      .replace(/gest\s*a\s*o/g, "gestao")
      .replace(/farmace\s*utic[ao]s?/g, "farmaceuticas");

    const domainKeywords: { label: string; match: string }[] = [
      { label: "Química", match: "quimica" },
      { label: "Químico", match: "quimico" },
      { label: "Química Analítica", match: "quimica analitica" },
      { label: "Química Inorgânica", match: "quimica inorganica" },
      { label: "Processos Químicos", match: "processos quimicos" },
      { label: "Processos Químicos e Bioquímicos", match: "processos quimicos e bioquimicos" },
      { label: "Bioquímicos", match: "bioquimicos" },
      { label: "Compostos Organometálicos", match: "compostos organometalicos" },
      { label: "Organometálicos", match: "organometalicos" },
      { label: "Inovação", match: "inovacao" },
      { label: "Tecnologia", match: "tecnologia" },
      { label: "Gestão", match: "gestao" },
      { label: "Gestão do Conhecimento", match: "gestao do conhecimento" },
      { label: "Inteligência Competitiva", match: "inteligencia competitiva" },
      { label: "Saúde Pública", match: "saude publica" },
      { label: "Saúde Global", match: "saude global" },
      { label: "One Health", match: "one health" },
      { label: "Propriedade Intelectual", match: "propriedade intelectual" },
      { label: "Patentes", match: "patentes" },
      { label: "Big Data", match: "big data" },
      { label: "Análises Bibliométricas", match: "analises bibliometricas" },
      { label: "Análise Bibliométrica", match: "analise bibliometrica" },
      { label: "Bibliométrica", match: "bibliometrica" },
      { label: "Farmacêutica", match: "farmaceutica" },
      { label: "Oncológicos", match: "oncologicos" },
      { label: "Saúde Digital", match: "saude digital" },
      { label: "Prospeção Tecnológica", match: "prospeccao tecnologica" },
      { label: "Prospecção Tecnológica", match: "prospeccao tecnologica" },
      { label: "Translação do Conhecimento", match: "translacao do conhecimento" },
      { label: "Indústria Química", match: "industria quimica" },
      { label: "Avaliação de Tecnologias em Saúde", match: "avaliacao em tecnologias em saude" },
      { label: "Bibliometria", match: "bibliometric" },
      { label: "Estratégia de Negócios", match: "estrategia de negocios" },
      { label: "Gestão Estratégica", match: "gestao estrategica" },
    ];

    const set = new Set(skills);
    domainKeywords.forEach(({ label, match }) => {
      if (normalized.includes(match)) {
        set.add(label);
      }
    });
    return Array.from(set);
  };

  const memberAExtra = [
    "Tecnologias em Saúde",
    "Química Analítica",
    "Compostos Organometálicos",
    "Catálise Homogênea",
    "Química",
    "Agentes Antitumorais",
  ];

  const memberBExtra = [
    "Processos Químicos e Bioquímicos",
    "Gestão e Inovação Tecnológica",
    "Operações Industriais Farmacêuticas",
    "Indústria Química",
    "Saúde Global",
  ];

  const memberA = {
    name: researchers[0].name,
    skills: Array.from(
      new Set(
        ensureDomainPresence(
          researchers[0].bio || "",
          extractSkills(researchers[0].bio || "")
        ).concat(memberAExtra)
      )
    ),
  };

  const memberB = {
    name: researchers[1].name,
    skills: Array.from(
      new Set(
        ensureDomainPresence(
          researchers[1].bio || "",
          extractSkills(researchers[1].bio || "")
        ).concat(memberBExtra)
      )
    ),
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

      <CompetenceMap memberA={memberA} memberB={memberB} />
    </Container>
  );
};

export default AboutUs;

