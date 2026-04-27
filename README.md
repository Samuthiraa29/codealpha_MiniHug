# MiniHug - Baby Products & Toys Store 🧸

MiniHug is a full-stack e-commerce application developed independently to simulate a real-world online store for baby products and toys, featuring authentication, cart management, and checkout functionality.

---

## 👨‍💻 My Contribution

- Independently designed and developed the MiniHug full-stack e-commerce application
- Implemented backend functionality using Node.js and Express.js
- Established database connectivity using MongoDB (MongoDB Compass)
- Designed and structured the database schema for products, users, and cart functionality
- Developed responsive frontend UI with custom styling and interactive elements
- Implemented core features such as user authentication, product browsing, and cart management
- Integrated frontend and backend for seamless data flow and user interaction

---

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

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with responsive design

### Backend
- **Framework**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16 or higher)
- MongoDB (running locally or via Atlas)
- npm or yarn package manager

---

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

---

## 📖 Usage

1.  **Login/Signup**: Create an account to access the store.
2.  **Browse**: View Baby Products and Toys.
3.  **Cart**: Add items to your cart and proceed to checkout.
4.  **Payment**: Scan the QR code (simulated) to pay.

---

## 🧪 Demo / Output

- Users can register and log in securely
- Browse baby products and toys with interactive UI
- View detailed product information
- Add/remove items from cart with real-time updates
- Simulated checkout process with QR-based payment flow

---

## 📚 Key Learnings

- Gained hands-on experience in full-stack web development
- Learned how to build and connect RESTful APIs using Node.js and Express.js
- Improved understanding of database design and MongoDB integration
- Developed skills in creating responsive and interactive user interfaces
- Learned how to manage complete application flow from frontend to backend
- Strengthened problem-solving skills while implementing real-world features like cart and checkout

---

## 📁 Project Structure

- `public/`: Contains frontend code (`index.html`, `styles.css`, `script.js`)
- `models/`: Mongoose database schemas (`Product`, `Toy`, `User`)
- `routes/`: API route definitions
- `server.js`: Main application entry point

---

Made with ❤️ for MiniHug.