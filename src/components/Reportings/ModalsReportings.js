import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BsArrowRightSquare, BsTriangleFill, BsTriangle } from "react-icons/bs";

function ModalReporting({ reporting, index }) {
  const [voteCount, setVoteCount] = useState(reporting.vote);

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const hasVotedBefore = localStorage.getItem(
      `voted-${reporting.complaint_id}`
    );
    if (hasVotedBefore) {
      setHasVoted(true);
    }
  }, [reporting.complaint_id]);

  const handleVote = () => {
    if (hasVoted) {
      return;
    }
    axios
      .put(`/u/rep/vote?id=${reporting.complaint_id}`, { vote: voteCount + 1 })
      .then((response) => {
        // Update jumlah vote pada komponen
        setVoteCount(voteCount + 1);
        setHasVoted(true);
        localStorage.setItem(`voted-${reporting.complaint_id}`, true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    <div className="row">
      <div className="col">
        <Card className="cardmodal">
          <Card.Body>
            <Card.Title>
              {hasVoted ? (
                <button className="btnvoteup">
                  <BsTriangleFill className="sudahvote" size={30} />
                </button>
              ) : (
                <button className="btnvoteup" onClick={handleVote}>
                  <BsTriangle size={30} />
                </button>
              )}

              {reporting.complaint_title}
              {/* Pengaduan {urutan} */}
              <Link to={`/detailkeluhan/${reporting.complaint_id}`}>
                <button className="btndetail">
                  <BsArrowRightSquare size={30} />
                </button>
              </Link>
            </Card.Title>
            <p
              style={{
                marginLeft: "15px",
                float: "left",
              }}
            >
              {voteCount}
            </p>
            <Card.Text
              style={{
                marginLeft: "40px",
              }}
            >
              {reporting.complainants_name} |{" "}
              <b className={statusClass}>{statusText}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ModalReporting;
