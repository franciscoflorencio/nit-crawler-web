import React from "react";
import Card from "../../components/Card";
import { Container, Title } from "./style";

const articles = [
  {
    id: 1,
    title: "Innovation in Health",
    content:
      "Discover how technological advancements are transforming healthcare.",
  },
  {
    id: 2,
    title: "Sustainable Practices",
    content: "Learn about sustainable practices in pharmaceutical production.",
  },
];

const Articles: React.FC = () => {
  return (
    <>
      <Container>
        <Title>Articles</Title>
        {articles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            content={article.content}
          />
        ))}
      </Container>
    </>
  );
};

export default Articles;
