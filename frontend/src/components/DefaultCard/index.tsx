import React from "react";
import { Url, Container, Title, Content, Image } from "./style";

interface CardProps {
  title: string;
  content: string;
  url: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ url, title, content, image }) => {
  return (
    <Container>
      {image && <Image src={image} alt={title} />}
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Url href={url}>{url}</Url>
    </Container>
  );
};

export default Card;
