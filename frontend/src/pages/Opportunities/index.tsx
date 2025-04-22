import { useEffect, useState } from 'react';
import { Field, Select, FilterContainer, Label, LearnMoreLink, OpportunityItem, OpportunityList, OpportunitiesContainer, OpportunityDescription, Title, OpportunityTitle } from './style';
import axios from 'axios';

const Opportunities = () => {
  // State to store opportunities and filter criteria
  const [opportunities, setOpportunities] = useState([]);
  const [filterSource, setFilterSource] = useState('');

  // Fetch opportunities from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/opportunities/')
      .then((response) => setOpportunities(response.data))
      .catch((error) => console.error('Error fetching opportunities:', error));
  }, []);

  // Dynamically generate unique sources from the opportunities data
  const uniqueSources = Array.from(new Set(opportunities.map((opportunity) => opportunity.source)));

  // Filter opportunities based on the selected source
  const filteredOpportunities = filterSource
    ? opportunities.filter((opportunity) => opportunity.source === filterSource)
    : opportunities;

  return (
    <OpportunitiesContainer>
      {/* Title */}
      <Title>Funding Opportunities</Title>

      {/* Filter Dropdown */}
      <FilterContainer>
        <Label htmlFor="source-filter">Filter by Source:</Label>
        <Select
          id="source-filter"
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
        >
          <option value="">All Sources</option>
          {uniqueSources.map((source, index) => (
            <option key={index} value={source}>
              {source || 'Unknown'}
            </option>
          ))}
        </Select>
      </FilterContainer>

      {/* List of Opportunities */}
      <OpportunityList>
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <OpportunityItem key={opportunity.id}>
              <OpportunityTitle>{opportunity.title}</OpportunityTitle>
              <Field>
                <span>Source:</span> {opportunity.source || 'Unknown'}
              </Field>
              <Field>
                <span>Description:</span> {opportunity.description || 'N/A'}
              </Field>
              <Field>
                <span>Opening Date:</span> {opportunity.opening_date || 'N/A'}
              </Field>
              <Field>
                <span>Closing Date:</span> {opportunity.closing_date || 'N/A'}
              </Field>
              <Field>
                <span>Status:</span> {opportunity.opportunity_status || 'N/A'}
              </Field>
              <Field>
                <span>Funders:</span> {opportunity.funders || 'N/A'}
              </Field>
              <LearnMoreLink href={opportunity.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </LearnMoreLink>
            </OpportunityItem>
          ))
        ) : (
          <p>No opportunities available.</p>
        )}
      </OpportunityList>
    </OpportunitiesContainer>
  );
};

export default Opportunities;
