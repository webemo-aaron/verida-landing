import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verida - Trusted AI Execution for Operations",
  description:
    "Govern your workflows. Execute with confidence. Stay audit-ready by design. The trust-first AI execution platform for operations teams.",
  keywords: [
    "AI automation",
    "workflow automation",
    "governance",
    "operations automation",
    "compliance",
    "SupportOps",
    "RevOps",
  ],
  openGraph: {
    title: "Verida - Trusted AI Execution for Operations",
    description:
      "Govern your workflows. Execute with confidence. Stay audit-ready by design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verida - Trusted AI Execution for Operations",
    description:
      "Govern your workflows. Execute with confidence. Stay audit-ready by design.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()}`}
          async
          defer
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
