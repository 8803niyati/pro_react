import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAsync } from "../../Services/Actions/userAction";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isCreated } = useSelector((state) => state.userReducer || {});

  const initialState = {
    email: "",
    password: "",
    cpass: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputForm.password !== inputForm.cpass) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    dispatch(registerAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/signIn");
    }
  }, [isCreated, navigate]);

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={inputForm.email}
            onChange={handleChanged}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={inputForm.password}
            onChange={handleChanged}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            name="cpass"
            value={inputForm.cpass}
            onChange={handleChanged}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit">Sign Up</Button>
        </div>
      </Form>

      <p>
        Already have an account?{" "}
        <Link to="/signIn">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
