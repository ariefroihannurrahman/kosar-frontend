import React, { useEffect, useState } from "react";

import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import AdminDashboard from "./AdminDashboard";
import AdminReportings from "./AdminReportings";
import AdminReport from "./AdminReport";
import Swal from "sweetalert2";

function AdminPanel() {
 
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (!storedUser) {
      Swal.fire({
        title: "Oops",
        text: "You are not logged in. Please log in to view this page.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }
    setShowAdminContent(true);
  }, []);

  return (
    <Container className="tampilanadmin">
      {showAdminContent && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="laporan">
          <Row className="">
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>Admin Panel</b>
                </h2>
                <Nav.Item>
                  <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="laporan">Laporan</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                  <AdminDashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="laporan">
                  <AdminReportings />
                  <AdminReport />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </Container>
  );
}

export default AdminPanel;
