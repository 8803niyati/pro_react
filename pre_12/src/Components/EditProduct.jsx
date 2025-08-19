import { Button, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";
import "./AddProduct.css";

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

  // Handle text input change
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChanged = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputForm({ ...inputForm, image: reader.result }); // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Please enter a title.";
    if (!inputForm.desc.trim()) newErrors.desc = "Please enter a description.";
    if (!inputForm.price || Number(inputForm.price) <= 0) {
      newErrors.price = "Please enter a valid price greater than 0.";
    }
    if (!inputForm.category) newErrors.category = "Please select a category.";
    if (!inputForm.image.trim()) newErrors.image = "Please upload an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(updateProductAsync(inputForm));
  };

  // Redirect after update
  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated, navigate]);

  // Load product data into form
  useEffect(() => {
    if (product) {
      setInputForm(product);
    }
  }, [product]);

  // Fetch product by ID
  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <h1>EDIT PRODUCT</h1>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              value={inputForm.title}
              onChange={handleChanged}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="desc"
              placeholder="Enter Description"
              value={inputForm.desc}
              onChange={handleChanged}
              isInvalid={!!errors.desc}
            />
            <Form.Control.Feedback type="invalid">
              {errors.desc}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              value={inputForm.price}
              onChange={handleChanged}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              isInvalid={!!errors.category}
            >
              <option value="">Select Category</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Candies & Gums">Candies & Gums</option>
              <option value="Snacks & Munchies">Snacks & Munchies</option>
              <option value="Dairy & Bread">Dairy & Bread</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Image Upload + Preview */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Image</Form.Label>
            <Col sm="10">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChanged}
              />
              {/* Preview current or newly selected image */}
              {inputForm.image && (
                <div className="mt-2">
                  <img
                    src={inputForm.image}
                    alt="Preview"
                    style={{
                      width: "120px",
                      height: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ccc"
                    }}
                  />
                </div>
              )}
              {errors.image && (
                <div style={{ color: "red", fontSize: "0.9rem" }}>
                  {errors.image}
                </div>
              )}
            </Col>
          </Form.Group>

          {/* Submit */}
          <Button type="submit" variant="dark" className="w-100">
            Update Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
