DROP DATABASE flowershop;

-- SQL Schema for Flower Shop
CREATE DATABASE IF NOT EXISTS flowershop;

USE flowershop;

-- Creating Categories Table
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Creating Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id)
);

-- Creating Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NOW()
);

-- Creating Employees Table
CREATE TABLE Employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

-- Creating Sales Table
CREATE TABLE Sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    employee_id INT,
    user_id INT,
    quantity INT,
    sale_date DATE,
    FOREIGN KEY (product_id) REFERENCES Products (product_id),
    FOREIGN KEY (employee_id) REFERENCES Employees (employee_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Cart Items table
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);