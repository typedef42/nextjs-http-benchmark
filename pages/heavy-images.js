import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

import Head from "../components/head";

export default class HeavyImages extends React.Component {
  rowSize = 100;
  colSize = 5;

  render() {
    let grid = [];

    for (let rowNumber = 0; rowNumber < this.rowSize; ++rowNumber) {
      let rowData = [];
      for (let colNumber = 0; colNumber < this.colSize; ++colNumber) {
        rowData.push(`./static/img/tiles/100px180-${rowNumber * this.colSize + colNumber + 1}.jpg`);
      }
      grid.push(rowData);
    }

    return (
      <>
        <Head title="NextJS http benchmark" />

        <main>
          {grid.map((row, i) => {
            return (
              <Row key={`row-${i}`}>
                {row.map((col, j) => {
                  return (
                    <Col key={`col-${i * this.colSize + j}`}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={col} />
                        <Card.Body>
                          <Card.Title>Card Title</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card's
                            content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </main>
      </>
    );
  }
}
