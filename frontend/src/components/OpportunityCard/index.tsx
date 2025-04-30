import React from "react";
import {
  OpportunityItem,
  OpportunityTitle,
  Field,
  LearnMoreLink,
} from "./style";

interface OpportunityCardProps {
  opportunity: {
    id: number;
    title: string;
    description?: string;
    link?: string;
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
    <OpportunityItem>
      {/* Title */}
      <OpportunityTitle>{opportunity.title}</OpportunityTitle>

      {/* Render only the fields that have values */}
      {hasValue(opportunity.source) && (
        <Field>
          <span>Source:</span> {opportunity.source}
        </Field>
      )}
      {hasValue(opportunity.description) && (
        <Field>
          <span>Description:</span> {opportunity.description}
        </Field>
      )}
      {hasValue(opportunity.opening_date) && (
        <Field>
          <span>Opening Date:</span> {opportunity.opening_date}
        </Field>
      )}
      {hasValue(opportunity.closing_date) && (
        <Field>
          <span>Closing Date:</span> {opportunity.closing_date}
        </Field>
      )}
      {hasValue(opportunity.closing_time) && (
        <Field>
          <span>Closing Time:</span> {opportunity.closing_time}
        </Field>
      )}
      {hasValue(opportunity.opportunity_status) && (
        <Field>
          <span>Status:</span> {opportunity.opportunity_status}
        </Field>
      )}
      {hasValue(opportunity.funders) && (
        <Field>
          <span>Funders:</span> {opportunity.funders}
        </Field>
      )}
      {hasValue(opportunity.funding_type) && (
        <Field>
          <span>Funding Type:</span> {opportunity.funding_type}
        </Field>
      )}
      {hasValue(opportunity.total_fund) && (
        <Field>
          <span>Total Fund:</span> ${opportunity.total_fund}
        </Field>
      )}
      {hasValue(opportunity.award_range) && (
        <Field>
          <span>Award Range:</span> {opportunity.award_range}
        </Field>
      )}
      {hasValue(opportunity.publication_date) && (
        <Field>
          <span>Publication Date:</span> {opportunity.publication_date}
        </Field>
      )}
      {hasValue(opportunity.observation) && (
        <Field>
          <span>Observation:</span> {opportunity.observation}
        </Field>
      )}
      {hasValue(opportunity.institution) && (
        <Field>
          <span>Institution:</span> {opportunity.institution}
        </Field>
      )}
      {hasValue(opportunity.city) && (
        <Field>
          <span>City:</span> {opportunity.city}
        </Field>
      )}
      {hasValue(opportunity.date) && (
        <Field>
          <span>Date:</span> {opportunity.date}
        </Field>
      )}

      {/* Learn More Link */}
      {hasValue(opportunity.link) && (
        <LearnMoreLink
          href={opportunity.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </LearnMoreLink>
      )}
    </OpportunityItem>
  );
};

export default OpportunityCard;
