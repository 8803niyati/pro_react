import { useState } from "react";
import { Row, Col, Form, InputGroup, Button, Modal } from "react-bootstrap";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "../Components/Auth/SignIn"; 
import SignUp from "../Components/Auth/SignUp"; 
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Modal & toggle state
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true); // true → Sign In, false → Sign Up

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleClear = () => {
    setSearch("");
    navigate("/");
  };

  const openSignInModal = () => {
    setIsSignIn(true); // default Sign In form
    setShowModal(true);
  };

  const toggleForm = () => setIsSignIn((prev) => !prev);

  return (
    <>
      <header className="custom-header shadow-sm fixed-top bg-white mb-0">
        <div className="w-100 px-4 py-2">
          <Row className="align-items-center g-3">
            {/* Left: Logo */}
            <Col md={3} xs={6}>
              <Link to="/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dt8kGyPvKdA4BWE0rExe88EqjnQahnkLQQ&s"
                  alt="Logo"
                  style={{ height: "60px" }}
                />
              </Link>
            </Col>

            {/* Middle: Search Bar */}
            <Col md={5} className="d-none d-md-block">
              <form onSubmit={handleSearch}>
                <InputGroup className="search-bar">
                  <InputGroup.Text className="bg-white border-end-0">
                    <IoSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    className="border-start-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <InputGroup.Text
                      className="bg-white border-start-0"
                      onClick={handleClear}
                      style={{ cursor: "pointer" }}
                    >
                      <IoCloseCircle className="text-secondary" />
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </form>
            </Col>

            {/* Right: Login & Add Product */}
            <Col
              md={4}
              xs={6}
              className="d-flex justify-content-end align-items-center gap-2"
            >
              <Button
                variant="outline-dark"
                className="rounded-pill px-3 py-2"
                onClick={openSignInModal}
              >
                Sign In
              </Button>
              <Link
                to="/add-product"
                className="btn btn-pink rounded-pill px-3 py-2"
              >
                + Add Product
              </Link>
            </Col>
          </Row>
        </div>
      </header>

      {/* Sign In / Sign Up Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>{isSignIn ? "Sign In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignIn ? <SignIn /> : <SignUp />}
          <div className="text-center mt-3">
            {isSignIn ? (
              <p>
                Don’t have an account?{" "}
                <Button variant="link" onClick={toggleForm} style={{ padding: 0 }}>
                  Sign Up
                </Button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Button variant="link" onClick={toggleForm} style={{ padding: 0 }}>
                  Sign In
                </Button>
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
