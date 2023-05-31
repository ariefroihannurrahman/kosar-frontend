import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [nip, setNIP] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const employee = {
      name,
      nip,
      position,
      status,
      username,
      password,
    };

    try {
      const response = await axios.post("/c/emp", employee);
      console.log(response.data); // Menampilkan respon dari server

      // Lakukan tindakan sesuai dengan respon dari server
      if (response.status === 200) {
        Swal.fire("Congrats", "Employee Created Successfully", "success").then(
          (result) => {
            // Lakukan tindakan lain setelah berhasil membuat karyawan...
            // Contoh: Pindah ke halaman lain atau tampilkan notifikasi lainnya
            window.location.href = "/login";
          }
        );
      } else {
        Swal.fire("Oops", "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Oops", "Something went wrong", "error");
      console.log(error);
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="NIP"
              value={nip}
              onChange={(e) => {
                setNIP(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Position"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
