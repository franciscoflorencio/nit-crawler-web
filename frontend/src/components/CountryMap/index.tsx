import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Usar CDN confiável (jsdelivr) para o topojson, evita bloqueio/CORS do raw GitHub
const TOPO_JSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryMapProps = {
  countryCounts: Record<string, number>;
};

const nameMap: Record<string, string> = {
  "reino unido": "united kingdom",
  "uk": "united kingdom",
  "estados unidos": "united states of america",
  usa: "united states of america",
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
};

const normalize = (name: string) => name.trim().toLowerCase();

export default function CountryMap({ countryCounts }: CountryMapProps) {
  const normalizedCounts: Record<string, number> = {};
  Object.entries(countryCounts).forEach(([country, count]) => {
    const norm = normalize(country);
    const mapped = nameMap[norm] || norm;
    normalizedCounts[mapped] = (normalizedCounts[mapped] || 0) + count;
  });

  const hasData = Object.keys(normalizedCounts).length > 0;

  const resolveGeoName = (geo: any) => {
    const raw =
      geo.properties?.name ||
      geo.properties?.NAME ||
      geo.properties?.admin ||
      geo.properties?.ADMIN ||
      "";
    return normalize(raw);
  };

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
        <ComposableMap projectionConfig={{ scale: 150 }} style={{ width: "100%", height: "100%" }}>
          <Geographies geography={TOPO_JSON_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = resolveGeoName(geo);
                const count = normalizedCounts[geoName] || 0;
                const isHighlighted = count > 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "#0a66c2" : "#e5e7eb"}
                    stroke="#ffffff"
                    strokeWidth={0.3}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: isHighlighted ? "#084f99" : "#d6d9de" },
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
            {Object.entries(normalizedCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([name, count]) => (
                <li
                  key={name}
                  style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#2f2f2f" }}
                >
                  <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                  <span style={{ color: "#0a66c2", fontWeight: 700 }}>{count}</span>
                </li>
              ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: "#555" }}>Nenhum país disponível para os resultados atuais.</p>
        )}
      </div>
    </div>
  );
}
