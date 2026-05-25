import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Select, Pagination, DatePicker } from "antd";
import OpportunityCard from "../../components/OpportunityCard/";
import { motion } from "framer-motion";
import {
  Page,
  PageContent,
  Hero,
  HeroTitle,
  HeroSubtitle,
  ControlsPanel,
  ControlsRow,
  FilterGroup,
  FilterControl,
  Label,
  SearchRow,
  SearchInput,
  ResultsGrid,
  ResultsColumn,
  ResultsHeader,
  ResultsTitle,
  ResultsCount,
  PaginationRow,
  SidebarColumn,
  SidebarCard,
  SidebarTitle,
  FlagSection,
  FlagGrid,
  FlagButton,
  FlagEmoji,
  FlagName,
  LoadingState,
  EmptyState,
} from "./style";
import CountryMap from "../../components/CountryMap";
const AnySelect: any = Select;
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [uniqueValues, setUniqueValues] = useState<Record<string, string[]>>({});
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryCounts, setCountryCounts] = useState<Record<string, number>>({});
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
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
        const params = new URLSearchParams({ page: String(currentPage) });
        if (searchQuery) {
          params.append("search", searchQuery);
        }
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            if (key === "closing_date") {
              params.append("closing_date__gte", value);
            } else {
              params.append(key, value);
            }
          }
        });

        const countParams = new URLSearchParams(params);
        countParams.delete("page");

        const opportunitiesUrl = `${BASE_URL}/opportunities/?${params.toString()}`;
        const countryCountUrl = `${BASE_URL}/opportunities/country-counts/?${countParams.toString()}`;

        const [opportunitiesResponse, countryCountResponse] = await Promise.all([
          axios.get(opportunitiesUrl),
          axios.get(countryCountUrl),
        ]);

        if (!opportunitiesResponse.data || !Array.isArray(opportunitiesResponse.data.results)) {
          throw new Error("Resposta inválida da API");
        }

        setOpportunities(opportunitiesResponse.data.results);
        setCountryCounts(countryCountResponse.data || {});

        setPagination({
          count: opportunitiesResponse.data.count || 0,
          next: opportunitiesResponse.data.next || null,
          previous: opportunitiesResponse.data.previous || null,
        });
      } catch (error) {
        console.error("Erro ao buscar oportunidades:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunities();
  }, [currentPage, filters, searchQuery]);

  useEffect(() => {
    if (filters.country) {
      setSelectedCountries(filters.country.split(",").map((item) => item.trim()).filter(Boolean));
    } else if (selectedCountries.length) {
      setSelectedCountries([]);
    }
  }, [filters.country]);

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

  const setCountryFilter = (countries: string[]) => {
    const deduped = Array.from(new Set(countries.filter(Boolean)));
    setSelectedCountries(deduped);
    handleFilterChange("country", deduped.join(","));
  };

  const toggleCountrySelection = (country: string) => {
    const normalized = country.trim();
    setCountryFilter(
      selectedCountries.includes(normalized)
        ? selectedCountries.filter((item) => item !== normalized)
        : [...selectedCountries, normalized]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const translateFieldName = (field: string) => {
    const lower = field.toLowerCase();
    if (lower.includes("source")) return "Origem";
    if (lower.includes("country")) return "País";
    if (lower.includes("closing_date")) return "Data Limite";
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
      "união europeia": "🇪🇺",
      "european union": "🇪🇺",
      "eu": "🇪🇺",
      mundo: "🌍",
      world: "🌍",
    };
    return map[n] || "";
  };

  const countryOptions = () => {
    const list = (uniqueValues.country || []).slice();
    if (!list.find((item) => item.toLowerCase() === "união europeia")) {
      list.push("União Europeia");
    }
    return list.sort((a, b) => a.localeCompare(b));
  };

  const PAGE_SIZE = 10;

  return (
    <Page
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageContent>
        <Hero>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <HeroTitle>Bolsas e oportunidades</HeroTitle>
            <HeroSubtitle>
              Encontre editais e oportunidades internacionais com filtros inteligentes e uma
              visao clara por pais.
            </HeroSubtitle>
          </motion.div>
        </Hero>

        <ControlsPanel>
          <ControlsRow>
            <FilterGroup>
              {Object.keys(uniqueValues).map((field) => (
                <FilterControl key={field}>
                  <Label htmlFor={`${field}-filter`}>
                    {translateFieldName(field)}
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
                      placeholder="Selecione a data"
                    />
                  ) : (
                    <AnySelect
                      value={filters[field]}
                      onChange={(value: string) =>
                        field === "country"
                          ? setCountryFilter(value ? [value] : [])
                          : handleFilterChange(field, value)
                      }
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
          </ControlsRow>
          <SearchRow>
            <SearchInput
              placeholder="Pesquisar em todos os campos"
              value={searchInput}
              onChange={handleSearchChange}
              allowClear
            />
          </SearchRow>
        </ControlsPanel>

        <ResultsGrid>
          <ResultsColumn>
            <ResultsHeader>
              <ResultsTitle>Resultados</ResultsTitle>
              <ResultsCount>{pagination.count} oportunidades</ResultsCount>
            </ResultsHeader>

            {isLoading && <LoadingState>Carregando oportunidades...</LoadingState>}

            {opportunities.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {opportunities.map((opportunity: any) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <OpportunityCard opportunity={opportunity} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              !isLoading && <EmptyState>Sem oportunidades disponiveis.</EmptyState>
            )}

            <PaginationRow>
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={pagination.count}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </PaginationRow>
          </ResultsColumn>

          <SidebarColumn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SidebarCard>
                <SidebarTitle>Distribuicao por pais</SidebarTitle>
                <FlagSection>
                  <Label>Selecione paises</Label>
                  <FlagGrid>
                    {countryOptions().map((country) => {
                      const isSelected = selectedCountries.includes(country);
                      return (
                        <FlagButton
                          key={country}
                          type="button"
                          $selected={isSelected}
                          onClick={() => toggleCountrySelection(country)}
                        >
                          <FlagEmoji>{countryFlag(country) || "🏳️"}</FlagEmoji>
                          <FlagName>{country}</FlagName>
                        </FlagButton>
                      );
                    })}
                  </FlagGrid>
                </FlagSection>
                <CountryMap
                  countryCounts={countryCounts}
                  onCountryClick={(countryName) =>
                    countryName ? toggleCountrySelection(countryName) : setCountryFilter([])
                  }
                  selectedCountry={selectedCountries[0] || ""}
                />
              </SidebarCard>
            </motion.div>
          </SidebarColumn>
        </ResultsGrid>
      </PageContent>
    </Page>
  );
};

export default Opportunities;
