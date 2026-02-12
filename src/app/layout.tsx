import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";


const eagle = localFont({
  src: [
    { path: "../../public/fonts/Mx437_CL_EagleII_8x16.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-eagle",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Voxl Micro",
    template: "%s | micro voxl",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={eagle.variable}>
      <body className={eagle.className}>{children}</body>
    </html>
  );
}