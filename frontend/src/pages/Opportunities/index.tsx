import { useEffect, useState } from "react";
import axios from "axios";
import {
  Field,
  Select,
  FilterContainer,
  Label,
  OpportunitiesContainer,
  PaginationContainer,
  PageButton,
  Title,
  OpportunityList,
} from "./style";
import OpportunityCard from "../../components/OpportunityCard/"; // Import the new component

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
  const [uniqueSources, setUniqueSources] = useState<string[]>([]);

  // Fetch unique sources from the backend
  useEffect(() => {
    const fetchUniqueSources = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/unique-sources/",
        );
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
      setIsLoading(true);
      try {
        let url = `http://127.0.0.1:8000/api/opportunities/?page=${currentPage}`;
        if (filterSource) {
          url += `&source=${encodeURIComponent(filterSource)}`;
        }
        const response = await axios.get(url);

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
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, [currentPage, filterSource]);

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

  const PAGE_SIZE = 10; // Match this with your backend's PAGE_SIZE setting
  const totalPages = Math.ceil(pagination.count / PAGE_SIZE);

  return (
    <OpportunitiesContainer>
      <Title>Bolsas de Oportunidade</Title>

      <FilterContainer>
        <Label htmlFor="source-filter">Filter by Source:</Label>
        <Select
          id="source-filter"
          value={filterSource}
          onChange={(e) => {
            setFilterSource(e.target.value);
            setCurrentPage(1);
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

      {isLoading && <p>Loading...</p>}

      <OpportunityList>
        {opportunities.length > 0 ? (
          opportunities.map((opportunity: any) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
        ) : (
          <p>No opportunities available.</p>
        )}
      </OpportunityList>

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
