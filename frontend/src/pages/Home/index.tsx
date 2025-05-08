import React from "react";
import { motion } from "framer-motion";
import {
  HomePageContainer,
  Upper,
  Image,
  Title,
  SubTitle,
  TitleAndSub,
  Patterns,
  SubSubTitle,
  Description,
  ImagesContainer,
  SmallImage,
} from "./style";
import Example from "../../assets/ex1.png";
import Cnpq from "../../assets/cnpq.png";
import Fiotec from "../../assets/fiotec.png";
import Fiocruz from "../../assets/fiocruz.png";
import Farmanguinhos from "../../assets/farmanguinhos.png";

const HomePage: React.FC = () => {
  const images = [
    { src: Cnpq, alt: "CNPQ" },
    { src: Fiotec, alt: "Fiotec" },
    { src: Fiocruz, alt: "Fiocruz" },
    { src: Farmanguinhos, alt: "Farmanguinhos" },
  ];

  // Variantes de animação para o Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      <HomePageContainer>
        <Upper>
          <TitleAndSub>
            <motion.div variants={fadeInUp}>
              <Title>Núcleo de Inovação Tecnológica de Farmanguinhos</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <SubTitle>
                Um núcleo da Fiocruz dedicado à inovação e à gestão de
                propriedade intelectual no âmbito da saúde
              </SubTitle>
            </motion.div>
          </TitleAndSub>
          <motion.div variants={fadeIn}>
            <Image
              src={Example}
              alt="Imagem meramente ilustrativa de garoto com computador futurista"
            />
          </motion.div>
        </Upper>

        <Patterns>
          <motion.div variants={fadeInUp}>
            <SubSubTitle>Nossos parceiros</SubSubTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Description>
              Aqueles que mantém o NIT vivo com todo esforço possível
            </Description>
          </motion.div>
          <motion.div variants={fadeIn}>
            <ImagesContainer>
              {images.map((image, index) => (
                <SmallImage
                  key={index}
                  as={motion.img}
                  src={image.src}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  whileDrag={{ scale: 0.9, rotate: 10 }}
                  dragSnapToOrigin
                  transition={{ duration: 0.3 }}
                  drag
                />
              ))}{" "}
            </ImagesContainer>
          </motion.div>
        </Patterns>
      </HomePageContainer>
    </motion.div>
  );
};

export default HomePage;
