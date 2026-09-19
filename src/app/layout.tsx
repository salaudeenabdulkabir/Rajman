import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajman Graphics Design and Print | Personalized Gifts, Frames, Mugs & Prints",
  description:
    "Rajman Graphics Design and Print creates personalized photo frames, custom mugs, throw pillows, gifts, and event prints designed to turn meaningful moments into lasting memories.",
  keywords: [
    "personalized gifts Lagos",
    "custom mugs Nigeria",
    "photo frames Lagos",
    "throw pillows custom",
    "event prints Lagos",
    "personalized keepsakes Nigeria",
    "graphics design Ojo Lagos",
  ],
  authors: [{ name: "Rajman Graphics Design and Print" }],
  creator: "Rajman Graphics Design and Print",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://rajmangraphics.com",
    siteName: "Rajman Graphics Design and Print",
    title: "Rajman Graphics Design and Print | Personalized Gifts, Frames, Mugs & Prints",
    description:
      "Beautifully personalized print products and keepsakes that help people celebrate life's most meaningful moments with style, quality, and emotion.",
    images: [
      {
        url: "/brand/rajman-logo.jpg",
        width: 800,
        height: 600,
        alt: "Rajman Graphics Design and Print",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajman Graphics Design and Print",
    description: "Turning Moments Into Memories — personalized prints and keepsakes in Lagos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
