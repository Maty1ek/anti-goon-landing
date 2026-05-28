import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Anti-Goon — AI that blurs your screen in real time.",
  description:
    "Anti-Goon is the desktop AI that sees your screen and blurs every woman it detects — nude, in a bikini, or in tight clothes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Verbatim copy of the original script.js — loaded after hydration
            so its top-level DOM queries find every element already painted. */}
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
