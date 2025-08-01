import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
      <Html lang="pt">
        <Head>
            <title>Portifólio</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
  );
}