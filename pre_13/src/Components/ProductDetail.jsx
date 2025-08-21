import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAsync } from "../Services/Actions/productAction";
import { Spinner, Button, Card } from "react-bootstrap";

import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], isLoading = false } = useSelector(
    (state) => state.productReducer || {}
  );

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(getAllProductAsync());
    }
  }, [dispatch, products.length]);

  const product = products.find((p) => String(p.id) === String(id));

  if (isLoading || !products) {
    return (
      <div className={`${styles.productDetailWrapper} d-flex justify-content-center my-5`}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`${styles.productDetailWrapper} text-center my-5`}>
        <h2>Product not found</h2>
        <Button onClick={() => navigate("/")} className="mt-2">
          Back to products
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.productDetailWrapper}>
      <Card className={styles.productCard}>
        <div className={styles.productDetailLayout}>
          {/* Left side image */}
          <div className={styles.productLeft}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productDetailImg}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/350x350?text=No+Image";
              }}
            />
          </div>

          {/* Right side details */}
          <div className={styles.productRight}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <span className={styles.productCategoryBadge}>{product.category}</span>
            <h3 className={styles.productPrice}>₹{product.price}</h3>
            <p className={styles.productDesc}>{product.desc}</p>

            <div className={styles.actions}>
              <div className={styles.buttonGroup}>
            <Button variant="success">Add to Cart</Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
