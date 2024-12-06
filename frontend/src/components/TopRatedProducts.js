import React, { useEffect, useState } from "react"; // 添加 useState
import {
  Row,
  Col,
  Card,
  Image,
  Badge,
  Button,
  Carousel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const TopRatedProducts = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const [index, setIndex] = useState(0); // 添加状态来追踪当前页

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const carouselStyles = {
    container: {
      marginBottom: "2rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative", // 添加相对定位
    },
    carousel: {
      backgroundColor: "#fff3e6",
    },
    carouselItem: {
      padding: "20px",
    },
    badge: {
      position: "absolute",
      top: "20px",
      left: "20px",
      backgroundColor: "#ff6b6b",
      padding: "8px 15px",
      fontSize: "0.9rem",
      zIndex: 2,
    },
    imageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "400px",
      overflow: "hidden",
    },
    image: {
      maxHeight: "100%",
      objectFit: "contain",
      transition: "transform 0.3s ease",
    },
    productInfo: {
      padding: "20px",
      backgroundColor: "rgba(255,255,255,0.95)",
    },
    productName: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "15px",
      color: "#2d3436",
    },
    price: {
      fontSize: "1.3rem",
      color: "#2ecc71",
      fontWeight: "600",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#0984e3",
      border: "none",
      padding: "10px 20px",
      transition: "all 0.3s ease",
    },
    // 添加页数指示器样式
    pageIndicator: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "15px",
      zIndex: 3,
      fontSize: "0.9rem",
    },
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div style={carouselStyles.container}>
      {/* 添加页数指示器 */}
      <div style={carouselStyles.pageIndicator}>
        {index + 1} / {products.length}
      </div>

      <Carousel
        style={carouselStyles.carousel}
        interval={5000}
        activeIndex={index}
        onSelect={handleSelect}
        indicators={true}
        controls={true}
      >
        {products.map((product, idx) => (
          <Carousel.Item key={product._id} style={carouselStyles.carouselItem}>
            <Badge
              pill
              className="position-absolute"
              style={carouselStyles.badge}
            >
              Featured
            </Badge>
            <Row>
              <Col md={7}>
                <div style={carouselStyles.imageContainer}>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      fluid
                      style={carouselStyles.image}
                      className="hover-zoom"
                    />
                  </Link>
                </div>
              </Col>
              <Col md={5}>
                <div style={carouselStyles.productInfo}>
                  <h3 style={carouselStyles.productName}>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-decoration-none"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mb-3">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} Reviews`}
                    />
                  </div>
                  <h4 style={carouselStyles.price}>${product.price}</h4>
                  <Link to={`/product/${product._id}`}>
                    <Button
                      variant="primary"
                      className="w-100"
                      style={carouselStyles.button}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      View Details
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

const style = document.createElement("style");
style.textContent = `
  /* ... 其他样式保持不变 */

  .carousel-control-prev,
  .carousel-control-next {
    width: 50px !important;
    height: 50px !important;
    background: white !important;
    border-radius: 50% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    opacity: 0.9 !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
    margin: 0 20px !important;
  }

  .carousel-control-prev:hover,
  .carousel-control-next:hover {
    opacity: 1 !important;
    background: #f8f9fa !important;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(1) grayscale(100);
  }
`;

export default TopRatedProducts;
