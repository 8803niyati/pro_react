import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NykaaSection from "../Components/NykaaSection";
import {
  deleteProductAsync,
  getAllProductAsync,
} from "../Services/Actions/productAction";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading } = useSelector(
    (state) => state.productReducer
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  // Filter & search
  let filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? prod.category?.toLowerCase() === categoryFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sortOption === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "titleAZ") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "titleZA") {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Pagination logic
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setCurrentPage(0); // reset page when filters/search/sort change
  }, [searchTerm, categoryFilter, sortOption]);

  const categories = [
    ...new Set(products.map((prod) => prod.category).filter(Boolean)),
  ];

  return (
    <>
      <NykaaSection />

      <Container className="my-4">
        <h2 className="mb-4 text-center">PRODUCT LISTING</h2>

        {/* Search, Filter, Sort */}
        <Row className="mb-4 g-2 align-items-center">
          <Col md={4}>
            <InputGroup>
              <Form.Control
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col md={4}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="titleAZ">Title: A → Z</option>
              <option value="titleZA">Title: Z → A</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Product Cards */}
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          <>
            <Row className="g-4">
              {currentProducts.map((prod) => (
                <Col key={prod.id} md={3} sm={6} xs={12}>
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={prod.image}
                      className="product-img"
                    />
                    <Card.Body className="p-2 text-center">
                      <Card.Title className="product-title">
                        {prod.title}
                      </Card.Title>
                      <p className="product-description mb-1">
                        {prod.description}
                      </p>
                      <p className="product-category mb-2">{prod.category}</p>
                      <p className="mb-2 product-price">₹{prod.price}</p>
                      <div className="card-buttons d-flex justify-content-between">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleEdit(prod.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(prod.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                forcePage={currentPage}
              />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
