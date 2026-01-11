# MiniHug - Baby Products & Toys Store 🧸

MiniHug is a full-stack e-commerce web application dedicated to baby essentials and toys. It provides a seamless shopping experience for parents, featuring product browsing, detailed item views, a shopping cart, and a simulated checkout process.

## 🚀 Features

- **User Authentication**: Secure Login and Signup system for users.
- **Product Catalog**: Browse distinct categories for **Baby Products** (Diapers, Bottles, etc.) and **Toys**.
- **Interactive UI**: 
  - Hover effects on product cards.
  - "Jump up" animations for feature highlights.
  - Responsive grid layout.
- **Product Details**: Click on any item to view a detailed description, price, and quality assurances.
- **Shopping Cart**: 
  - Add items to the cart.
  - Real-time total calculation.
  - Remove items or clear the cart.
- **Checkout Flow**: A step-by-step checkout process including a QR code payment simulation and order confirmation.
- **Automatic Seeding**: The database is automatically populated with sample products and images upon server start.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Styling**: Custom CSS with responsive design

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or via Atlas)

## 🔧 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/minihug.git
    cd minihug
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configuration (Optional)**
    Create a `.env` file in the root directory if you need to configure specific ports or database URIs:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/minihug
    PORT=5000
    JWT_SECRET=your_secret_key
    ```

4.  **Start the Server**
    ```bash
    node server.js
    ```
    *The server will start on port 5000 and seed the database with initial data.*

5.  **Run the App**
    Open your browser and visit:
    `http://localhost:5000`

## 📖 Usage

1.  **Login/Signup**: Create an account to access the store.
2.  **Browse**: View Baby Products and Toys.
3.  **Cart**: Add items to your cart and proceed to checkout.
4.  **Payment**: Scan the QR code (simulated) to pay.

## � Project Structure

- `public/`: Contains the frontend code (`index.html`, `styles.css`, `script.js`).
- `models/`: Mongoose database schemas (`Product`, `Toy`, `User`).
- `routes/`: API route definitions.
- `server.js`: Main application entry point.

---
Made with ❤️ for MiniHug.
