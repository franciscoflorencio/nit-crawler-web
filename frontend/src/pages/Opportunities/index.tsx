import { useEffect, useState } from "react";
import {
  Field,
  Select,
  FilterContainer,
  Label,
  LearnMoreLink,
  OpportunityItem,
  OpportunityList,
  OpportunitiesContainer,
  PaginationContainer,
  PageButton,
  Title,
  OpportunityTitle,
} from "./style";
import axios from "axios";

const Opportunities = () => {
  // State variables
  const [opportunities, setOpportunities] = useState([]);
  const [filterSource, setFilterSource] = useState("");
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueSources, setUniqueSources] = useState<string[]>([]); // All unique sources

  // Fetch unique sources from the backend
  useEffect(() => {
    const fetchUniqueSources = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/unique-sources/",
        );
        // Extract the 'source' values from the response
        const sources = response.data.map(
          (item: { source: string }) => item.source,
        );
        setUniqueSources(sources || []);
      } catch (error) {
        console.error("Error fetching unique sources:", error);
      }
    };

    fetchUniqueSources();
  }, []);

  // Fetch opportunities with pagination and filtering
  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true); // Show loading indicator
      try {
        // Build the API URL with pagination and filtering
        let url = `http://127.0.0.1:8000/api/opportunities/?page=${currentPage}`;
        if (filterSource) {
          const encodedSource = encodeURIComponent(filterSource); // Encode the filterSource
          url += `&source=${encodedSource}`;
        }
        const response = await axios.get(url);

        console.log("API Response:", response.data); // Debugging: Log the API response

        // Validate the response
        if (!response.data || !Array.isArray(response.data.results)) {
          throw new Error("Invalid API response");
        }

        setOpportunities(response.data.results);
        setPagination({
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        });
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };

    fetchOpportunities();
  }, [currentPage, filterSource]); // Re-fetch data when currentPage or filterSource changes

  // Handle navigation to the next page
  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle navigation to the previous page
  const handlePreviousPage = () => {
    if (pagination.previous) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Calculate total pages based on PAGE_SIZE (adjust this value if it differs in your backend)
  const PAGE_SIZE = 10; // Match this with your backend's PAGE_SIZE setting
  const totalPages = Math.ceil(pagination.count / PAGE_SIZE);

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
          onChange={(e) => {
            setFilterSource(e.target.value); // Update filterSource
            setCurrentPage(1); // Reset to the first page when applying a filter
          }}
        >
          <option value="">All Sources</option>
          {uniqueSources.map((source, index) => (
            <option key={index} value={source}>
              {source}
            </option>
          ))}
        </Select>
      </FilterContainer>

      {/* Loading Indicator */}
      {isLoading && <p>Loading...</p>}

      {/* List of Opportunities */}
      <OpportunityList>
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <OpportunityItem key={opportunity.id}>
              <OpportunityTitle>{opportunity.title}</OpportunityTitle>
              <Field>
                <span>Source:</span> {opportunity.source || "Unknown"}
              </Field>
              <Field>
                <span>Description:</span> {opportunity.description || "N/A"}
              </Field>
              <Field>
                <span>Opening Date:</span> {opportunity.opening_date || "N/A"}
              </Field>
              <Field>
                <span>Closing Date:</span> {opportunity.closing_date || "N/A"}
              </Field>
              <Field>
                <span>Status:</span> {opportunity.opportunity_status || "N/A"}
              </Field>
              <Field>
                <span>Funders:</span> {opportunity.funders || "N/A"}
              </Field>
              <LearnMoreLink
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </LearnMoreLink>
            </OpportunityItem>
          ))
        ) : (
          <p>No opportunities available.</p>
        )}
      </OpportunityList>

      {/* Pagination Controls */}
      <PaginationContainer>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PageButton
          onClick={handlePreviousPage}
          disabled={!pagination.previous}
        >
          Previous
        </PageButton>
        <PageButton onClick={handleNextPage} disabled={!pagination.next}>
          Next
        </PageButton>
      </PaginationContainer>
    </OpportunitiesContainer>
  );
};

export default Opportunities;
