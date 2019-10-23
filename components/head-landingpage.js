import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "nextjs http benchmark";

const HeadLandingpage = props => (
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

    <link rel="stylesheet" href="./static/css/bootstrap.min.css" crossOrigin="anonymous"></link>
    <link rel="stylesheet" href="./static/css/agency.min.css" crossOrigin="anonymous"></link>

    <link href="./static/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"></link>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"></link>
    <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet" type="text/css"></link>
    <link
      href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic"
      rel="stylesheet"
      type="text/css"
    ></link>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700"
      rel="stylesheet"
      type="text/css"
    ></link>
  </NextHead>
);

HeadLandingpage.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default HeadLandingpage;
