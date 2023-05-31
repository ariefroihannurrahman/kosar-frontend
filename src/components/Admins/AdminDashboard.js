import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { LinearScale } from "chart.js";

function AdminDashboard() {
  const [reportings, setReportings] = useState([]);
  const [totalreporting, setTotalReporting] = useState(0);
  const [totalreportingDiterima, setTotalReportingDiterima] = useState(0);
  const [totalreportingDitolak, setTotalReportingDitolak] = useState(0);
  const [totalreportingPending, setTotalReportingPending] = useState(0);
  const [totalreportingSelesai, setTotalReportingSelesai] = useState(0);

  Chart.register(...registerables);
  Chart.register(LinearScale);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/reporting");
      const data = response.data.data;

      if (Array.isArray(data)) {
        setReportings(data);
        console.log(data);

        const totalReporting = data.length;
        setTotalReporting(totalReporting);

        const totalReportingDiterima = data.filter(
          (reporting) => reporting.work_status === "Diterima"
        ).length;
        setTotalReportingDiterima(totalReportingDiterima);

        const totalReportingSelesai = data.filter(
          (reporting) => reporting.work_status === "Selesai"
        ).length;
        setTotalReportingSelesai(totalReportingSelesai);

        const totalReportingDitolak = data.filter(
          (reporting) => reporting.work_status === "Ditolak"
        ).length;
        setTotalReportingDitolak(totalReportingDitolak);

        const totalReportingPending = data.filter(
          (reporting) => reporting.work_status === "Pending"
        ).length;
        setTotalReportingPending(totalReportingPending);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],

    datasets: [
      {
        label: "Total Reporting",
        type: "bar",
        data: [totalreporting],
        backgroundColor: "#02a0fc",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Proses",
        type: "bar",
        data: [totalreportingDiterima],
        backgroundColor: "#fec400",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Selesai",
        type: "bar",
        data: [totalreportingSelesai],
        backgroundColor: "#14bd96",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Ditolak",
        type: "bar",
        data: [totalreportingDitolak],
        backgroundColor: "#f12b2c",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Pending",
        type: "bar",
        data: [totalreportingPending],
        backgroundColor: "#696969",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="laporanmasuk dashboard-box">
        <p> Masuk</p>
        <p className="angkas">{totalreporting}</p>
      </div>
      <div className="laporanditerima dashboard-box">
        <p>Diproses</p>
        <p className="angkas">{totalreportingDiterima}</p>
      </div>
      <div className="laporanselesai dashboard-box">
        <p>Selesai</p>
        <p className="angkas">{totalreportingSelesai}</p>
      </div>
      <div className="laporanditolak dashboard-box">
        <p>Ditolak</p>
        <p className="angkas">{totalreportingDitolak}</p>
      </div>
      <div className="laporanpending dashboard-box">
        <p>Pending</p>
        <p className="angkas">{totalreportingPending}</p>
      </div>
      <div className="chart-container justify-content-center">
        <h1>Statistik Laporan</h1>
        <div>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
