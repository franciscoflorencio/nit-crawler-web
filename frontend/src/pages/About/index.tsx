import React from "react";
import { Container, Title, Content } from "./style";

const AboutUs: React.FC = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Content>
        <p>
          The NIT-Far (Núcleo de Inovação Tecnológica de Farmanguinhos) is the
          department responsible for technological innovation at Fiocruz
          Farmanguinhos.
        </p>
        <p>
          Its functions include protecting intellectual property, prospecting
          and monitoring partnerships, transferring technology, and promoting
          innovation in health.
        </p>
      </Content>
    </Container>
  );
};

export default AboutUs;
