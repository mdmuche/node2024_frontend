import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [preview, setPreview] = useState(null);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodSnippet, setProdSnippet] = useState("");
  const [prodDetails, setProdDetails] = useState("");
  const [prodImg, setProdImg] = useState("");
  let { id } = useParams();
  let redirects = useNavigate();
  let [disable, setDisable] = useState(false);

  const notify = () =>
    toast.success("product created successfully!", {
      theme: "dark",
      position: "top-center",
      duration: 5000,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    const formData = new FormData();
    formData.append("prodName", prodName);
    formData.append("prodPrice", prodPrice);
    formData.append("prodSnippet", prodSnippet);
    formData.append("prodDetails", prodDetails);
    formData.append("prodImg", prodImg);
    formData.append("id", id);
    console.log(formData);
    notify();

    axios
      .post("http://localhost:4000/createproduct", formData)
      .then((res) => {
        if (res.data._id.length > 5) {
          redirects("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Container>
        <h1 className="my-3 display-5 fw-bold text-center text-success">
          Create Product
        </h1>
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
                  required
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
                  required
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
                  required
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
                  required
                  onChange={(e) => {
                    setProdDetails(e.target.value);
                  }}
                ></Form.Control>
              </Form.FloatingLabel>

              <Form.Label className="mt-2">prodImg(only png/jpeg)</Form.Label>
              <Form.Control
                type="file"
                name="prodImg"
                required
                onChange={(e) => {
                  setProdImg(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              ></Form.Control>
              <div className="mt-4 text-center">
                <span className="mx-2">Upload Image: </span>
                {preview && (
                  <img
                    src={preview}
                    alt="Upload preview"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </div>
              <div className="text-center my-3">
                <Link className="btn btn-light btn-outline-primary" to={`/`}>
                  Back
                </Link>
                <Button
                  className="btn btn-light btn-outline-success mx-3"
                  disabled={disable}
                  type="submit"
                >
                  Create Product
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

export default Create;
