CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer,
    order_status bit
)