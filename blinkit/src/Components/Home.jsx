import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products } = useSelector((state) => state.productReducer);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  const handleEdit = (id) => navigate(`/edit-product/${id}`);
  const handleDelete = (id) => dispatch(deleteProduct(id));

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((prod) =>
      prod.title?.toLowerCase().includes(searchQuery) ||
      prod.desc?.toLowerCase().includes(searchQuery) ||
      prod.category?.toLowerCase().includes(searchQuery) ||
      String(prod.price).includes(searchQuery)
    );
  }, [products, searchQuery]);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">PRODUCT LISTING</h2>
      <Row className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <Col md={3} sm={6} xs={12} key={prod.id}>
              <div className="product-card">
                <img src={prod.image} alt={prod.title} className="product-img" />
                <h5 className="product-title">{prod.title}</h5>
                <div className="product-desc">{prod.desc}</div>
                <div className="product-meta">{prod.category}</div>
                <div className="product-price">₹{prod.price}</div>
                <div className="edit-delete-btns">
                  <Button size="sm" className="edit-btn" onClick={() => handleEdit(prod.id)}>
                    Edit
                  </Button>
                  <Button size="sm" className="delete-btn" onClick={() => handleDelete(prod.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Home;