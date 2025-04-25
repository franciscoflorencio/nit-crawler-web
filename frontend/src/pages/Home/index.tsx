import React from "react";
import { motion } from "framer-motion";
import {
  HomePageContainer,
  Footer,
  Upper,
  Image,
  Title,
  SubTitle,
  TitleAndSub,
  Patterns,
  SubSubTitle,
  Description,
} from "./style";
import Example from "../../assets/ex1.png";

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <Upper>
        <TitleAndSub>
          <Title>Núcleo de Inovação Tecnológica de Farmanguinhos</Title>
          <SubTitle>
            Um núcleo da Fiocruz dedicado à inovação e à gestão de propriedade
            intelectual no âmbito da saúde
          </SubTitle>
        </TitleAndSub>
        <Image src={Example} alt="Imagem do Farmanguinhos" />
      </Upper>

      <Patterns>
        <SubSubTitle>Nossos parceiros</SubSubTitle>
        <Description>
          Aqueles que mantém o NIT vivo com todo esforço possível
        </Description>
      </Patterns>
    </HomePageContainer>
  );
};

export default HomePage;
