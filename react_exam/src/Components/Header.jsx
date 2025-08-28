// import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import { IoSearch, IoCloseCircle } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logOutAsync } from "../Services/Actions/userAction";
// import "./Header.css";

// const Header = () => {
  
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.userReducer);
//   const handleLogOut = () => {
//     dispatch(logOutAsync());
//   }

//   return (
//     <header className="custom-header shadow-sm fixed-top bg-white mb-0 ">
//       <div className="w-100 px-4 py-2">
//         <Row className="align-items-center g-3">
         
//           <Col md={4} className="d-flex align-items-center gap-3 ">
//             <Link to="/">
//               <img
//                 src={logo}
//                 alt="Blinkit Logo"
//                 className="logo-img"
//                 style={{ height: "40px" }}
//               />
//             </Link>
//             <div className="vertical-divider" />
//             <div>
//               <div style={{ fontWeight: "bold", fontSize: "19px" }}>
//                 Delivery in 11 minutes
//               </div>
//               <div style={{ fontSize: "16px", color: "gray", marginTop: "2px" }}>
//                 Surat, Gujarat, India
//               </div>
//             </div>
//           </Col>
//           <Col md={2}>
//         </Col>
//           <Col md={5} className="d-flex justify-content-end align-items-center gap-3">
//              <Link
//               to="/add-product"
//               className="btn btn-success rounded-pill px-3 py-2">
//               + Add Products
//             </Link>
//          {
//             user ? <>
//             <span className="me-2">{user.email}</span> <Button onClick={handleLogOut}>LogOut</Button>
//             </>
//             :
//             <Link className="btn btn-danger" to={"/signIn"}>
//             login
//           </Link>
//           }
//           </Col>
//         </Row>
//       </div>
//     </header>
//   );
// };

// export default Header;
import { Row, Col, Form, InputGroup } from "react-bootstrap";
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
    <header className="custom-header shadow-sm fixed-top bg-white mb-0 ">
      <div className="w-100 px-4 py-2">
        <Row className="align-items-center g-3">
          {/* Logo + Location */}
          <Col md={4} className="d-flex align-items-center gap-3 ">
            <Link to="/">
              <img src={logo} alt="Blinkit Logo" className="logo-img" style={{ height: "40px" }} />
            </Link>
             <div className="vertical-divider" />
            <div>
         <div style={{ fontWeight: "bold", fontSize: "19px" }}>Delivery in 11 minutes</div>
                <div style={{ fontSize: "16px", color: "gray", marginTop: "2px" }}>Surat, Gujarat, India</div>
        </div>
            
          </Col>

          {/* Search bar */}
          <Col md={5}>
            <form onSubmit={handleSearch}>
              <InputGroup className="search-bar">
                <InputGroup.Text className="bg-white border-end-0">
                  <IoSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by title, price or desc"
                  className="border-start-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <InputGroup.Text className="bg-white border-start-0" onClick={handleClear} style={{ cursor: "pointer" }}>
                    <IoCloseCircle className="text-secondary" />
                  </InputGroup.Text>
                )}
              </InputGroup>
            </form>
          </Col>

          {/* Login + Add Products */}
          <Col md={3} className="d-flex justify-content-end align-items-center gap-1">
            <Link to="/profile" className="login-text text-dark text-decoration-none fw-semibold">
              Login
            </Link>
            <Link to="/add-product" className="btn btn-success rounded-pill px-3 py-2 ms-5">
             + Add Products
            </Link>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default Header;