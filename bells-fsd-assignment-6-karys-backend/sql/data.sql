-- Sample INSERT Statements for Flower Shop
use flowershop;

-- Inserting data into Categories
INSERT INTO
    Categories (category_name)
VALUES
    ('Graduation'),
    ('Engagement'),
    ('Appreciation');

-- Inserting data into Products
INSERT INTO
    Products (name, description, category_id, price, image)
VALUES
    (
        'Bouquet of Roses',
        'Consists of 6 fresh roses',
        1,
        9.99,
        '/products/1.jpg'
    ),
    (
        'Graduation Bouquet',
        'Mix of fresh sunflowers and baby breaths',
        2,
        10.99,
        '/products/2.jpg'
    ),
    (
        'Engagement Bouquet',
        'Consists of 50 fresh roses',
        3,
        19.99,
        '/products/3.jpg'
    );

-- Inserting data into Users
-- INSERT INTO
--     Users (first_name, last_name, email)
-- VALUES
--     ('Jane', 'Street', 'jane22@gmail.com'),
--     ('Avery', 'Smith', 'avery25@gmail.com'),
--     ('John', 'Boey', 'johnyy@gmail.com');

-- Inserting data into Employees
-- INSERT INTO
--     Employees (first_name, last_name)
-- VALUES
--     ('Emily', 'Brown'),
--     ('Vanessa', 'Davis'),
--     ('Joseph', 'Wilson');

-- -- Inserting data into Sales
-- INSERT INTO
--     Sales (
--         product_id,
--         employee_id,
--         user_id,
--         quantity,
--         sale_date
--     )
-- VALUES
--     (1, 1, 1, 1, '2024-02-14'),
--     (2, 1, 2, 2, '2024-02-10'),
--     (3, 2, 3, 2, '2024-03-15');