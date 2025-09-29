import React, { useState, useEffect } from "react";
import { ImageLink, NavContainer, Logo, NavLinks, NavLink } from "./style";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import Nit from "../../assets/nit.png";
import { fetchProjects } from "../../utils/api";

const Navbar = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    loadProjects();
  }, []);

  // Create dropdown menu items
  const projectItems = projects.map((project: any) => ({
    key: project.id,
    label: (
      <a href={`/project/${project.id}`} rel="noopener noreferrer">
        {project.title}
      </a>
    ),
  }));

  const menuItems = [
    {
      key: "opportunities",
      label: (
        <a href="/opportunities" rel="noopener noreferrer">
          Resultado Nit Crawler
        </a>
      ),
    },
    {
      key: "crawlai",
      label: (
        <a href="/crawlai" rel="noopener noreferrer">
          Crawl AI
        </a>
      ),
    },
    ...projectItems,
  ];

  return (
    <NavContainer>
      <ImageLink style={{ marginLeft: "4rem" }} to="/">
        <Logo src={Nit} alt="Logo" />
      </ImageLink>
      <NavLinks style={{ marginRight: "4rem" }}>
        {/* Static NavLink */}
        <NavLink to="/articles">Artigos</NavLink>

        <Dropdown overlay={<Menu items={menuItems} />} trigger={["hover"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <NavLink to="/projects">Projetos</NavLink>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>

        {/* Other Static NavLinks */}
        <NavLink to="/about">Sobre nós</NavLink>
        <NavLink to="/contact">Contato</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
