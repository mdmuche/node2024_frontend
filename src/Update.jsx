import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update() {
  let { uid } = useParams();
  let [prod, setProd] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodSnippet, setProdSnippet] = useState("");
  const [prodDetails, setProdDetails] = useState("");
  const [prodImg, setProdImg] = useState("");
  const [preview, setPreview] = useState(null);
  let redirect = useNavigate();
  let [disable, setDisable] = useState(false);

  const notify = () => {
    toast.success("product updated successfully", {
      theme: "dark",
      position: "top-center",
      duration: 5000,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/single/${uid}`)
      .then((res) => {
        setProd(res.data);
        setProdName(res.data.prodName);
        setProdPrice(res.data.prodPrice);
        setProdSnippet(res.data.prodSnippet);
        setProdDetails(res.data.prodDetails);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    notify();

    const formData = new FormData();
    formData.append("prodName", prodName);
    formData.append("prodPrice", prodPrice);
    formData.append("prodSnippet", prodSnippet);
    formData.append("prodDetails", prodDetails);
    formData.append("prodImg", prodImg);
    formData.append("id", uid);
    console.log(formData);

    axios
      .patch("http://localhost:4000/updateproduct", formData)
      .then((res) => {
        if (res.data.status === true) {
          redirect(`/details/${uid}`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Container>
        <h1>Product Update for {uid}</h1>
        <Row className="row align-content-center justify-content-center">
          <Col className="col-6">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <Form.FloatingLabel label="prodName">
                <Form.Control
                  type="text"
                  name="ProdName"
                  className="mt-3"
                  value={prodName}
                  onChange={(e) => {
                    setProdName(e.target.value);
                  }}
                ></Form.Control>
              </Form.FloatingLabel>

              <Form.FloatingLabel label="prodPrice">
                <Form.Control
                  type="text"
                  name="prodPrice"
                  className="mt-3"
                  value={prodPrice}
                  onChange={(e) => {
                    setProdPrice(e.target.value);
                  }}
                ></Form.Control>
              </Form.FloatingLabel>

              <Form.FloatingLabel label="prodSnippet">
                <Form.Control
                  as="textarea"
                  name="prodSnippet"
                  className="mt-3 h-25"
                  value={prodSnippet}
                  onChange={(e) => {
                    setProdSnippet(e.target.value);
                  }}
                ></Form.Control>
              </Form.FloatingLabel>

              <Form.FloatingLabel label="prodDetails">
                <Form.Control
                  as="textarea"
                  name="prodDetails"
                  className="mt-3"
                  style={{ height: "150px" }}
                  value={prodDetails}
                  onChange={(e) => {
                    setProdDetails(e.target.value);
                  }}
                ></Form.Control>
              </Form.FloatingLabel>

              <Form.Label className="mt-2">prodImg(only png/jpeg)</Form.Label>
              <Form.Control
                type="file"
                name="prodImg"
                onChange={(e) => {
                  setProdImg(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              ></Form.Control>
              <div className="mt-4 text-center">
                <span>previous prodImg</span>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={prod && prod.prodImg_url}
                  alt={prod && prod.prodName}
                />

                <span className="mx-2">Upload Image: </span>
                {preview && (
                  <img
                    src={preview}
                    alt="Uploaded preview"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </div>
              <div className="text-center my-3">
                <Link
                  className="btn btn-light btn-outline-primary"
                  to={`/details/${uid}`}
                >
                  Back
                </Link>
                <Button
                  className="btn btn-light btn-outline-success mx-3"
                  disabled={disable}
                  type="submit"
                >
                  Update Product
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Update;
