import React from "react";
import { motion } from "framer-motion";
import {
  HomePageContainer,
  Header,
  Section,
  Button,
  Card,
  Footer,
} from "./style";

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      {/* Header */}
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bem-vindo ao Portal de Inovação em Saúde
        </motion.h1>
        <p>Descubra oportunidades de financiamento e conheça o NIT-Far</p>
      </Header>

      {/* Sobre Farmanguinhos */}
      <Section>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Sobre o Farmanguinhos
        </motion.h2>
        <p>
          O Instituto de Tecnologia em Fármacos (Farmanguinhos) é uma unidade
          técnico-científica pública brasileira da Fundação Oswaldo Cruz
          (Fiocruz). Ele atua nas áreas de educação, pesquisa, inovação
          tecnológica, desenvolvimento laboratorial e produção de medicamentos.
        </p>
        <p>
          Farmanguinhos é o principal fornecedor de medicamentos ao SUS,
          especialmente para o tratamento da tuberculose, HIV/AIDS e malária.
        </p>
      </Section>

      {/* Sobre o NIT-Far */}
      <Section>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Sobre o NIT-Far
        </motion.h2>
        <Card>
          <h3>Núcleo de Inovação Tecnológica de Farmanguinhos</h3>
          <p>
            O NIT-Far é responsável pela inovação tecnológica na Fiocruz
            Farmanguinhos. Suas funções incluem:
          </p>
          <ul
            style={{ textAlign: "left", margin: "0 auto", maxWidth: "600px" }}
          >
            <li>Proteção da propriedade intelectual;</li>
            <li>Prospecção e monitoramento de parcerias;</li>
            <li>Transferência de tecnologia;</li>
            <li>Vigilância tecnológica;</li>
            <li>Gestão da inovação.</li>
          </ul>
        </Card>
      </Section>

      {/* Chamada para ação */}
      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button>Explorar Oportunidades</Button>
        </motion.div>
      </Section>

      {/* Footer */}
      <Footer>
        <p>
          © 2023 Farmanguinhos | Desenvolvido pelo NIT-Far | Todos os direitos
          reservados
        </p>
      </Footer>
    </HomePageContainer>
  );
};

export default HomePage;
