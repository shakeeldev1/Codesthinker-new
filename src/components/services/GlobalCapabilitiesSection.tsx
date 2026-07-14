import React from 'react';
import { ChevronRight } from "lucide-react";

export interface Capability {
  id: string | number;
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  span: string;
  accent: string; // Keep for compatibility
  iconColor: string;
}

interface GlobalCapabilitiesSectionProps {
  badgeText: string;
  title: string;
  subtitle: string;
  capabilities: Capability[];
}

export function GlobalCapabilitiesSection({
  badgeText,
  title,
  subtitle,
  capabilities
}: GlobalCapabilitiesSectionProps) {
  return (
    <>
      <style>{`
        .cap-card {
          background: #FFFFFF;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .cap-card .cap-title {
          color: #07051d;
          transition: color 0.28s ease;
        }
        .cap-card .cap-desc {
          color: #4A4540;
          transition: color 0.28s ease;
        }
        .cap-card .cap-learn {
          color: #EA580C;
          transition: color 0.28s ease, transform 0.28s ease, opacity 0.28s ease;
          opacity: 0;
          transform: translateY(6px);
        }
        .cap-card .cap-tag {
          background: rgba(7, 5, 29, 0.05);
          border: 1px solid rgba(7, 5, 29, 0.08);
          color: #4A4540;
          transition: background-color 0.28s ease, border-color 0.28s ease, color 0.28s ease;
        }
        .cap-icon-wrap {
          background: #FFFFFF;
          border: 1px solid rgba(7, 5, 29, 0.08);
          box-shadow: 0 2px 12px rgba(7, 5, 29, 0.05);
          transition: transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, border-color 0.22s ease;
        }
        .cap-icon {
          transition: color 0.22s ease;
        }

        /* Hover States */
        .cap-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 60px rgba(7, 5, 29, 0.08);
        }
        .cap-card:hover .cap-hover-bg {
          opacity: 1 !important;
        }
        .cap-card:hover .cap-title {
          color: #07051d;
        }
        .cap-card:hover .cap-desc {
          color: #2D2B3D;
        }
        .cap-card:hover .cap-learn {
          color: #EA580C;
          opacity: 1;
          transform: translateY(0);
        }
        .cap-card:hover .cap-tag {
          background: rgba(234, 88, 12, 0.08);
          border: 1px solid rgba(234, 88, 12, 0.15);
          color: #EA580C;
        }
        .cap-card:hover .cap-icon-wrap {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(234, 88, 12, 0.12);
          border-color: rgba(234, 88, 12, 0.2);
        }
      `}</style>

      <section
        style={{ padding: "112px 24px", maxWidth: 1400, margin: "0 auto", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              background: "#FFF7ED",
              border: "1px solid rgba(249,115,22,0.25)",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: "#EA580C",
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
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#141210",
              marginBottom: 16,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {title}
          </h2>

          <p style={{ color: "#7A7570", fontSize: 17, maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            {subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const isWide = cap.span === "col-span-2";
            return (
              <div
                key={cap.id}
                className={`cap-card ${isWide ? 'lg:col-span-2' : 'lg:col-span-1'}`}
                style={{
                  borderRadius: 24,
                  padding: 32,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 24px rgba(7, 5, 29, 0.04), 0 1px 4px rgba(7, 5, 29, 0.02)",
                  cursor: "default",
                }}
              >
                {/* Default Navy Blue to White Background layer */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#07051d]/10 via-[#07051d]/02 to-white"
                  style={{
                    borderRadius: 24,
                    opacity: 1,
                  }}
                />

                {/* Hover Orange/Amber to White Background layer */}
                <div
                  className="cap-hover-bg absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-50/20 to-white"
                  style={{
                    borderRadius: 24,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Top row: icon + tag */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
                    <div
                      className="cap-icon-wrap"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        size={20}
                        className={`cap-icon ${cap.iconColor}`}
                      />
                    </div>
                    <span
                      className="cap-tag"
                      style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {cap.tag}
                    </span>
                  </div>

                  <h3
                    className="cap-title"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      marginBottom: 10,
                      lineHeight: 1.3,
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {cap.title}
                  </h3>

                  <p 
                    className="cap-desc"
                    style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}
                  >
                    {cap.description}
                  </p>

                  {/* Hover-reveal CTA */}
                  <div
                    className="cap-learn"
                    style={{
                      marginTop: 24,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    Learn more <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
