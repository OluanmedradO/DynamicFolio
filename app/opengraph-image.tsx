import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luan Medrado - Frontend Developer, Product Builder and Video Editor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    background: "#0a0a0a",
                    padding: "80px 96px",
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                {/* Glow top-left */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 600,
                        height: 400,
                        background: "radial-gradient(circle at 20% 20%, rgba(224,48,48,0.18) 0%, transparent 60%)",
                        pointerEvents: "none",
                    }}
                />
                {/* Glow bottom-right */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 500,
                        height: 350,
                        background: "radial-gradient(circle at 80% 80%, rgba(224,48,48,0.10) 0%, transparent 60%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Eyebrow */}
                <p
                    style={{
                        fontSize: 14,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#e03030",
                        margin: "0 0 24px",
                        fontWeight: 400,
                    }}
                >
                    frontend · product builder · video editor
                </p>

                {/* Name */}
                <h1
                    style={{
                        fontSize: 96,
                        fontWeight: 900,
                        color: "#ffffff",
                        margin: "0 0 20px",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                    }}
                >
                    Luan Medrado
                    <span style={{ color: "#e03030" }}>.</span>
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: 20,
                        color: "#666666",
                        margin: "0 0 48px",
                        fontWeight: 300,
                        maxWidth: 600,
                        lineHeight: 1.6,
                    }}
                >
                    Shipped products, production interfaces and high-retention video work.
                </p>

                {/* Domain */}
                <p
                    style={{
                        fontSize: 16,
                        letterSpacing: "0.08em",
                        color: "#444444",
                        margin: 0,
                        fontFamily: "monospace",
                    }}
                >
                    oluanmedrado.com
                </p>
            </div>
        ),
        { ...size },
    );
}
