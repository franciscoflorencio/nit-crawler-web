import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Usar CDN confiável (jsdelivr) para o topojson, evita bloqueio/CORS do raw GitHub
const TOPO_JSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryMapProps = {
  countryCounts: Record<string, number>;
  onCountryClick: (country: string) => void;
  selectedCountry: string;
};

const nameMap: Record<string, string> = {
  // Existing
  "reino unido": "united kingdom",
  "uk": "united kingdom",
  "estados unidos": "united states of america",
  "usa": "united states of america",
  "eua": "united states of america",
  "coreia do sul": "south korea",
  "coreia do norte": "north korea",
  "emirados árabes unidos": "united arab emirates",
  rússia: "russian federation",
  irã: "iran, islamic rep.",
  "república tcheca": "czech republic",
  turquia: "turkey",
  "áfrica do sul": "south africa",
  "nova zelândia": "new zealand",
  "países baixos": "netherlands",
  holanda: "netherlands",
  frança: "france",
  mundo: "world",
  "união europeia": "european union",

  // Added
  brasil: "brazil",
  alemanha: "germany",
  espanha: "spain",
  itália: "italy",
  portugal: "portugal",
  canadá: "canada",
  austrália: "australia",
  japão: "japan",
  china: "china",
  índia: "india",
  méxico: "mexico",
  argentina: "argentina",
  chile: "chile",
  suíça: "switzerland",
  suécia: "sweden",
  noruega: "norway",
  finlândia: "finland",
  dinamarca: "denmark",
  irlanda: "ireland",
  bélgica: "belgium",
  áustria: "austria",
  polônia: "poland",
};

const euCountries = new Set([
  "austria",
  "belgium",
  "bulgaria",
  "croatia",
  "cyprus",
  "czech republic",
  "denmark",
  "estonia",
  "finland",
  "france",
  "germany",
  "greece",
  "hungary",
  "ireland",
  "italy",
  "latvia",
  "lithuania",
  "luxembourg",
  "malta",
  "netherlands",
  "poland",
  "portugal",
  "romania",
  "slovakia",
  "slovenia",
  "spain",
  "sweden",
]);

const countryColors: Record<string, string> = {
  brazil: "#50C878", // Emerald
  "united kingdom": "#E57373", // Soft Red
  france: "#4A90E2", // Refined Blue
  germany: "#FFB300", // Golden Yellow
};

const countryHoverColors: Record<string, string> = {
  brazil: "#3E9E63",
  "united kingdom": "#D35F5F",
  france: "#357ABD",
  germany: "#E6A100",
};

const normalize = (name: string) => name.trim().toLowerCase();

