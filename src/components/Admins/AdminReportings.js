import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

function AdminReportings() {
  const [reportings, setReportings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/reporting");
      setReportings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastReporting = currentPage * perPage;
  const indexOfFirstReporting = indexOfLastReporting - perPage;
  const currentReportings = reportings.slice(
    indexOfFirstReporting,
    indexOfLastReporting
  );

  const selesaireporting = (id, newStatus) => {
    axios
      .put(`/u/rep?id=${id}`, { work_status: newStatus })
      .then((response) => {
        console.log(response.data);
        const updatedList = reportings.map((report) => {
          if (report.complaint_id === id) {
            return { ...report, work_status: newStatus };
          }
          return report;
        });

        Swal.fire("Okay", "Reporting Finished", "success").then(
          (updatedList) => {
            window.location.reload();
          }
        );
        setReportings(updatedList);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Oops", "Something Went Wrong", "error");
      });
  };

  return (
    <Row>
      <Col>
        <h1>Semua Laporan</h1>
        <Table bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Warga</th>
              <th>Judul Pengaduan</th>
              <th>Alasan Ditolak</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentReportings.map((reporting, index) => {
              let statusText = reporting.work_status;
              let statusClass = "";
              switch (reporting.work_status) {
                case "Pending":
                  return null;
                case "Diterima":
                  statusText = "Diproses";
                  statusClass = "status-diterima";
                  break;
                case "Ditolak":
                  statusClass = "status-ditolak";
                  break;
                case "Selesai":
                  statusClass = "status-selesai";
                  break;
                default:
                  break;
              }
              return (
                <tr key={reporting._id}>
                  <td>{index + indexOfFirstReporting + 1}</td>
                  <td>{reporting.complainants_name}</td>
                  <td>{reporting.complaint_title}</td>
                  <td style={{ width: "200px", wordBreak: "break-word" }}>
                    {reporting.reason}
                  </td>
                  <td className={statusClass}>{statusText}</td>
                  <td>
                    {reporting.work_status !== "Selesai" &&
                      reporting.work_status !== "Ditolak" && (
                        <Button
                          onClick={() =>
                            selesaireporting(reporting.complaint_id, "Selesai")
                          }
                        >
                          Selesai
                        </Button>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalReportings={reportings.length}
          onPageChange={handlePageChange}
        />
      </Col>
    </Row>
  );

  function Pagination({ currentPage, perPage, totalReportings, onPageChange }) {
    const pageNumbers = Math.ceil(totalReportings / perPage);

    return (
      <nav>
        <ul className="pagination">
          {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item${
                  currentPage === pageNumber ? " active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    );
  }
}

export default AdminReportings;
