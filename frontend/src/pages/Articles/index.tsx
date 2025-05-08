import React, { useEffect, useState } from "react";
import { Container, Title } from "./style";
import Card from "../../components/DefaultCard";
import { fetchArticles } from "../../utils/api";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ padding: "2rem" }}
      >
        <Title>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Artigos
          </motion.h1>
        </Title>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {articles.map((article: any) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                title={article.title}
                content={article.content}
                url={article.url}
                image={article.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Articles;
