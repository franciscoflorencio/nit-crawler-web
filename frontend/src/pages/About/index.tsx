import React from "react";
import { motion } from "framer-motion";
import { Container, Title, Content } from "./style";

const AboutUs: React.FC = () => {
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
    </Container>
  );
};

export default AboutUs;