export default function CountryMap({ countryCounts, onCountryClick, selectedCountry }: CountryMapProps) {
  const normalizedCounts: Record<string, number> = {};
  Object.entries(countryCounts).forEach(([country, count]) => {
    const norm = normalize(country);
    const mapped = nameMap[norm] || norm;
    normalizedCounts[mapped] = (normalizedCounts[mapped] || 0) + count;
  });

  const euOpportunityCount = normalizedCounts["european union"] || 0;
  const hasEuOpportunity = euOpportunityCount > 0;
  if (normalizedCounts["european union"]) {
    delete normalizedCounts["european union"];
  }

  const listItems = Object.entries(normalizedCounts);
  if (hasEuOpportunity) {
    listItems.push(["european union", euOpportunityCount]);
  }
  listItems.sort((a, b) => b[1] - a[1]);

  const hasData = listItems.length > 0;

  const resolveGeoName = (geo: any) => {
    const raw =
      geo.properties?.name ||
      geo.properties?.NAME ||
      geo.properties?.admin ||
      geo.properties?.ADMIN ||
      "";
    return normalize(raw);
  };

  const invertedNameMap = Object.entries(nameMap).reduce((acc, [key, value]) => {
    if (!acc[value]) {
      acc[value] = key;
    }
    return acc;
  }, {} as Record<string, string>);

  // Elegant Palette
  const EU_COLOR = "#9B8AFB"; // Muted Lavender
  const HIGHLIGHT_COLOR = "#4A90E2"; // Refined Blue
  const EU_HOVER_COLOR = "#7C6EF9";
  const HIGHLIGHT_HOVER_COLOR = "#357ABD";
  const DEFAULT_COLOR = "#F0F0F0"; // Warmer, lighter gray
  const DEFAULT_HOVER_COLOR = "#E0E0E0";
  const SELECTED_COLOR = "#FFD700"; // Gold
  const SELECTED_HOVER_COLOR = "#E6C300";

  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <div
        style={{
          width: "min(520px, 100%)",
          height: "min(340px, 60vw)",
          background: "#f7f9f8",
          borderRadius: 12,
          border: "1px solid #e2e8e5",
          overflow: "hidden",
        }}
      >
        <ComposableMap projectionConfig={{ center: [-20, 10], scale: 320 }} style={{ width: "100%", height: "100%" }}>
          <Geographies geography={TOPO_JSON_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = resolveGeoName(geo);
                const countrySpecificCount = normalizedCounts[geoName] || 0;
                const isEuCountry = euCountries.has(geoName);

                const isSelected =
                  normalize(selectedCountry) === geoName ||
                  (isEuCountry &&
                    !countrySpecificCount &&
                    normalize(selectedCountry) === "european union");

                const specialColor = countryColors[geoName];
                const specialHoverColor = countryHoverColors[geoName];

                let fill = DEFAULT_COLOR;
                let hoverFill = DEFAULT_HOVER_COLOR;

                if (isSelected) {
                  fill = SELECTED_COLOR;
                  hoverFill = SELECTED_HOVER_COLOR;
                } else if (countrySpecificCount > 0) {
                  if (specialColor) {
                    fill = specialColor;
                    hoverFill = specialHoverColor || specialColor;
                  } else {
                    fill = HIGHLIGHT_COLOR;
                    hoverFill = HIGHLIGHT_HOVER_COLOR;
                  }
                } else if (isEuCountry && hasEuOpportunity) {
                  fill = EU_COLOR;
                  hoverFill = EU_HOVER_COLOR;
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#ffffff"
                    strokeWidth={0.3}
                    style={{
                      default: { outline: "none", cursor: "pointer" },
                      hover: { outline: "none", fill: hoverFill },
                      pressed: { outline: "none" },
                    }}
                    onClick={() => {
                      const hasIndividualOpportunities = countrySpecificCount > 0;
                      if (isEuCountry && !hasIndividualOpportunities) {
                        const newSelectedCountry =
                          normalize(selectedCountry) === "european union" ? "" : "união europeia";
                        onCountryClick(newSelectedCountry);
                        return;
                      }

                      const normalizedGeoName = normalize(geo.properties.name);
                      const preferredName = invertedNameMap[normalizedGeoName] || normalizedGeoName;
                      const newSelectedCountry = isSelected ? "" : preferredName;
                      onCountryClick(newSelectedCountry);
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div
        style={{
          minWidth: 260,
          maxWidth: "min(520px, 100%)",
          background: "#f7f9f8",
          border: "1px solid #e2e8e5",
          borderRadius: 12,
          padding: "0.75rem 1rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#014f38" }}>Países com bolsas</h4>
        {hasData ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.35rem" }}>
            {listItems.map(([name, count]) => {
              const specialColor = countryColors[name];
              let color = HIGHLIGHT_COLOR;
              if (name === "european union") {
                color = EU_COLOR;
              } else if (specialColor) {
                color = specialColor;
              }

              return (
                <li
                  key={name}
                  style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#2f2f2f" }}
                >
                  <span>
                    {name === "european union"
                      ? "União Europeia"
                      : name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                  <span
                    style={{
                      color: color,
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ margin: 0, color: "#555" }}>Nenhum país disponível para os resultados atuais.</p>
        )}
      </div>
    </div>
  );
}
