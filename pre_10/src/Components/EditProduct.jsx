import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const initialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  // Validation Function
  const validateForm = () => {
    let newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price || inputForm.price <= 0) newErrors.price = "Enter a valid price";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Please select a category";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateProductAsync(inputForm));
    }
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated]);

  useEffect(() => {
    if (product) {
      setInputForm(product);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id]);

  return (
    <>
      <Container>
        <h1>Edit Product</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Title</Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Description */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Description</Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                isInvalid={!!errors.desc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.desc}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Price */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Price</Form.Label>
            <Col sm="6">
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Category */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Category</Form.Label>
            <Col sm="6">
              <Form.Select
                aria-label="Default select example"
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!errors.category}
              >
                <option>Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Appliances">Appliances</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Image */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Image</Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Button type="submit">Update Product</Button>
        </Form>
      </Container>
    </>
  );
};

export default EditProduct;
