#  Car Marketplace

A modern **car marketplace web application** that allows users to browse, search, and manage car listings.  
Built with **React.js** on the frontend and **Laravel** on the backend, using **Laravel Sanctum** for authentication.

---

##  Features

- User authentication (register / login with Laravel Sanctum)
- Secure API authentication using tokens
- Browse car listings with pagination
- Search cars by keywords and filters (brand, price, etc.)
- Sort cars (latest, price, popularity)
- Wishlist (add / remove favorite cars)
- View detailed car pages
- Protected routes for authenticated users
- Responsive UI
- Clean and reusable component architecture

---

##  Technologies Used

### Frontend: React.js, JavaScript (ES6+), Context API, React Router, CSS

### Backend: Laravel, Laravel Sanctum, RESTful API, MVC architecture  

### Database: MySQL  

---

## ⚙️ Setup

### Clone the repository

```bash
git clone git@github.com:mehdizalyaul/car-marketplace.git
```

### Setup Frontend

Navigate to the project directory

```bash
cd frontend
```
Install the dependencies

```bash
npm install
```
Start the development server

```bash
npm run dev
```

Frontend will be available at

```bash
http://localhost:5173
```

### Setup Backend

Navigate to the project directory

```bash
cd backend
```

Install the dependencies

```bash
composer install
```

Create environment file

```bash
cp .env.example .env
```

Generate Application Key

```bash
php artisan key:generate
```

Install Sanctum & Run Migrations

```bash
php artisan sanctum:install
php artisan migrate
```

Start the Backend server

```bash
php artisan serve
```

The API will be available at:

```bash
http://localhost:8000/api
```



