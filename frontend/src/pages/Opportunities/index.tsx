import { useEffect, useState, useRef } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
import { Select, Pagination, Input, DatePicker } from "antd";
import OpportunityCard from "../../components/OpportunityCard/";
import { motion } from "framer-motion";
import { ControlsRow, FilterGroup, FilterControl, Label } from "./style";
const AnySelect: any = Select;
const AnyInput: any = Input;
const { RangePicker } = DatePicker;
import dayjs from "dayjs";

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

        const deduplicatedData = Object.keys(filterData).reduce((acc, key) => {
          acc[key] = Array.from(new Set(filterData[key].filter(Boolean)));
          return acc;
        }, {} as Record<string, string[]>);

        const allowedFields = ["source", "country", "closing_date"];
        const filteredData = allowedFields.reduce((acc, key) => {
          acc[key] = deduplicatedData[key] || [];
          return acc;
        }, {} as Record<string, string[]>);

        setUniqueValues(filteredData);

        const initialFilters = allowedFields.reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {} as Record<string, string>);
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
    const lower = field.toLowerCase();
    if (lower.includes("source")) return "Origem";
    if (lower.includes("country")) return "País";
    if (lower.includes("closing_date")) return "Data de Fechamento";
    return field.replace(/_/g, " ").replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
  };

  // Returns a flag emoji (or empty string) for common country names.
  const countryFlag = (name: string) => {
    const n = name.trim().toLowerCase();
    const map: Record<string, string> = {
      brasil: "🇧🇷",
      "brazil": "🇧🇷",
      "reino unido": "🇬🇧",
      "united kingdom": "🇬🇧",
      "uk": "🇬🇧",
      "estados unidos": "🇺🇸",
      "united states": "🇺🇸",
      "usa": "🇺🇸",
      frança: "🇫🇷",
      france: "🇫🇷",
      alemanha: "🇩🇪",
      germany: "🇩🇪",
      espanha: "🇪🇸",
      spain: "🇪🇸",
      itália: "🇮🇹",
      italy: "🇮🇹",
      portugal: "🇵🇹",
      canadá: "🇨🇦",
      canada: "🇨🇦",
      austrália: "🇦🇺",
      australia: "🇦🇺",
      japão: "🇯🇵",
      japan: "🇯🇵",
      china: "🇨🇳",
      índia: "🇮🇳",
      india: "🇮🇳",
      méxico: "🇲🇽",
      mexico: "🇲🇽",
      argentina: "🇦🇷",
      chile: "🇨🇱",
      suíça: "🇨🇭",
      switzerland: "🇨🇭",
      suécia: "🇸🇪",
      sweden: "🇸🇪",
      noruega: "🇳🇴",
      norway: "🇳🇴",
      finlândia: "🇫🇮",
      finland: "🇫🇮",
      dinamarca: "🇩🇰",
      denmark: "🇩🇰",
      irlanda: "🇮🇪",
      ireland: "🇮🇪",
      bélgica: "🇧🇪",
      belgium: "🇧🇪",
      holanda: "🇳🇱",
      "países baixos": "🇳🇱",
      netherlands: "🇳🇱",
      áustria: "🇦🇹",
      austria: "🇦🇹",
      polônia: "🇵🇱",
      poland: "🇵🇱",
    };
    return map[n] || "";
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
              {field === "closing_date" ? (
                <DatePicker
                  id={`${field}-filter`}
                  allowClear
                  format="DD/MM/YYYY"
                  value={filters[field] ? dayjs(filters[field], "DD/MM/YYYY") : null}
                  onChange={(value) => {
                    const formatted = value ? value.format("DD/MM/YYYY") : "";
                    handleFilterChange(field, formatted);
                  }}
                  style={{ width: "200px" }}
                  placeholder="Selecione a data"
                />
              ) : (
                <AnySelect
                  value={filters[field]}
                  onChange={(value: string) => handleFilterChange(field, value)}
                  style={{ width: "200px" }}
                  placeholder={`Selecione ${translateFieldName(field)}`}
                  allowClear
                  showSearch
                  options={[
                    { label: "Todos", value: "" },
                    ...(uniqueValues[field] || []).map((v) => ({
                      label:
                        field === "country"
                          ? `${countryFlag(v)} ${v}`.trim()
                          : v,
                      value: v,
                    })),
                  ]}
                  filterOption={(input: string, option?: { label: string; value: string }) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              )}
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
