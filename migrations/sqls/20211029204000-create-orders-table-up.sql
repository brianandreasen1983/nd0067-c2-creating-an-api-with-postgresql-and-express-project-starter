CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    user_id INTEGER REFERENCES users(id),
    quantity INTEGER,
    order_status VARCHAR(10)
);