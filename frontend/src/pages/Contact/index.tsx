import React from "react";
import { Form, Input, Button } from "antd";
import { motion } from "framer-motion";
import { ContactContainer, ContactTitle } from "./style";

const Contact: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);

    const { name, email, subject, message } = values;

    const mailtoLink = `mailto:fa017066@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    )}`;

    window.location.href = mailtoLink;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <ContactContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ContactTitle>Entre em Contato</ContactTitle>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <Form
          form={form}
          name="contactForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "Por favor, insira seu nome!" },
              ]}
            >
              <Input placeholder="Digite seu nome" />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Por favor, insira seu e-mail!" },
                {
                  type: "email",
                  message: "Por favor, insira um e-mail válido!",
                },
              ]}
            >
              <Input placeholder="Digite seu e-mail" />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Form.Item
              label="Assunto"
              name="subject"
              rules={[
                { required: true, message: "Por favor, insira o assunto!" },
              ]}
            >
              <Input placeholder="Digite o assunto" />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Form.Item
              label="Mensagem"
              name="message"
              rules={[
                { required: true, message: "Por favor, insira sua mensagem!" },
              ]}
            >
              <Input.TextArea placeholder="Digite sua mensagem" rows={5} />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Enviar Mensagem
              </Button>
            </Form.Item>
          </motion.div>
        </Form>
      </motion.div>
    </ContactContainer>
  );
};

export default Contact;
