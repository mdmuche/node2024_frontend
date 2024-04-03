import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Button, Card, CardHeader, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  let [db, setDb] = useState(null);
  let [like, setLike] = useState(0);

  const handleLike = (id) => {
    axios
      .post("http://localhost:4000/like", { id, like: 1 })
      .then((res) => {
        console.log(res.data);
        setLike((like = like + 1));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/home")
      .then((res) => {
        // console.log(res.data);
        setDb(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [db, like]);
  return (
    <div className="">
      <Container>
        <h1 className="">ALL Product</h1>
        <Row className="align-content-center justify-content-center">
          {db &&
            db.map((prod) => (
              <Col
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-4"
                key={prod._id}
              >
                <Card key={prod._id} className="shadow border-0 text-center">
                  <CardHeader>
                    <Card.Title>{prod.prodName}</Card.Title>
                  </CardHeader>
                  <Card.Body>
                    <Link title="view product" to={`/details/${prod._id}`}>
                      <Card.Img
                        className="img-fluid"
                        variant="top"
                        src={prod.prodImg_url}
                      ></Card.Img>
                    </Link>
                    <Card.Subtitle className="text-primary mt-2 fs-6">
                      {prod.prodPrice}
                    </Card.Subtitle>
                    <Card.Text>{prod.prodSnippet}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button className="btn btn-light btn-outline-primary">
                      Cart
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleLike(prod._id);
                      }}
                      className="btn btn-light btn-outline-success mx-2"
                    >
                      Like: {prod.prodLikes ? prod.prodLikes : 0}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
