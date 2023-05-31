import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import LatestReportings from "../Reportings/LatestReportings";
import AcceptedReportings from "../Reportings/AcceptedReportings";
import FinishedReportings from "../Reportings/FinishedReportings";
import RejectedReportings from "../Reportings/RejectedReportings";

function HomeScreen() {
  return (
    <div className="inic container">
      <h1 className="judul">Selamat Datang</h1>
      <h2 className="judul2">
        Di Sistem Informasi Pengaduan <br></br>Masyarakat Desa Kosar
      </h2>

      <div className="tampilanhome">
        <h2 className="text-center">
          <b>Daftar Pengaduan</b>
        </h2>
        <Tabs
          defaultActiveKey="reportingterbaru"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="reportingterbaru" title="Terbaru">
            <LatestReportings />
          </Tab>
          <Tab eventKey="reportingdiproses" title="Diproses">
            <AcceptedReportings />
          </Tab>
          <Tab eventKey="reportingselesai" title="Selesai">
            <FinishedReportings />
          </Tab>
          <Tab eventKey="reportingditolak" title="Ditolak">
            <RejectedReportings />
          </Tab>
        </Tabs>
        <div className="fixed-bottom w-50 m-auto">
          <Link to="/tambahkeluhan" className="btn pengaduan btn-block">
            Buat Pengaduan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
