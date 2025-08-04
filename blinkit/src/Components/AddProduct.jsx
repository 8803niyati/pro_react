import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
import { addProduct } from "../Services/Actions/productAction";
import "./ProductForm.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    setInputForm({ ...inputForm, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Please enter a title.";
    if (!inputForm.desc.trim()) newErrors.desc = "Please enter a description.";
    if (!inputForm.price) newErrors.price = "Please enter a price.";
    if (!inputForm.category) newErrors.category = "Please select a category.";
    if (!inputForm.image.trim()) newErrors.image = "Please enter an image URL.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    let id = generateUniqueId({ length: 6, useLetters: false });
    inputForm.id = id;
    dispatch(addProduct(inputForm));
      navigate("/");
  };

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <h1>ADD PRODUCT</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              value={inputForm.title}
              onChange={handleChanged}
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="desc"
              placeholder="Enter Description"
              value={inputForm.desc}
              onChange={handleChanged}
            />
            {errors.desc && <div className="form-error">{errors.desc}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              value={inputForm.price}
              onChange={handleChanged}
            />
            {errors.price && <div className="form-error">{errors.price}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
            >
              <option value="">Select Category</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Candies & Gums">Candies & Gums</option>
              <option value="Rolling paper & tobacco">Rolling paper & tobacco</option>
              <option value="Dairy & Bread">Dairy & Bread</option>
            </Form.Select>
            {errors.category && <div className="form-error">{errors.category}</div>}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Enter Image URL"
              value={inputForm.image}
              onChange={handleChanged}
            />
            {errors.image && <div className="form-error">{errors.image}</div>}
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;