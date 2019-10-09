import Document, { Head, Main, NextScript } from "next/document";

export default class H2TestDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
