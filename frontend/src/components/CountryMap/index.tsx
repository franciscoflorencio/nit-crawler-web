import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Usar CDN confiável (jsdelivr) para o topojson, evita bloqueio/CORS do raw GitHub
const TOPO_JSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryMapProps = {
  countryCounts: Record<string, number>;
};

const nameMap: Record<string, string> = {
  // Existing
  "reino unido": "united kingdom",
  "uk": "united kingdom",
  "estados unidos": "united states of america",
  "usa": "united states of america",
  "united states": "united states of america",
  "eua": "united states of america",
  "coreia do sul": "south korea",
  "coreia do norte": "north korea",
  "emirados árabes unidos": "united arab emirates",
  rússia: "russian federation",
  russia: "russian federation",
  irã: "iran, islamic rep.",
  "república tcheca": "czech republic",
  turquia: "turkey",
  "áfrica do sul": "south africa",
  "nova zelândia": "new zealand",
  "países baixos": "netherlands",
  holanda: "netherlands",
  frança: "france",
  franca: "france",
  "frça": "france",
  fr: "france",
  mundo: "world",
  "união europeia": "european union",
  "uniao europeia": "european union",

  // Added
  brasil: "brazil",
  alemanha: "germany",
  espanha: "spain",
  itália: "italy",
  italia: "italy",
  portugal: "portugal",
  canadá: "canada",
  canada: "canada",
  austrália: "australia",
  australia: "australia",
  japão: "japan",
  japao: "japan",
  china: "china",
  índia: "india",
  india: "india",
  méxico: "mexico",
  mexico: "mexico",
  argentina: "argentina",
  chile: "chile",
  suíça: "switzerland",
  suica: "switzerland",
  suécia: "sweden",
  suecia: "sweden",
  noruega: "norway",
  finlândia: "finland",
  finlandia: "finland",
  dinamarca: "denmark",
  irlanda: "ireland",
  bélgica: "belgium",
  belgica: "belgium",
  áustria: "austria",
  austria: "austria",
  polônia: "poland",
  polonia: "poland",
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
  brazil: "#27ab83",
  "united kingdom": "#e53e3e",
  france: "#0a66c2",
  germany: "#ffc107",
};

const countryHoverColors: Record<string, string> = {
  brazil: "#1f8a69",
  "united kingdom": "#c53030",
  france: "#084f99",
  germany: "#d9a300",
};

const normalize = (name: string) => name.trim().toLowerCase();

export default function CountryMap({ countryCounts }: CountryMapProps) {
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

  const EU_COLOR = "#a78bfa"; // Light Purple
  const HIGHLIGHT_COLOR = "#0a66c2"; // Blue
  const EU_HOVER_COLOR = "#8b5cf6";
  const HIGHLIGHT_HOVER_COLOR = "#084f99";
  const DEFAULT_COLOR = "#e5e7eb";
  const DEFAULT_HOVER_COLOR = "#d6d9de";

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
                const specialColor = countryColors[geoName];
                const specialHoverColor = countryHoverColors[geoName];

                let fill = DEFAULT_COLOR;
                let hoverFill = DEFAULT_HOVER_COLOR;

                if (countrySpecificCount > 0) {
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
                      default: { outline: "none" },
                      hover: { outline: "none", fill: hoverFill },
                      pressed: { outline: "none" },
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
