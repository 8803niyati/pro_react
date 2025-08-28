import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../Services/Actions/productAction";
import { IoBagAdd } from "react-icons/io5";
import "./ProductForm.css";

const AddProduct = () => {
  const { isCreated, isError } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    category: "",
    price: "",
    brand: "",
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
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Please select a category";
    if (!inputForm.price || isNaN(inputForm.price))
      newErrors.price = "Valid price is required";
    if (!inputForm.brand.trim()) newErrors.brand = "Brand is required";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const id = generateUniqueId({ length: 6, useLetters: false });
    inputForm.id = id;

    dispatch(addProductAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated]);

  return (
    <Container className="product-form-container">
      <div className="product-form-card">
        <h1>Add New Product</h1>
        {isError ? <p className="text-danger">{isError}</p> : ""}
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

          {/* Category */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Category</Form.Label>
            <Col sm="6">
              <Form.Select
                aria-label="Select Category"
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!errors.category}
              >
                <option>Select Category</option>
                <option value="Makeup">Makeup</option>
                <option value="Skin">Skin</option>
                <option value="Hair">Hair</option>
                <option value="Health & wellness">Health & wellness</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
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

          {/* Brand */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Brand</Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                name="brand"
                value={inputForm.brand}
                onChange={handleChanged}
                isInvalid={!!errors.brand}
              />
              <Form.Control.Feedback type="invalid">
                {errors.brand}
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

          <Button
            type="submit"
            variant="dark"
            className="w-90 d-flex align-items-center justify-content-center gap-2"
          >
            <IoBagAdd size={20} />
            Add Product
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddProduct;
