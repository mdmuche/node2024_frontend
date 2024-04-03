import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

//imports for toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  let [prod, setProd] = useState(null);
  let { id } = useParams();
  let [disable, setDisable] = useState(false);
  let redirect = useNavigate();

  const notify = () =>
    toast.success("product deleted successfully!", {
      theme: "dark",
      position: "top-center",
      duration: 5000,
    });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/single/${id}`)
      .then((res) => {
        setProd(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  const handleDelete = (x) => {
    setDisable(true);
    console.log("product deleted successfully", id);
    notify();
    axios
      .post("http://localhost:4000/deleteproduct", { id: id })
      .then((res) => {
        console.log(res.data);
        redirect("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {prod && (
        <Container className="mt-4 text-center align-content-center justify-content-center">
          <h1>{prod.prodName}</h1>
          <div className="text-center">
            <img
              className="img-fluid  w-5 h-5 my-5"
              src={prod.prodImg_url}
              alt={prod.prodName}
            />
          </div>
          <div className="text-center text-muted mx-3 p-3 lead lh-2 fs-4">
            <h2 className="text-primary fw-bold display-5">{prod.prodPrice}</h2>
            <p>{prod.prodDetails}</p>
          </div>
          <div className="btn-group text-center my-5">
            <Link to={"/"} className="btn btn-light btn-outline-primary">
              Back
            </Link>
            <Link
              to={`/update/${prod._id}`}
              className="btn btn-light btn-outline-success mx-3"
            >
              Update
            </Link>
            <Button
              className="btn btn-light btn-outline-warning"
              onClick={(e) => handleDelete(prod._id)}
              disabled={disable}
            >
              Delete
            </Button>
          </div>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}

export default Details;
