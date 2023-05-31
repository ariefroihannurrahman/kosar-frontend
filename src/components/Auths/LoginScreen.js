import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import logo from "../../assets/subang.png";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(true);

  async function verifyCode() {
    try {
      const response = await axios.post("/s/verify", { code });
      console.log(response.data);

      if (response.status === 200 && response.data.status === "Success") {
        setShowModal(false);
        Swal.fire("Success", "Code Verified", "success");
      } else {
        Swal.fire("Oops", "Invalid code", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Failed to verify code", "error");
    }
  }

  async function login() {
    const credentials = {
      username,
      password,
    };

    try {
      const response = await axios.post("/l/emp", credentials);
      console.log(response.data);

      if (response.status === 200) {
        if (response.data.status === "Success" && response.data.code === 200) {
          const isAdmin = response.data.position;

          if (isAdmin === "Admin") {
            sessionStorage.setItem(
              "loggedInUser",
              JSON.stringify({ username, isAdmin })
            );

            Swal.fire("Success", "Login Successful", "success").then(
              (result) => {
                window.location.href = "/admin";
              }
            );
          } else {
            Swal.fire(
              "Oops",
              "You are not an admin. You do not have permission to access this page.",
              "warning"
            );
          }
        } else {
          Swal.fire("Oops", "Invalid credentials", "error");
          console.log(response);
        }
      } else {
        Swal.fire("Oops", "Invalid credentials", "error");
        console.log(response);
      }
    } catch (error) {
      Swal.fire("Oops", "Wrong Username and Password", "error");
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col">
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title className="text-center">
                <img className="img-logo" src={logo} alt="" />
                <h2>Selamat datang di</h2>
                <h1>Sistem Informasi Pengaduan Masyarakat Desa Kosar</h1>
              </Card.Title>
              <Card.Text>
                <h2 className="judullogin">Masuk</h2>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btnlogin btn btn-block" onClick={login}>
                  Masuk
                </button>
                <div className="mt-2 text-center" style={{ color: "black" }}>
                  <Link to="/register" className="">
                    Register ? ...
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Verification Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the verification code:</p>
          <input
            type="password"
            className="form-control"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={verifyCode}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginScreen;
