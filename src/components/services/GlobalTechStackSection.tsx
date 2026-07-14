import React from 'react';

interface GlobalTechStackSectionProps {
  badgeText: string;
  title: string;
  subtitle: string;
  techStack: string[];
}

function TechRow({ items, direction }: { items: string[]; direction: "fwd" | "rev" }) {
  // Triple the array so the loop is seamless
  const repeated = [...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          width: "max-content",
          animation: `marquee${direction === "fwd" ? "Fwd" : "Rev"} 30s linear infinite`,
        }}
      >
        {repeated.map((tech, i) => (
          <span
            key={i}
            className="marquee-pill"
            style={{
              flexShrink: 0,
              padding: "10px 20px",
              borderRadius: 999,
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.07)",
              fontSize: 13,
              fontWeight: 600,
              color: "#4A4540",
              letterSpacing: "0.02em",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              cursor: "default",
              userSelect: "none",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function GlobalTechStackSection({
  badgeText,
  title,
  subtitle,
  techStack
}: GlobalTechStackSectionProps) {
  const midpoint = Math.ceil(techStack.length / 2);
  const row1 = techStack.slice(0, midpoint);
  const row2 = techStack.slice(midpoint);

  return (
    <>
      <style>{`
        @keyframes marqueeFwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .marquee-pill {
          transition: color 0.22s ease, border-color 0.22s ease,
                      box-shadow 0.22s ease, transform 0.22s ease;
        }
        .marquee-pill:hover {
          color: #EA580C !important;
          border-color: rgba(249,115,22,0.35) !important;
          box-shadow: 0 6px 20px rgba(249,115,22,0.12) !important;
          transform: translateY(-2px) scale(1.03);
        }
        /* Pause marquee row on hover */
        .marquee-row:hover > div {
          animation-play-state: paused;
        }
      `}</style>

      <section
        style={{
          padding: "80px 0",
          background: "#FFFFFF",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          overflow: "hidden",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 999,
                  background: "#FFFBEB",
                  border: "1px solid rgba(251,191,36,0.35)",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#B45309",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {badgeText}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  color: "#141210",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {title}
              </h2>
            </div>

            <p
              style={{
                color: "#7A7570",
                fontSize: 14.5,
                maxWidth: 320,
                lineHeight: 1.65,
                paddingBottom: 4,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Marquee rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="marquee-row">
            <TechRow items={row1} direction="fwd" />
          </div>
          <div className="marquee-row">
            <TechRow items={row2} direction="rev" />
          </div>
        </div>
      </section>
    </>
  );
}
