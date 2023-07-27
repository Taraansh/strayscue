import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Form,
  Row,
  FloatingLabel,
  Modal,
  InputGroup,
} from "react-bootstrap";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [smShow, setSmShow] = useState(false);

  let { user, loginUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      navigate("/Dashboard"); // Redirect to the dashboard if user is already logged in
    }
  }, [user, navigate]);

  return (
    <div>
      <Container
        style={{
          minHeight: "100vh",
          minWidth: "100%",
          display: "flex",
          backgroundImage:
            "linear-gradient(45deg, rgb(50, 143, 138), rgb(245, 145, 32))",
        }}
      >
        {" "}
        <Card
          style={{
            border: "1px solid",
            width: "25rem",
            margin: "auto",
            padding: "1rem 1.5rem 0 1.5rem",
          }}
        >
          <Card.Img
            variant="top"
            style={{ margin: "auto", width: "50%" }}
            src={logo}
          />
          <Form noValidate onSubmit={loginUser}>
            <Card.Body>
              <Card.Title className="mb-3 text-center">
                <h2 className="mb-3" style={{ fontWeight: "bold" }}>
                  Strayscue
                </h2>
              </Card.Title>

              <Row>
                <InputGroup style={{ padding: "0" }}>
                  <FloatingLabel label="Login ID" className="mb-3">
                    <Form.Control
                      style={{
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                      }}
                      type="email"
                      placeholder="name@example.com"
                      required
                      id="email"
                      name="email"
                      autoComplete="email"
                    />
                    <Form.Control.Feedback type="invalid">
                      Login ID is required
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <i
                    style={{
                      position: "absolute",
                      top: "20px",
                      fontSize: "1rem",
                      right: "31px",
                      zIndex: "99999",
                    }}
                    className="fa-solid fa-envelope"
                  ></i>
                </InputGroup>
              </Row>

              <Row className="mb-3">
                <InputGroup style={{ padding: "0" }}>
                  <FloatingLabel label="Password">
                    <Form.Control
                      style={{
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                      }}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      id="current-password"
                      name="password"
                      autoComplete="current-password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Password is required
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <i
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "16px",
                      right: "31px",
                      fontSize: "1rem",
                      zIndex: "99999",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </i>
                </InputGroup>
              </Row>

              <div
                style={{
                  display: "flex",
                  padding: "1rem 0",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  className=" btn btn-light"
                  onClick={() => setSmShow(true)}
                >
                  Forgot Password?
                </Button>
                <Button
                  className="btn-block"
                  style={{ background: "rgb(245, 145, 32)", border: "none" }}
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </Card.Body>
          </Form>
        </Card>
        <Modal
        style={{zIndex:"999999999999"}}
          className="bottom-modal"
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Body>
              <div>
                <span><i
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    color: "#ffffff",
                  }}
                  className="fa-solid fa-circle-exclamation"
                ></i></span>
                <span> Contact Your Admin</span>
               
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </Container>
    </div>
  );
};

export default Login;
