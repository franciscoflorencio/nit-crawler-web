import React, { useEffect, useState } from "react";
import { Container, Title } from "./style";
import Card from "../../components/Card";
import { fetchArticles } from "../../utils/api";

const Articles: React.FC = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };
    loadArticles();
  }, []);

  return (
    <Container>
      <Title>Articles</Title>
      {articles.map((article: any) => (
        <Card
          key={article.id}
          title={article.title}
          content={article.content}
          url={article.url}
          image={article.image}
        />
      ))}
    </Container>
  );
};

export default Articles;
