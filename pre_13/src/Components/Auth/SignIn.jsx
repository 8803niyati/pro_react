import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { signInAsync, signInWithGoogleAsync } from "../../Services/Actions/userAction";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Safe destructuring
  const { user, error } = useSelector((state) => state.userReducer || {});

  const initialState = {
    email: "",
    password: "",
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
    dispatch(signInAsync(inputForm));
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogleAsync());
  };

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="form-container">
       
        <h2 className="mb-4">Sign In</h2>
        

        {error && <p className="error-message">{error}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3" className="form-label">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Email"
                name="email"
                value={inputForm.email}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3" className="form-label">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={inputForm.password}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" className="w-100 custom-btn">
              Sign In
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <Button onClick={handleGoogleLogin} className="google-btn w-100">
          <FaGoogle className="me-2" />  Sign In with Google
          </Button>
        </div>

        <p className="mt-4">
          Don’t have an account? <Link to={"/signUp"}>Sign Up</Link>
        </p>
      </Card>
    </Container>
  );
};

export default SignIn;
