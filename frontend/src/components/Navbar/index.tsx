import React, { useState, useEffect } from "react";
import {
  ImageLink,
  NavContainer,
  Logo,
  NavLinks,
  NavLink,
  Dropdown,
  DropdownContent,
} from "./style";
import Nit from "../../assets/nit.png";
import { fetchProjects } from "../../utils/api";

const Navbar = () => {
  const [projects, setProjects] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <NavContainer>
      <ImageLink to="/">
        <Logo src={Nit} alt="Logo" />
      </ImageLink>
      <NavLinks>
        <NavLink to="/articles">Artigos</NavLink>

        <Dropdown onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <NavLink to="/projects">Projetos</NavLink>
          {isDropdownOpen && (
            <DropdownContent>
              <NavLink to="/opportunities">Nit Crawler Result</NavLink>
              {projects.length > 0 ? (
                projects.map((projects: any) => (
                  <NavLink key={projects.id} to={`/projects/${projects.id}`}>
                    {projects.title}
                  </NavLink>
                ))
              ) : (
                <p>Sem projetos disponíves</p>
              )}
            </DropdownContent>
          )}
        </Dropdown>

        <NavLink to="/about">Sobre nós</NavLink>
        <NavLink to="/contact">Contato</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
