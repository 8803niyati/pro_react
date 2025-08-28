import { Row, Col, Form, InputGroup } from "react-bootstrap";
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
    <header className="custom-header shadow-sm fixed-top bg-white mb-0">
      <div className="w-100 px-4 py-2">
        <Row className="align-items-center g-3">
          {/* Left: Nykaa Logo */}
          <Col md={3} xs={6} className="d-flex align-items-center">
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dt8kGyPvKdA4BWE0rExe88EqjnQahnkLQQ&s"
                alt="Nykaa Logo"
                className="logo-img"
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
            <Link
              to="/login"
              className="btn btn-outline-dark rounded-pill px-3 py-2"
            >
              Login
            </Link>
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
  );
};

export default Header;
