import React, { useState } from "react";
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardDescription,
  MetaRow,
  MetaPill,
  DetailsGrid,
  Detail,
  CardFooter,
  ToggleButton,
  LearnMoreButton,
} from "./style";

interface OpportunityCardProps {
  opportunity: {
    id: number;
    title: string;
    description?: string;
    link: string;
    opening_date?: string;
    closing_date?: string;
    closing_time?: string;
    opportunity_status?: string;
    funders?: string;
    funders_url?: string;
    funding_type?: string;
    total_fund?: number;
    award_range?: string;
    publication_date?: string;
    observation?: string;
    institution?: string;
    city?: string;
    date?: string;
    source?: string;
  };
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  // Helper function to check if a field has a value
  const hasValue = (value: any) =>
    value !== null && value !== undefined && value !== "";

  const [isExpanded, setIsExpanded] = useState(false);

  const metaItems = [
    { label: "Origem", value: opportunity.source },
    { label: "Tipo", value: opportunity.funding_type },
    { label: "Status", value: opportunity.opportunity_status },
  ].filter((item) => hasValue(item.value));

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle href={opportunity.link} target="_blank" rel="noopener noreferrer">
          {opportunity.title}
        </CardTitle>
      </CardHeader>

      {hasValue(opportunity.description) && (
        <CardDescription>{opportunity.description}</CardDescription>
      )}

      {isExpanded && metaItems.length > 0 && (
        <MetaRow>
          {metaItems.map((item) => (
            <MetaPill key={`${item.label}-${item.value}`}>{item.value}</MetaPill>
          ))}
        </MetaRow>
      )}

      <DetailsGrid>
        {hasValue(opportunity.source) && (
          <Detail className="primary-detail">
            <span className="label">Origem:</span>
            <span className="value">{opportunity.source}</span>
          </Detail>
        )}
        {hasValue(opportunity.closing_date) && (
          <Detail className="primary-detail">
            <span className="label">Encerramento:</span>
            <span className="value">{opportunity.closing_date}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.funding_type) && (
          <Detail>
            <span className="label">Tipo:</span>
            <span className="value">{opportunity.funding_type}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.opening_date) && (
          <Detail>
            <span className="label">Abertura:</span>
            <span className="value">{opportunity.opening_date}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.publication_date) && (
          <Detail>
            <span className="label">Publicado em:</span>
            <span className="value">{opportunity.publication_date}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.funders) && (
          <Detail>
            <span className="label">Financiador:</span>
            <span className="value">{opportunity.funders}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.total_fund) && (
          <Detail>
            <span className="label">Valor:</span>
            <span className="value">${opportunity.total_fund.toLocaleString()}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.award_range) && (
          <Detail>
            <span className="label">Faixa:</span>
            <span className="value">{opportunity.award_range}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.opportunity_status) && (
          <Detail>
            <span className="label">Status:</span>
            <span className="value">{opportunity.opportunity_status}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.institution) && (
          <Detail>
            <span className="label">Instituicao:</span>
            <span className="value">{opportunity.institution}</span>
          </Detail>
        )}
        {isExpanded && hasValue(opportunity.city) && (
          <Detail>
            <span className="label">Cidade:</span>
            <span className="value">{opportunity.city}</span>
          </Detail>
        )}
      </DetailsGrid>

      <CardFooter>
        <ToggleButton
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Ver menos" : "Ver mais"}
        </ToggleButton>
        {hasValue(opportunity.link) && (
          <LearnMoreButton
            href={opportunity.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver detalhes
          </LearnMoreButton>
        )}
      </CardFooter>
    </CardContainer>
  );
};

export default OpportunityCard;
