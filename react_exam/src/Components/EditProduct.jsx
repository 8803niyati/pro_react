// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";

// const EditProduct = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { product, isUpdated } = useSelector((state) => state.productReducer);

//   const initialState = {
//     id: "",
//     title: "",
//     desc: "",
//     price: "",
//     category: "",
//     image: "",
//   };

//   const [inputForm, setInputForm] = useState(initialState);
//   const [errors, setErrors] = useState({});

//   const handleChanged = (e) => {
//     const { name, value } = e.target;
//     setInputForm({
//       ...inputForm,
//       [name]: value,
//     });
//   };

//   // Validation Function
//   const validateForm = () => {
//     let newErrors = {};
//     if (!inputForm.title.trim()) newErrors.title = "Title is required";
//     if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
//     if (!inputForm.price || inputForm.price <= 0) newErrors.price = "Enter a valid price";
//     if (!inputForm.category || inputForm.category === "Select Category")
//       newErrors.category = "Please select a category";
//     if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   await dispatch(updateProductAsync({ ...formData, id }));
//   navigate("/"); // Redirect only after update completes
// };

//   useEffect(() => {
//     if (isUpdated) {
//       navigate("/");
//     }
//   }, [isUpdated]);

//   useEffect(() => {
//     if (product) {
//       setInputForm(product);
//     }
//   }, [product]);

//   useEffect(() => {
//     if (id) {
//       dispatch(getProductAsync(id));
//     }
//   }, [id]);

//   return (
//     <>
//       <Container>
//         <h1>Edit Product</h1>
//         <Form className="mt-4" onSubmit={handleSubmit}>
//           {/* Title */}
//           <Form.Group as={Row} className="mb-3">
//             <Form.Label column sm="2">Title</Form.Label>
//             <Col sm="6">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Title"
//                 name="title"
//                 value={inputForm.title}
//                 onChange={handleChanged}
//                 isInvalid={!!errors.title}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.title}
//               </Form.Control.Feedback>
//             </Col>
//           </Form.Group>

//           {/* Description */}
//           <Form.Group as={Row} className="mb-3">
//             <Form.Label column sm="2">Description</Form.Label>
//             <Col sm="6">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Description"
//                 name="desc"
//                 value={inputForm.desc}
//                 onChange={handleChanged}
//                 isInvalid={!!errors.desc}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.desc}
//               </Form.Control.Feedback>
//             </Col>
//           </Form.Group>

//           {/* Price */}
//           <Form.Group as={Row} className="mb-3">
//             <Form.Label column sm="2">Price</Form.Label>
//             <Col sm="6">
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Price"
//                 name="price"
//                 value={inputForm.price}
//                 onChange={handleChanged}
//                 isInvalid={!!errors.price}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.price}
//               </Form.Control.Feedback>
//             </Col>
//           </Form.Group>

//           {/* Category */}
//           <Form.Group as={Row} className="mb-3">
//             <Form.Label column sm="2">Category</Form.Label>
//             <Col sm="6">
//               <Form.Select
//                 aria-label="Default select example"
//                 name="category"
//                 value={inputForm.category}
//                 onChange={handleChanged}
//                 isInvalid={!!errors.category}
//               >
//                 <option>Select Category</option>
//                 <option value="Makeup">Makeup</option>
//                 <option value="Skin">Skin</option>
//                 <option value="Hair">Hair</option>
//                 <option value="Health & wellness">Health & wellness</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.category}
//               </Form.Control.Feedback>
//             </Col>
//           </Form.Group>

//           {/* Image */}
//           <Form.Group as={Row} className="mb-3">
//             <Form.Label column sm="2">Image</Form.Label>
//             <Col sm="6">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Image URL"
//                 name="image"
//                 value={inputForm.image}
//                 onChange={handleChanged}
//                 isInvalid={!!errors.image}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.image}
//               </Form.Control.Feedback>
//             </Col>
//           </Form.Group>

//           <Button type="submit">Update Product</Button>
//         </Form>
//       </Container>
//     </>
//   );
// };

// export default EditProduct;

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";
import "./ProductForm.css";

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

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setInputForm(product);
    }
  }, [product]);


  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated, navigate]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price) newErrors.price = "Price is required";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Please select a valid category";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(updateProductAsync(inputForm));

  };

  return (
    <Container className="edit-product-container">
      <h1 className="edit-product-title">Edit Product</h1>

      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Title</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Title"
              name="title"
              value={inputForm.title}
              onChange={handleChanged}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Description</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
              isInvalid={!!errors.desc}
            />
            <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              placeholder="Enter Price"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="10">
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              isInvalid={!!errors.category}
            >
              <option>Select Category</option>
              <option value="Fresh Vegetables">Fresh Vegetables</option>
              <option value="Fresh Fruits">Fresh Fruits</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Dairy, Bread & Eggs">Dairy, Bread & Eggs</option>
              <option value="Snacks & Munchies">Snacks & Munchies</option>
              <option value="Ice Creams & Frozen Desserts">Ice Creams & Frozen Desserts</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Image</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              name="image"
              value={inputForm.image}
              onChange={handleChanged}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">
            <FaCheck /> Update Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditProduct;