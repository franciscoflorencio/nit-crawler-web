import React from "react";
import { Container, Title, Content } from "./style";

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
  );
};

export default Card;
