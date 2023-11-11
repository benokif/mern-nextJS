import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getTheme } from "@/lib/getTheme";
import { Providers } from "@/store/provider";

import "../styles/design_tokens.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MERN - demo",
  description: "MongoDB, Prisma, Express, NodeJS, zod, Next JS app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //🔧wrapping the custom provider component around the children nodes -> all components can access the Redux store.
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: getTheme }} />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
