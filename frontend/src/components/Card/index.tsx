import React from "react";
import { Container, Title, Content, Image } from "./style";

interface CardProps {
  title: string;
  content: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, content, image }) => {
  return (
    <Container>
      {image && <Image src={image} alt={title} />}
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Container>
  );
};

export default Card;
