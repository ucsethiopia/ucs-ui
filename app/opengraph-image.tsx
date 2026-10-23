import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Site-wide fallback link-preview image (Telegram, LinkedIn, WhatsApp…).
// Article pages override it with their own main image.

export const alt = "UCS Ethiopia — Ultimate Consultancy Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY_950 = "#0f1729";
const GOLD_500 = "#c9a54a";
const LOGO_WIDTH = 520;
const LOGO_HEIGHT = 238; // logo-white.png is 2879×1319

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logos/ucs/logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: NAVY_950,
          borderBottom: `12px solid ${GOLD_500}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt="" />
        <div style={{ marginTop: 40, fontSize: 34, color: GOLD_500, letterSpacing: 2 }}>
          Strategic Advisory · Training · Research · Communication
        </div>
      </div>
    ),
    size
  );
}
