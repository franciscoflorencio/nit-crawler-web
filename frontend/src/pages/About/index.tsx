import React from "react";
import { Container, Title, Content } from "./style";

const AboutUs: React.FC = () => {
  return (
    <Container>
      <Title>Sobre nós</Title>
      <Content>
        <p>
          O NIT-Far (Núcleo de Inovação Tecnológica de Farmanguinhos) é o
          departamento responsável por inovação tecnológica da Fiocruz
          Farmanguinhos.{" "}
        </p>
        <p>
          Suas funções incluem proteger a propriedade intelectual, prospectar e
          monitorar parcerias, transferir tecnologia e promover a inovação em
          saúde.{" "}
        </p>
      </Content>
    </Container>
  );
};

export default AboutUs;
