import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import logo from "../assets/logo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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

  return (
    <header className="custom-header border-bottom">
      <Container fluid>
        <Row className="align-items-center py-2">
          <Col md={4} className="d-flex align-items-center">
            <Link to="/">
              <img src={logo} alt="Blinkit Logo" className="logo-img" />
            </Link>
            <div className="vertical-line mx-3" />
            <div className="delivery-location">
              <div className="delivery-text">
                <span className="delivery-bold">
                  Delivery in <strong className="fw-bold">11</strong>
                </span>
                <span className="delivery-mins fw-bold"> minutes</span>
              </div>
              <div className="location-text">
                Surat, Gujarat, India <IoMdArrowDropdown className="fs-4 mb-1" />
              </div>
            </div>
          </Col>

          <Col md={5}>
            <form onSubmit={handleSearch}>
              <InputGroup className="search-group" style={{ background: '#f8f8f8' }}>
                <InputGroup.Text
                  className="bg-transparent border-0 input-group-icon"
                  onClick={handleSearch}
                >
                  <IoSearch className="search-icon" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by title, price or desc"
                  className="border-0 ps-0 search-input"
                  style={{ background: '#f8f8f8' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroup.Text
                  className="bg-transparent border-0 input-group-icon"
                  onClick={handleClear}
                >
                  <IoCloseCircle className="clear-icon" />
                </InputGroup.Text>
              </InputGroup>
            </form>
          </Col>

          <Col md={3}>
            <div className="d-flex justify-content-between align-items-center w-100">
              <Link to="/profile" className="login-text">Login</Link>
              <Link to="/add-product" className="add-products-btn">Add Products</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
