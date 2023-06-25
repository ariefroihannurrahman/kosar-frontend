import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalReporting from "../Reportings/ModalsReportings";

function FinishedReportings() {
  const [reportings, setReportings] = useState([]);

  const [duplicateReportings, setDuplicateReportings] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [complaint_category, setcomplaint_category] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/reporting");
        const data = response.data.data;
        setReportings(data);
        setDuplicateReportings(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function filterBySearch() {
    const tempreportings = duplicateReportings.filter(
      (reporting) =>
        reporting.complaint_title
          .toLowerCase()
          .includes(searchkey.toLowerCase()) ||
        reporting.complainants_name
          .toLowerCase()
          .includes(searchkey.toLowerCase())
    );

    setReportings(tempreportings);
  }


  function filterByType(e) {
    setcomplaint_category(e);

    if (e !== "all") {
      const tempreportings = duplicateReportings.filter(
        (reporting) =>
          reporting.complaint_category.toLowerCase() === e.toLowerCase()
      );
      setReportings(tempreportings);
    } else {
      setReportings(duplicateReportings);
    }
  }

  const reportingsSelesai = reportings.filter(
    (reporting) => reporting.work_status === "Completed"
  );

  const sortedreportings = reportingsSelesai.sort((a, b) => b.vote - a.vote);

  return (
    <div className="row justify-content-center">
      <div className="row">
        <div className="col-sm mb-4">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-sm">
          {" "}
          <select
            className="form-control custom-select"
            value={complaint_category}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">Select Category</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Pelayanan Publik">Pelayan Publik</option>
            <option value="Keamanan dan Ketertiban">
              Keamanan dan Ketertiban
            </option>
            <option value="Kesehatan Masyarakat">Kesehatan Masyarakat</option>
            <option value="Lingkungan">Lingkungan</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        {reportingsSelesai.length > 0 ? (
          reportingsSelesai.map((reporting, index) => {
            return (
              <div className="modals col-md-9">
                <ModalReporting reporting={reporting} index={index} />
              </div>
            );
          })
        ) : (
          <p>Tidak ada data reporting yang selesai</p>
        )}
      </div>
    </div>
  );
}

export default FinishedReportings;
