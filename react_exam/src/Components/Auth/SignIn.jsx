import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";


const SignIn = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { user, error } = useSelector(state => state.userReducer || {});

  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  // Handle form input change
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInAsync(inputForm));
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    dispatch(signInWithGoogleAsync());
  };

  // On login success
  useEffect(() => {
    if (user) {
      if (onLoginSuccess) onLoginSuccess(); // modal close + redirect home
    }
  }, [user, onLoginSuccess]);

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Email</Form.Label>
          <Col sm="9">
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
          <Form.Label column sm="3">Password</Form.Label>
          <Col sm="9">
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

        <Button type="submit" className="w-100 mb-3">
          Sign In
        </Button>
      </Form>

      <Button onClick={handleGoogleLogin} className="w-100 mb-3" variant="outline-danger">
        <FaGoogle className="me-2" /> Sign In with Google
      </Button>
    </div>
  );
};

export default SignIn;
