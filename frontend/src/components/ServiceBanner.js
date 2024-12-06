import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ServiceBanner = () => {
  return (
    <Card
      className="box service-box-wrap mb-3"
      style={{
        backgroundColor: "#f8f9fa", // 浅灰背景色
        padding: "15px", // 减少内边距
        marginTop: "20px",
      }}
    >
      <Row>
        <Col lg={6} xs={6}>
          <div className="service-box" style={{ textAlign: "center" }}>
            <i
              className="fas fa-headset"
              style={{
                color: "#4a90e2", // 蓝色图标
                fontSize: "24px", // 减小图标大小
                marginBottom: "8px",
              }}
            ></i>
            <h5 style={{ color: "#2c3e50" }}>24/7 Support</h5>{" "}
            {/* 使用h5替代h4 */}
          </div>
        </Col>
        <Col lg={6} xs={6}>
          <div className="service-box" style={{ textAlign: "center" }}>
            <i
              className="fas fa-award"
              style={{
                color: "#4a90e2", // 蓝色图标
                fontSize: "24px", // 减小图标大小
                marginBottom: "8px",
              }}
            ></i>
            <h5 style={{ color: "#2c3e50" }}>Best Products</h5>{" "}
            {/* 使用h5替代h4 */}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ServiceBanner;
