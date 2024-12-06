import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import {
  addToCart,
  removeFromCart,
  calculateTotals,
} from "../actions/cartActions";

const CartScreen = ({ match, location }) => {
  const history = useHistory();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    dispatch(calculateTotals());
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=/shipping");
  };

  return (
    <div className="container">
      <h2 className="sub-heading">Shopping Cart</h2>
      <Row>
        <Col xs={12}>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is empty <Link to="/">Back To Shopping</Link>
            </Message>
          ) : (
            <>
              <Card className="box mb-4">
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product} className="px-3">
                      <Row className="align-items-center">
                        <Col xs={3} md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col xs={9} md={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={4} md={2} className="text-center mt-3 mt-md-0">
                          ${item.price}
                        </Col>
                        <Col xs={4} md={2} className="mt-3 mt-md-0">
                          <Form.Control
                            as="select"
                            size="sm"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value)),
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col xs={4} md={2} className="text-center mt-3 mt-md-0">
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>

              <Card className="box">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="px-0 pt-0">
                      <h3>Order Summary</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <Row>
                        <Col>
                          Items (
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}):
                        </Col>
                        <Col className="text-right">${itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <Row>
                        <Col>Shipping:</Col>
                        <Col className="text-right">${shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <Row>
                        <Col>Tax (10%):</Col>
                        <Col className="text-right">${taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <Row>
                        <Col>
                          <strong>Total:</strong>
                        </Col>
                        <Col className="text-right">
                          <strong>${totalPrice}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 pb-0">
                      <Button
                        type="button"
                        className="btn-block"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        Proceed To Checkout
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
