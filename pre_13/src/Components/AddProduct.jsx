import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../Services/Actions/productAction";
import { uploadImage } from "../Services/imageUpload";
import { IoBagAdd } from "react-icons/io5";
import "./AddProduct.css";

const AddProduct = () => {
  const { isCreated, isError } = useSelector((state) => state.productReducer);
   const { user } = useSelector(state => state.userReducer);
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
    setInputForm({
      ...inputForm,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChanged = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePath = await uploadImage(file);
      setInputForm({
        ...inputForm,
        image: imagePath,
      });
      setErrors({
        ...errors,
        image: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price || isNaN(inputForm.price))
      newErrors.price = "Valid price is required";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Please select a category";
    if (!inputForm.image.trim()) newErrors.image = "Image is required";
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
  
  useEffect(()=> {
    if(!user){
      navigate("/signIn")
    }
  }, [user]);

  return (
<div className="product-form-container">
      <div className="product-form-card">
        <h1>ADD NEW PRODUCT</h1>
        {isError && (
          <div
            className="form-error"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: "20px 0",
              color: "red",
            }}
          >
            {isError}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              value={inputForm.price}
              onChange={handleChanged}
              isInvalid={!!errors.price}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) =>
                (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              isInvalid={!!errors.category}
            >
              <option value="">Select Category</option>
              <option value="Cold Drinks & Juices">
                Cold Drinks & Juices
              </option>
              <option value="Candies & Gums">Candies & Gums</option>
              <option value="Snacks & Munchies">Snacks & Munchies</option>
              <option value="Dairy & Bread">Dairy & Bread</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Image</Form.Label>
          <Col sm="12">
            {/* File input for new upload */}
            <Form.Control
              type="file"
              onChange={handleFileChanged}
            />
            {/* Preview of current/new image */}
            {inputForm.image && (
              <div className="mt-2">
                <img
                  src={inputForm.image}
                  alt="Preview"
                  style={{ width: "120px", height: "auto", borderRadius: "8px", border: "1px solid #ccc" }}
                />
              </div>
            )}
          </Col>
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
