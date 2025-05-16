Online Computer Store
A dynamic e-commerce platform built with modern web technologies, combining a user-friendly online computer store with an efficient inventory tracking system.

📋 Project Overview
This project is a comprehensive web application that provides a powerful online computer store integrated with an efficient inventory tracking system. It features a dynamic platform where users can seamlessly browse, search, and view products, while the backend functionality ensures accurate inventory management. The system provides a streamlined interface for secure login, intuitive browsing, and simulated checkout processes.
🎯 Key Features

User-centric Interface: Intuitive browsing and shopping experience
Advanced Search: Efficient filtering and sorting mechanisms
Real-time Stock Monitoring: Accurate inventory tracking
Secure Authentication: Protected user accounts and checkout simulation
Responsive Design: Consistent experience across all devices

🛠️ Tech Stack

Frontend: React.js, Redux, React-Bootstrap
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Payment Integration: PayPal API (simulation)
Email Service: Nodemailer with Gmail API
Version Control: Git (GitHub)

🏗️ System Architecture
The application follows a modern architecture with separated frontend and backend:

Frontend: React components for UI rendering and Redux for state management
Backend: RESTful API built with Express.js
Database: MongoDB document model for flexible schema design
Authentication Layer: JWT token-based security

🖥️ Screenshots
Product Catalog
Show Image
Product Details
Show Image
Shopping Cart
Show Image
Checkout Process
Show Image
Admin Stock Management
Show Image
⚙️ Installation
bash# Clone the repository
git clone https://github.com/yourusername/online-computer-store.git
cd online-computer-store

# Install dependencies for backend
npm install

# Install dependencies for frontend
cd frontend
npm install
cd ..

# Set environment variables
# Create a .env file in the root directory with the following variables:
# NODE_ENV=development
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PAYPAL_CLIENT_ID=your_paypal_client_id

# Run both frontend and backend concurrently
npm run dev
🚀 Usage
Customer Features

Browse and search for computer products
Filter by type, price, and customer ratings
View detailed product information and reviews
Add items to shopping cart
Simulated checkout process with PayPal integration
Receive order confirmation emails

Admin Features

Manage product catalog (CRUD operations)
Monitor and update inventory levels
View and manage customer orders
Access stock tracking analytics

👥 Team Members

Bowen Gao (bgao57@uwo.ca)
Jinnan Hu (jhu625@uwo.ca)
Kai Wu (kwu387@uwo.ca)

🔜 Future Enhancements

Multi-language Support: Interface localization for global users
Personalized Recommendation System: ML-based product suggestions
Advanced Data Analytics: Enhanced inventory forecasting models
Real Payment Gateway Integration: Beyond simulation
Mobile App Development: Native mobile experience
Enhanced Data Visualization: Richer charts and reports for admin
