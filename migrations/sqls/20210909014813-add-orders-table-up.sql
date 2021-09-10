CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(64)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id)
);