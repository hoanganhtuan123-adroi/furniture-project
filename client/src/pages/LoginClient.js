import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    Alert,
} from "react-bootstrap";
import { FaCrow } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginApi } from "../services/apiAuth";
import { toast } from "react-toastify";
import { login } from "../redux/actions/actionLogin";
const LoginClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password };
            const response = await loginApi(data);
            console.log(response);
            if (response) {
                toast.success(response.message);
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                );
                await dispatch(login(response.data));
                navigate("/");
            } else {
                toast.error(response);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container
            fluid
            className="min-vh-100 d-flex justify-content-center align-items-center p-0"
        >
            <Row className="w-100 m-0">
                <Col
                    xs={12}
                    md={6}
                    className="p-4 d-flex flex-column justify-content-center align-items-center"
                >
                    <div className="d-flex flex-row align-items-center mb-4">
                        <FaCrow size={32} color="#709085" className="me-3" />
                        <span className="h3 fw-bold mb-0">Logo</span>
                    </div>

                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <h3
                            className="fw-normal mb-3 ps-3 pb-3 text-center"
                            style={{ letterSpacing: "1px" }}
                        >
                            Log in
                        </h3>

                        <Form>
                            {error && (
                                <Alert variant="danger" className="mx-3">
                                    {error}
                                </Alert>
                            )}
                            <Form.Group
                                className="mb-3 mx-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="lg"
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 mx-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    size="lg"
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <Button
                                className="mb-4 px-5 mx-3 w-100"
                                variant="info"
                                size="lg"
                                type="submit"
                                disabled={loading}
                                onClick={handleLogin}
                            >
                                {loading ? "Đang đăng nhập..." : "Login"}
                            </Button>
                            <p className="small mb-4 pb-lg-2 ms-3 text-center">
                                <a href="#!" className="text-muted">
                                    Forgot password?
                                </a>
                            </p>
                            <p className="ms-3 text-center">
                                Don't have an account?{" "}
                                <Link to="/register" className="link-info">
                                    Register here
                                </Link>
                            </p>
                        </Form>
                    </div>
                </Col>

                <Col
                    xs={12}
                    md={6}
                    className="d-none d-md-block p-0"
                    style={{ maxHeight: "100vh" }}
                >
                    <Image
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Login image"
                        fluid
                        style={{
                            objectFit: "cover",
                            objectPosition: "left",
                            height: "100%",
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginClient;
