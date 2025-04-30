import React from "react";
import {
  ContactContainer,
  ContactTitle,
  ContactForm,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton,
} from "./style";

const Contact: React.FC = () => {
  // Função para lidar com o envio do formulário via mailto
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Capturar os valores dos campos do formulário
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Construir o corpo do e-mail
    const mailtoLink = `mailto:fa017066@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    )}`;

    // Abrir o cliente de e-mail padrão
    window.location.href = mailtoLink;
  };

  return (
    <ContactContainer>
      <ContactTitle>Entre em Contato</ContactTitle>
      <ContactForm onSubmit={handleSubmit}>
        {/* Nome */}
        <FormLabel htmlFor="name">Nome:</FormLabel>
        <FormInput type="text" id="name" name="name" required />

        {/* E-mail */}
        <FormLabel htmlFor="email">E-mail:</FormLabel>
        <FormInput type="email" id="email" name="email" required />

        {/* Assunto */}
        <FormLabel htmlFor="subject">Assunto:</FormLabel>
        <FormInput type="text" id="subject" name="subject" required />

        {/* Mensagem */}
        <FormLabel htmlFor="message">Mensagem:</FormLabel>
        <FormTextarea id="message" name="message" rows={5} required />

        {/* Botão de Envio */}
        <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
