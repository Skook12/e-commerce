# E-Commerce Full-Stack Application

A modern full-stack e-commerce application built with Flask (Python) backend and React (TypeScript) frontend, featuring product management, shopping cart, user authentication, and category management.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Features](#project-features)

## 📖 Project Overview

This is a full-stack e-commerce platform that provides:
- User authentication and session management
- Product catalog with categories
- Shopping cart functionality
- Admin dashboard for managing products and categories
- RESTful API with Swagger documentation

## 🏗️ Project Structure

```
e-commerce/
├── api/                          # Backend API (Flask)
│   ├── ecommerce_api/
│   │   ├── common/              # Exception handlers
│   │   ├── controllers/         # API endpoints (auth, cart, product, category)
│   │   ├── models/             # Database models (User, Product, Cart, Category)
│   │   ├── repositories/        # Data access layer
│   │   └── services/           # Business logic
│   ├── docs/                   # API Swagger documentation
│   ├── instance/               # Database files
│   ├── config.py              # Application configuration
│   ├── requirements.txt       # Python dependencies
│   └── run.py                 # Application entry point
│
└── web/                        # Frontend (React + TypeScript)
    ├── src/
    │   ├── components/        # React components
    │   │   ├── forms/        # Form components
    │   │   ├── list/         # List/table components
    │   │   └── ui/           # Reusable UI components (shadcn/ui)
    │   ├── http/             # HTTP services and types
    │   │   ├── services/     # API service calls
    │   │   └── type/         # TypeScript type definitions
    │   ├── Pages/            # Page components (Home, Login, Dashboard)
    │   ├── lib/              # Utility functions
    │   ├── App.tsx           # Main app component
    │   └── main.tsx          # Application entry point
    ├── public/               # Static assets
    ├── package.json          # Node.js dependencies
    └── vite.config.ts        # Vite configuration
```

### Architecture

The project follows a **clean architecture** pattern:

**Backend (API):**
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access and database operations
- **Models**: Define database schema and relationships

**Frontend (Web):**
- **Pages**: Main route components
- **Components**: Reusable UI components
- **Services**: API integration layer
- **Types**: TypeScript type definitions

## 🛠️ Technologies Used

### Backend (API)

- **Flask** (2.3.0) - Python web framework
- **Flask-SQLAlchemy** (3.1.1) - ORM for database operations
- **Flask-Login** (0.6.2) - User session management
- **Flask-Cors** (3.0.10) - Cross-origin resource sharing
- **Flasgger** (0.9.7.1) - Swagger UI documentation
- **SQLite** - Database
- **Werkzeug** (2.3.0) - WSGI utility library

### Frontend (Web)

- **React** (19.1.1) - UI library
- **TypeScript** (5.9.3) - Type-safe JavaScript
- **Vite** (7.1.7) - Build tool and dev server
- **React Router** (7.9.4) - Client-side routing
- **TanStack Query** (5.90.2) - Data fetching and caching
- **Tailwind CSS** (4.1.14) - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - High-quality component library
- **Sonner** - Toast notifications
- **Zod** (4.1.12) - Schema validation
- **Lucide React** - Icon library

### Development Tools

- **ESLint** - JavaScript/TypeScript linting
- **Biome** - Fast formatter and linter
- **Pylint** - Python code analyzer

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.8 or higher
- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

## 💾 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e-commerce
```

### 2. Backend Setup (API)

Navigate to the `api` directory and set up the Python environment:

```bash
cd api

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup (Web)

Navigate to the `web` directory:

```bash
cd web

# Install dependencies
npm install
```

## 🚀 Running the Application

### Running the Backend (API)

1. Navigate to the `api` directory:
```bash
cd api
```

2. Activate your virtual environment (if using one):
```bash
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux
```

3. Run the Flask application:
```bash
python run.py
```

The API will start on `http://localhost:5000`

### Running the Frontend (Web)

1. Navigate to the `web` directory:
```bash
cd web
```

2. Start the development server:
```bash
npm run dev
```

The web application will start on `http://localhost:5173`

### Running Both (Development)

You'll need two terminal windows/tabs:

**Terminal 1 - Backend:**
```bash
cd api
python run.py
```

**Terminal 2 - Frontend:**
```bash
cd web
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation:

- **Swagger UI**: `http://localhost:5000/apidocs/`

The API provides endpoints for:
- Authentication (login, logout)
- Products (list, get, create, update, delete)
- Categories (list, get, create, update, delete)
- Shopping Cart (view, add items, remove items, checkout)

## ✨ Project Features

### User Features
- User registration and authentication
- Browse products by category
- Add/remove items from shopping cart
- Session-based authentication

### Admin Features (Dashboard)
- Product management (CRUD operations)
- Category management (CRUD operations)
- Product categorization
- Image upload support

### Technical Features
- RESTful API design
- Clean architecture with separation of concerns
- TypeScript for type safety
- Responsive UI with modern design
- API documentation with Swagger
- JWT/session-based authentication

## 🔧 Configuration

### Backend Configuration

The backend configuration is in `api/config.py`. You can customize:
- Database URL
- Secret key
- Debug mode
- CORS settings

### Frontend Configuration

The frontend uses Vite for configuration. Key settings in `web/vite.config.ts`:
- Path aliases (`@` for `src/`)
- React plugin with SWC
- Tailwind CSS integration

## 📝 Available Scripts

### Backend
- `python run.py` - Start the Flask development server

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of a portfolio project.

## 👤 Author

**Rodrigo**
- Portfolio: [Your Portfolio Link]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

**Note**: Make sure both the backend (API) and frontend (Web) are running simultaneously for the application to work properly. The frontend communicates with the backend API running on `http://localhost:5000`.

