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
import Fiotec from "../../assets/fiotec.jpeg";
import Fiocruz from "../../assets/fiocruz.png";
import Farmanguinhos from "../../assets/farmanguinhos.png";

const HomePage: React.FC = () => {
  const images = [
    { src: Cnpq, alt: "CNPQ" },
    { src: Fiotec, alt: "Fiotec" },
    { src: Fiocruz, alt: "Fiocruz" },
    { src: Farmanguinhos, alt: "Farmanguinhos" },
  ];

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
        <Image
          src={Example}
          alt="Imagem meramente ilustrativa de garoto com computador futurista"
        />
      </Upper>

      <Patterns>
        <SubSubTitle>Nossos parceiros</SubSubTitle>
        <Description>
          Aqueles que mantém o NIT vivo com todo esforço possível
        </Description>
        <ImagesContainer>
          {images.map((image, index) => (
            <SmallImage key={index} src={image.src} alt={image.alt} />
          ))}
        </ImagesContainer>
      </Patterns>
    </HomePageContainer>
  );
};

export default HomePage;
