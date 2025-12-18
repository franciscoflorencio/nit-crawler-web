import React from "react";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  DetailsGrid,
  Detail,
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

  return (
    <CardContainer>
      <CardTitle href={opportunity.link} target="_blank" rel="noopener noreferrer">
        {opportunity.title}
      </CardTitle>

      {hasValue(opportunity.description) && (
        <CardDescription>{opportunity.description}</CardDescription>
      )}

      <DetailsGrid>
        {hasValue(opportunity.source) && (
          <Detail>
            <span>Source:</span> {opportunity.source}
          </Detail>
        )}
        {hasValue(opportunity.funding_type) && (
          <Detail>
            <span>Funding Type:</span> {opportunity.funding_type}
          </Detail>
        )}
        {hasValue(opportunity.opening_date) && (
          <Detail>
            <span>Opening Date:</span> {opportunity.opening_date}
          </Detail>
        )}
        {hasValue(opportunity.closing_date) && (
          <Detail>
            <span>Closing Date:</span> {opportunity.closing_date}
          </Detail>
        )}
        {hasValue(opportunity.publication_date) && (
          <Detail>
            <span>Published On:</span> {opportunity.publication_date}
          </Detail>
        )}
        {hasValue(opportunity.funders) && (
          <Detail>
            <span>Funders:</span> {opportunity.funders}
          </Detail>
        )}
        {hasValue(opportunity.total_fund) && (
          <Detail>
            <span>Total Fund:</span> ${opportunity.total_fund.toLocaleString()}
          </Detail>
        )}
        {hasValue(opportunity.award_range) && (
          <Detail>
            <span>Award Range:</span> {opportunity.award_range}
          </Detail>
        )}
        {hasValue(opportunity.opportunity_status) && (
          <Detail>
            <span>Status:</span> {opportunity.opportunity_status}
          </Detail>
        )}
        {hasValue(opportunity.institution) && (
          <Detail>
            <span>Institution:</span> {opportunity.institution}
          </Detail>
        )}
        {hasValue(opportunity.city) && (
          <Detail>
            <span>City:</span> {opportunity.city}
          </Detail>
        )}
      </DetailsGrid>

      {hasValue(opportunity.link) && (
        <LearnMoreButton
          href={opportunity.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </LearnMoreButton>
      )}
    </CardContainer>
  );
};

export default OpportunityCard;
