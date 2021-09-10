# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

<!--TODO: Modify as needed-->
## API Endpoints
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders/:id/products', addProduct)
    app.post('/orders/:userid')
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)

#### Products
- Index -- Done
- Show -- Done
- Create [token required] -- Done

#### Users
- Index [token required] -- Done
- Show [token required] -- Done
- Create N[token required] -- Done

#### Orders
- Current Order by user (args: user id)[token required] -- WIP

## Data Shapes
#### Product
-  id -- Done
- name -- Done
- price -- Done

#### User
- id -- Done
- firstName -- Done
- lastName -- Done
- password -- Done

#### Orders
- id -- Done
- id of each product in the order -- Done
- quantity of each product in the order -- Done
- user_id -- Done
- status of order (active or complete) -- Done