import { useEffect, useState, useRef } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
import { Select, Pagination, Input } from "antd";
import OpportunityCard from "../../components/OpportunityCard/";
import { motion } from "framer-motion";
import { ControlsRow, FilterGroup, FilterControl, Label } from "./style";
const AnySelect: any = Select;
const AnyInput: any = Input;

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [uniqueValues, setUniqueValues] = useState<Record<string, string[]>>({});
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
  const response = await axios.get(`${BASE_URL}/filterable-fields/`);
        const filterData = response.data;

        // Remove duplicates from each filter field
        const deduplicatedData = Object.keys(filterData).reduce((acc, key) => {
          acc[key] = Array.from(new Set(filterData[key].filter(Boolean))); // Also removes empty values
          return acc;
        }, {} as Record<string, string[]>);

        setUniqueValues(deduplicatedData);

        const initialFilters = Object.keys(deduplicatedData).reduce(
          (acc, key) => {
            acc[key] = "";
            return acc;
          },
          {} as Record<string, string>,
        );
        setFilters(initialFilters);
      } catch (error) {
        console.error("Erro ao buscar dados de filtro:", error);
      }
    };
    fetchFilterData();
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
        });
        if (searchQuery) {
          params.append("search", searchQuery);
        }
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });
  const url = `${BASE_URL}/opportunities/?${params.toString()}`;
        const response = await axios.get(url);
        if (!response.data || !Array.isArray(response.data.results)) {
          throw new Error("Resposta inválida da API");
        }
        setOpportunities(response.data.results);
        setPagination({
          count: response.data.count || 0,
          next: response.data.next || null,
          previous: response.data.previous || null,
        });
      } catch (error) {
        console.error("Erro ao buscar oportunidades:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunities();
  }, [currentPage, filters, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 400);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value || "" }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const translateFieldName = (field: string) => {
    const lowerField = field.toLowerCase();

    if (lowerField.includes('source')) return "Origem";
    if (lowerField.includes('status')) return "Status da Oportunidade";
    if (lowerField.includes('funding')) return "Tipo de Financiamento";
    if (lowerField.includes('institu')) return "Instituição";
    if (lowerField.includes('city')) return "Cidade";

    return field
      .replace(/_/g, " ")
      .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
  };

  const PAGE_SIZE = 10;

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

      <ControlsRow>
        <FilterGroup>
          {Object.keys(uniqueValues).map((field) => (
            <FilterControl key={field}>
              <Label htmlFor={`${field}-filter`}>
                {translateFieldName(field)}:
              </Label>
              <AnySelect
                value={filters[field]}
                onChange={(value: string) => handleFilterChange(field, value)}
                style={{ width: "200px" }}
                placeholder={`Selecione ${translateFieldName(field)}`}
                allowClear
                showSearch
                options={[
                  { label: "Todos", value: "" },
                  ...(uniqueValues[field] || []).map((v) => ({ label: v, value: v })),
                ]}
                filterOption={(input: string, option?: { label: string; value: string }) =>
                  (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                }
              />
            </FilterControl>
          ))}
        </FilterGroup>
        <AnyInput
          placeholder="Pesquisar em todos os campos"
          value={searchInput}
          onChange={handleSearchChange}
          style={{ minWidth: 250, flexShrink: 0 }}
          allowClear
        />
      </ControlsRow>

      {isLoading && <motion.p>Carregando...</motion.p>}

      {opportunities.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
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
        !isLoading && <motion.p>Sem oportunidades disponíveis.</motion.p>
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
