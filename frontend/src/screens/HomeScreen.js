import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Card, Pagination } from "react-bootstrap";

// add the components
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TopRatedProducts from "../components/TopRatedProducts";
import ServiceBanner from "../components/ServiceBanner";
import NoProductFound from "../components/NoProductFound";
import Meta from "../components/Meta";

// add actions
import { listProducts } from "../actions/productActions";
const HomeScreen = ({ match }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // filter function
  const getFilteredProducts = () => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // 价格筛选
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under50":
          filtered = filtered.filter((product) => product.price < 50);
          break;
        case "50to100":
          filtered = filtered.filter(
            (product) => product.price >= 50 && product.price <= 100,
          );
          break;
        case "over100":
          filtered = filtered.filter((product) => product.price > 100);
          break;
        default:
          break;
      }
    }

    // 评分筛选
    if (ratingFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.rating >= Number(ratingFilter),
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <div className="text-center mb-4">
        <h1
          className="main-title"
          style={{
            color: "#2c3e50",
            fontSize: "2.5rem",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            padding: "20px",
            borderRadius: "10px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            margin: "20px 0",
            color: "white",
          }}
        >
          Welcome to Store
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "normal",
              marginTop: "10px",
              textTransform: "none",
            }}
          >
            You can find best computers and accessories
          </div>
        </h1>
      </div>
      <Meta />
      {!keyword ? (
        <>
          <TopRatedProducts />
        </>
      ) : (
        <Link className="btn btn-primary btn-sm mb-3" to="/">
          <i className="fas fa-home mr-1"></i>
          Home
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="mb-5 container">
            <Row>
              <Col md={12}>
                <h2>
                  {selectedCategory
                    ? `${selectedCategory} Products`
                    : "New Products"}
                </h2>
              </Col>
            </Row>
            <Row>
              {/* 左侧筛选栏 */}
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <h4>Filters</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                        style={{
                          height: '60px', 
                          lineHeight: 'normal', 
                        }}
                      >
                        <option value="">All Categories</option>
                        <option value="desktops">desktops</option>
                        <option value="laptops">laptops</option>
                        <option value="accessories">accessories</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Price Range</Form.Label>
                      <Form.Control
                        as="select"
                        value={priceRange}
                        onChange={(e) => {
                          setPriceRange(e.target.value);
                          setCurrentPage(1);
                        }}
                        style={{
                          height: '60px', 
                          lineHeight: 'normal', 
                        }}
                      >
                        <option value="all">All Prices</option>
                        <option value="under50">Under $50</option>
                        <option value="50to100">$50 - $100</option>
                        <option value="over100">Over $100</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={ratingFilter}
                        onChange={(e) => {
                          setRatingFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        style={{
                          height: '60px', 
                          lineHeight: 'normal', 
                        }}
                      >
                        <option value="all">All Ratings</option>
                        <option value="4">4★ & Above</option>
                        <option value="3">3★ & Above</option>
                        <option value="2">2★ & Above</option>
                      </Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              {/* 右侧商品列表 */}
              <Col md={9}>
                <div>
                  <Row>
                    {filteredProducts.length > 0 ? (
                      filteredProducts
                        .slice(
                          (currentPage - 1) * productsPerPage,
                          currentPage * productsPerPage,
                        )
                        .map((product) => (
                          <Col
                            key={product._id}
                            sm={12}
                            md={6}
                            lg={4}
                            className="mb-4"
                          >
                            <Product product={product} />
                          </Col>
                        ))
                    ) : (
                      <Col md={12}>
                        <NoProductFound />
                      </Col>
                    )}
                  </Row>

                  {/* 分页 */}
                  {filteredProducts.length > productsPerPage && (
                    <Pagination>
                      {Array.from({
                        length: Math.ceil(
                          filteredProducts.length / productsPerPage,
                        ),
                      }).map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
      <ServiceBanner />
    </div>
  );
};

export default HomeScreen;
