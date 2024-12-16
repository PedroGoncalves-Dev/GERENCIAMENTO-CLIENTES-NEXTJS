import type { Metadata } from "next";
import "../globals.css";
import { Roboto } from "next/font/google";

const mainFontFamily = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mainFontFamily.variable}`}>
      <body
        className={`antialiased bg-slate-200 flex justify-center items-center`}
      >
        {children}
      </body>
    </html>
  );
}
