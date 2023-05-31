import axios from "axios";
import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function CreateReporting() {
  const [complainants_name, setcomplainants_name] = useState();
  const [complaint_category, setcomplaint_category] = useState("");
  const [complaint_title, setcomplaint_title] = useState();
  const [description, setdescription] = useState();

  async function addKeluhan() {
    const newreporting = {
      complainants_name,
      complaint_category,
      complaint_title,
      description,
      work_status: "Pending",
    };

    if (
      !complainants_name ||
      !complaint_category ||
      !complaint_title ||
      !description
    ) {
      Swal.fire("Oops", "Mohon isi semua inputan", "error");
      return;
    }

    try {
      const result = await axios.post("/c/rep", newreporting);

      console.log(result);
      Swal.fire("Okay", "Success Create Reporting", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
        <div className="jdltambahkeluhan">
          <h1>Form Pengaduan</h1>
        </div>
      </div>
      <div className="subjudul col-md">
        <h1>Silahkan Sampaikan Pengaduan Anda Langsung Kepada Kami</h1>
      </div>
      <div className="tampilanhome row justify-content-around bs m-5">
        <div className="col">
          <label className="labelform">Nama</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Nama"
            value={complainants_name}
            onChange={(e) => {
              setcomplainants_name(e.target.value);
            }}
          />
          <label className="labelform">Kategori</label>
          <select
            id="inputState"
            className="form-control custom-select"
            value={complaint_category}
            onChange={(e) => {
              setcomplaint_category(e.target.value);
            }}
          >
            <option value="">Pilih Kategori</option>
            <option>Infrastruktur</option>
            <option>Pelayan Publik</option>
            <option>Keamanan dan Ketertiban</option>
            <option>Kesehatan Masyarakat</option>
            <option>Lingkungan</option>
          </select>
          <label className="labelform">Judul Pengaduan</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Judul Pengaduan"
            value={complaint_title}
            onChange={(e) => {
              setcomplaint_title(e.target.value);
            }}
          />
          <label className="labelform">Isi Pengaduan</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Isi Pengaduan"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />

          <button
            className="btn tambahkeluhan mt-2 btn-block"
            onClick={addKeluhan}
          >
            Tambah Keluhan
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateReporting;
