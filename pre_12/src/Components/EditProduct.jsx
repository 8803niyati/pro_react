import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";
import { uploadImage } from "../Services/imageUpload";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const intialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(intialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(inputForm));
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
    <Container>
      <h1>Edit Product</h1>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Title</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="Enter Title"
              name="title"
              value={inputForm.title}
              onChange={handleChanged}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Description</Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              placeholder="Enter Price"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="6">
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
            >
             <option>Select Category</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Candies & Gums">Candies & Gums</option>
              <option value="Rolling paper & tobacco">Rolling paper & tobacco</option>
              <option value="Dairy & Bread">Dairy & Bread</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Image</Form.Label>
          <Col sm="6">
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

        <Button type="submit">Update Product</Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
