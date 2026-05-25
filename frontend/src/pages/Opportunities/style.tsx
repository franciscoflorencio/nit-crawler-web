import styled from "styled-components";
import { motion } from "framer-motion";
import { Input } from "antd";

export const Page = styled(motion.div)`
  min-height: 100%;
  background: radial-gradient(1200px circle at 0% 0%, #eef5ff 0%, #f7f9fc 45%, #ffffff 100%);
  padding: 2.5rem 1.5rem 3rem;
`;

export const PageContent = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const Hero = styled.div`
  background: linear-gradient(120deg, rgba(0, 95, 75, 0.08), rgba(0, 95, 75, 0.02));
  border: 1px solid rgba(0, 95, 75, 0.12);
  border-radius: 18px;
  padding: 2rem 2.25rem;
`;

export const HeroTitle = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 2.4rem;
  letter-spacing: -0.02em;
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  max-width: 640px;
  color: #55616e;
  font-size: 1.05rem;
`;

export const ControlsPanel = styled.div`
  background: #ffffff;
  border: 1px solid #e3e9f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);

  .ant-select,
  .ant-picker,
  .ant-input-affix-wrapper,
  .ant-input {
    width: 100%;
  }

  .ant-select-selector,
  .ant-picker,
  .ant-input-affix-wrapper {
    border-radius: 10px;
    border-color: #d7dee7;
    box-shadow: none;
    padding: 0.45rem 0.75rem;
  }
`;

export const ControlsRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
`;

export const FilterGroup = styled.div`
  display: contents;
`;

export const FilterControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #6b7683;
`;

export const SearchRow = styled.div`
  width: 100%;
`;

export const SearchInput = styled(Input)`
  height: 44px;
  font-size: 1rem;
  border-radius: 10px;
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const ResultsTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const ResultsCount = styled.span`
  background: #eef3f8;
  color: #3a4654;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const PaginationRow = styled.div`
  margin-top: 0.75rem;
  display: flex;
  justify-content: center;
`;

export const SidebarColumn = styled.div`
  position: sticky;
  top: 1.25rem;

  @media (max-width: 980px) {
    position: static;
  }
`;

export const SidebarCard = styled.div`
  background: #ffffff;
  border: 1px solid #e3e9f0;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
`;

export const SidebarTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.1rem;
`;

export const LoadingState = styled(motion.p)`
  background: #f7f9fc;
  border: 1px dashed #d6dee8;
  color: #5b6776;
  padding: 1rem 1.25rem;
  border-radius: 12px;
`;

export const EmptyState = styled(motion.p)`
  background: #fff8f2;
  border: 1px dashed #f2c9a6;
  color: #8a5a2d;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
`;
