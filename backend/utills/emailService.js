import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "flsyyt123654@gmail.com",
    pass: "cvnp jxjn moiz pkph",
  },
});

const sendOrderConfirmationEmail = async (order) => {
  try {
    console.log("Preparing to send email to:", order.user.email);

    const orderItemsHtml = order.orderItems
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>$${item.price}</td>
          <td>$${item.qty * item.price}</td>
        </tr>
      `,
      )
      .join("");

    const mailOptions = {
      from: `"Shop Box" <${process.env.EMAIL_USER}>`,
      to: order.user.email,
      subject: `Order Confirmation - Order ${order._id}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order ${order._id} has been confirmed and paid.</p>

        <h2>Order Details:</h2>
        <table border="1" cellpadding="10" cellspacing="0">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
          ${orderItemsHtml}
        </table>

        <h3>Order Summary:</h3>
        <p>Subtotal: $${order.totalPrice - order.taxPrice - order.shippingPrice}</p>
        <p>Tax: $${order.taxPrice}</p>
        <p>Shipping: $${order.shippingPrice}</p>
        <p><strong>Total: $${order.totalPrice}</strong></p>

        <h3>Shipping Address:</h3>
        <p>
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city}<br>
          ${order.shippingAddress.postalCode}<br>
          ${order.shippingAddress.country}
        </p>

        <p>Thank you for shopping with us!</p>
      `,
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};

// 启动时验证连接
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP server connection error:", error);
  } else {
    console.log("SMTP server connection successful");
  }
});

export { sendOrderConfirmationEmail };
