import { useState } from "react";
import { Row, Col, Form, InputGroup, Button, Modal } from "react-bootstrap";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Services/Actions/userAction";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer || {});

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

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
    setIsSignIn(true);
    setShowModal(true);
  };

  const toggleForm = () => setIsSignIn((prev) => !prev);

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/");
  };

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

                     <Col md={2}>
        </Col>
          <Col md={5} className="d-flex justify-content-end align-items-center gap-3">
             <Link
              to="/add-product"
              className="btn btn-success rounded-pill px-3 py-2">
              + Add Products
            </Link>
         {
            user ? <>
            <span className="me-2">{user.email}</span> <Button onClick={handleLogOut}>LogOut</Button>
            </>
            :
            <Link className="btn btn-danger" to={"/signIn"}>
            login
          </Link>
          }
          </Col>
          </Row>
        </div>
      </header>

      
      
    </>
  );
};

export default Header;
