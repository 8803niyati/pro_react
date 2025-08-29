import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isCreated } = useSelector((state) => state.userReducer || {});

  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
    cpass: "",
  });

  // Handle input changes
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputForm.password !== inputForm.cpass) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    dispatch(registerAsync({ email: inputForm.email, password: inputForm.password }));
  };

  // Redirect on successful signup
  useEffect(() => {
    if (isCreated) {
      navigate("/signIn"); // ✅ Redirect to Sign In
    }
  }, [isCreated, navigate]);

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">Sign Up</h2>
      {error && <p className="error-message text-danger">{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">Email</Form.Label>
          <Col sm="8">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={inputForm.email}
              onChange={handleChanged}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">Password</Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={inputForm.password}
              onChange={handleChanged}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">Confirm Password</Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="cpass"
              value={inputForm.cpass}
              onChange={handleChanged}
              required
            />
          </Col>
        </Form.Group>

        <Button type="submit" className="w-100 mb-3">Sign Up</Button>
      </Form>

      
    </div>
  );
};

export default SignUp;
