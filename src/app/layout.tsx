import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "./globals.css";
import { PreviewProvider } from "@/components/preview/PreviewProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://dunlopandbutler.example"),
  title: {
    default: "Dunlop & Butler — Tiny Homes & ADUs classified ads",
    template: "%s · Dunlop & Butler",
  },
  description:
    "The premier classifieds for tiny homes and ADUs across all 50 states. Browse by category, or advertise your affordable living solution.",
  applicationName: "Dunlop & Butler",
  keywords: [
    "tiny homes",
    "ADUs",
    "accessory dwelling units",
    "classified ads",
    "affordable living",
  ],
  openGraph: {
    title: "Dunlop & Butler — Tiny Homes & ADUs classified ads",
    description:
      "The premier classifieds for tiny homes and ADUs across all 50 states.",
    siteName: "Dunlop & Butler",
    type: "website",
    images: [
      {
        url: "/assets/logos/dunlop-butler-logo.png",
        width: 482,
        height: 96,
        alt: "Dunlop & Butler — Tiny Homes · ADUs, national classified ads",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Dunlop & Butler — Tiny Homes & ADUs classified ads",
    description:
      "The premier classifieds for tiny homes and ADUs across all 50 states.",
  },
  robots: { index: false, follow: false }, // preview build — not for indexing
};

export const viewport: Viewport = {
  themeColor: "#003f62",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <PreviewProvider>{children}</PreviewProvider>
      </body>
    </html>
  );
}
