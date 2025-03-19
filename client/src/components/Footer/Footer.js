import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Footer.css"; // Tạo file CSS riêng để tùy chỉnh

const Footer = () => {
    return (
        <footer className="footer-section py-5">
            <Container>
                <Row className="g-4">
                    {/* Cột 1: Funiro */}
                    <Col md={3} className="text-start">
                        <h5 className="fw-bold mb-3">Funiro.</h5>
                        <p className="text-muted">
                            400 University Drive Suite 200 Coral Gables,
                            <br />
                            FL 33134 USA
                        </p>
                    </Col>

                    {/* Cột 2: Links */}
                    <Col md={3} className="text-start">
                        <h5 className="fw-bold mb-3">Links</h5>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-2">Home</li>
                            <li className="mb-2">Shop</li>
                            <li className="mb-2">About</li>
                            <li className="mb-2">Contact</li>
                        </ul>
                    </Col>

                    {/* Cột 3: Help */}
                    <Col md={3} className="text-start">
                        <h5 className="fw-bold mb-3">Help</h5>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-2">Payment Options</li>
                            <li className="mb-2">Returns</li>
                            <li className="mb-2">Privacy Policies</li>
                        </ul>
                    </Col>

                    {/* Cột 4: Newsletter */}
                    <Col md={3} className="text-start">
                        <h5 className="fw-bold mb-3">Newsletter</h5>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="bg-white border-0 rounded-0 py-2"
                                />
                            </Form.Group>
                            <Button
                                variant="dark"
                                className="w-100 rounded-0 py-2"
                                style={{
                                    backgroundColor: "#333",
                                    border: "none",
                                }}
                            >
                                SUBSCRIBE
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <hr className="my-4" />
                <Row>
                    <Col className="text-center text-muted">
                        <small>2023 Funiro. All rights reserved</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
