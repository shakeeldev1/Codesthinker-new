import React from 'react';

interface GlobalTechStackSectionProps {
  badgeText: string;
  title: string;
  subtitle: string;
  techStack: string[];
}

export function GlobalTechStackSection({
  badgeText,
  title,
  subtitle,
  techStack
}: GlobalTechStackSectionProps) {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "#FFFFFF",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
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

      {/* Static tech stack grid */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {techStack.map((tech, i) => (
            <span
              key={i}
              style={{
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
    </section>
  );
}
