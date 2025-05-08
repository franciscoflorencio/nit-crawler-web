import { useEffect, useState } from "react";
import axios from "axios";
import { Select, Pagination } from "antd";
import OpportunityCard from "../../components/OpportunityCard/";
import { motion } from "framer-motion";

const Opportunities = () => {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(pagination.count / PAGE_SIZE);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: "2rem" }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Bolsas de Oportunidade
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: "1rem" }}
      >
        <label
          htmlFor="source-filter"
          style={{ marginRight: "0.5rem", fontWeight: "bold" }}
        >
          Filter by Source:
        </label>
        <Select
          id="source-filter"
          value={filterSource}
          onChange={(value) => {
            setFilterSource(value);
            setCurrentPage(1);
          }}
          style={{ width: "200px" }}
          placeholder="Select Source"
        >
          <Select.Option value="">All Sources</Select.Option>
          {uniqueSources.map((source, index) => (
            <Select.Option key={index} value={source}>
              {source}
            </Select.Option>
          ))}
        </Select>
      </motion.div>

      {isLoading && <motion.p>Loading...</motion.p>}

      {opportunities.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
        >
          {opportunities.map((opportunity: any) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OpportunityCard opportunity={opportunity} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p>No opportunities available.</motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={pagination.count}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default Opportunities;
