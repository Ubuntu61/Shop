import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Image, Badge } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import "./Product.css"; // 创建一个新的CSS文件

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addToCartHandler = () => {
    if (product.countInStock > 0) {
      dispatch(addToCart(product._id, 1));
      history.push(`/cart/${product._id}?qty=1`);
    }
  };

  return (
    <Card className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/product/${product._id}`}>
          <Image src={product.image} fluid className="product-image" />
        </Link>
        {product.countInStock === 0 && (
          <Badge className="out-of-stock-badge">Out of Stock</Badge>
        )}
        {product.discount && (
          <Badge className="discount-badge">-{product.discount}%</Badge>
        )}
        <div className="product-overlay">
          <Button
            variant="light"
            className="quick-view-btn"
            onClick={() => history.push(`/product/${product._id}`)}
          >
            <i className="fas fa-eye"></i> Detailed Information
          </Button>
        </div>
      </div>

      <Card.Body className="product-details">
        <div className="category-tag">{product.category}</div>

        <h3 className="product-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>

        <div className="rating-wrapper">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </div>

        <div className="price-action-wrapper">
          <div className="price-box">
            <span className="current-price">${product.price}</span>
            {product.oldPrice && (
              <span className="old-price">${product.oldPrice}</span>
            )}
          </div>

          <div className="action-buttons">
            <Button
              variant="primary"
              className="cart-btn"
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              <i className="fas fa-shopping-cart"></i>
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
