import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">PRODUCT LISTING</h2>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {products.map((prod) => (
            <Col key={prod.id} md={3} sm={6} xs={12}>
              <Card className="product-card">
                <Card.Img
                  variant="top"
                  src={prod.image}
                  className="product-img"
                />
               <Card.Body className="p-2 text-center">
  <Card.Title className="product-title">{prod.title}</Card.Title>
  <p className="product-description mb-1">{prod.description}</p>
  <p className="product-category mb-2">{prod.category}</p>
  <p className="mb-2 product-price">₹{prod.price}</p>
  
  <div className="card-buttons">
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
      )}
    </Container>
  );
};

export default Home;
