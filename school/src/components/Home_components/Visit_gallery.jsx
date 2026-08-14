import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "./files/sarhul.jpg";
import img2 from "./files/playgroup.jpg";
import img3 from "./files/flaggirl.jpg";
import img4 from "./files/eating.jpg";

const photos = [
  { src: img1, label: "Sarhul Festival" },
  { src: img2, label: "Play Group" },
  { src: img3, label: "Flag Hoisting" },
  { src: img4, label: "Lunch Break" },
];

const stats = [
  { num: "500+", label: "Students" },
  { num: "15+", label: "Activities" },
  { num: "10+", label: "Years" },
];

const photoHeights = ["180px", "220px", "160px", "190px"];
const photoAligns = ["flex-start", "flex-end", "flex-start", "flex-start"];

export default function VisitGallery() {
  const [hovered, setHovered] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [telHover, setTelHover] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px",
        background: "#F3F4F6",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Decorative Blob */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#6D28D9",
          opacity: 0.15,
          filter: "blur(80px)",
        }}
      />

      {/* Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#6D28D9",
              marginBottom: "16px",
            }}
          >
            Bachpan · The Little Kingdom · Gumla
          </p>

          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "#111827",
              lineHeight: 1.2,
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            Let your{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#4F46E5,#6D28D9)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              children
            </span>
            <br />
            learn from the best.
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#4B5563",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "30px",
            }}
          >
            Discover a joyful learning environment where children grow
            academically, socially, and emotionally through creativity and care.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/gallery"
              style={{
                padding: "14px 30px",
                borderRadius: "40px",
                background:
                  "linear-gradient(90deg,#4F46E5,#6D28D9)",
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
                boxShadow: btnHover
                  ? "0 10px 30px rgba(79,70,229,0.4)"
                  : "0 6px 20px rgba(79,70,229,0.25)",
                transform: btnHover ? "translateY(-2px)" : "none",
                transition: "0.25s",
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Visit Gallery →
            </Link>

            <a
              href="tel:+919608881888"
              style={{
                padding: "14px 30px",
                borderRadius: "40px",
                border: "2px solid #4F46E5",
                color: "#4F46E5",
                textDecoration: "none",
                fontWeight: "600",
                background: telHover ? "#EEF2FF" : "transparent",
                transition: "0.25s",
              }}
              onMouseEnter={() => setTelHover(true)}
              onMouseLeave={() => setTelHover(false)}
            >
              📞 Contact Us
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "40px" }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <h3
                  style={{
                    fontSize: "28px",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {stat.num}
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#6B7280",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PHOTOS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "18px",
                height: photoHeights[i],
                alignSelf: photoAligns[i],
                cursor: "pointer",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={photo.src}
                alt={photo.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hovered === i ? "scale(1.08)" : "scale(1)",
                  transition: "0.5s",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "10px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  color: "white",
                  fontSize: "13px",
                  opacity: hovered === i ? 1 : 0,
                  transition: "0.3s",
                }}
              >
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "60px",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: "#9CA3AF",
        }}
      >
        © Bachpan · The Little Kingdom · Gumla
      </p>
    </section>
  );
}