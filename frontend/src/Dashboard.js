import React from 'react';
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Dashboard = ({ children }) => {
    return (
        <Router>
            <div className="page-container">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <Navbar bg="dark" variant="dark">
                                <Container className="container-layout">
                                    <Navbar.Brand href="#home">Welcome</Navbar.Brand>
                                    <Button variant="outline-danger">Log Out</Button>
                                </Container>
                            </Navbar>
                        </Col>
                        <Col xs={12}>
                            <Navbar bg="light" expand="lg">
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                        <Nav.Link href="/upload-recipe">
                                            <span className="nav-item" tabIndex="0">
                                                Upload Recipe
                                            </span>
                                        </Nav.Link>
                                        <Nav.Link href="/feedback">
                                            <span className="nav-item" tabIndex="0">
                                                Feedback review
                                            </span>
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col xs={12} className="page-content">
                            {children}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    )
}

export default Dashboard;