import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "nextjs http benchmark";

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=0" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=0" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=0" />
    <link rel="manifest" href="/site.webmanifest?v=0" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=0" color="#5bbad5" />
    <link rel="shortcut icon" href="/favicon.ico?v=0" />
    <meta name="msapplication-TileColor" content="#4a0780" />
    <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=0" />
    <meta name="theme-color" content="#4a0780" />

    <link rel="stylesheet" href="./static/bootstrap.min.css" crossOrigin="anonymous"></link>
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
