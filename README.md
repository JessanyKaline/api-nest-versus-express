# API Nest Versus Express

The main purpose of this repository is to build a project using two different frameworks: **Express** and **Nest.js**. This allows for a comparison of architecture, implementation, and development practices.

---

## Project Requirements

The goal of the project is to create a REST API that allows:

- Create, list, update, and delete **orders** and **products**.
- Validate stock availability before creating an order.
- Calculate the total value of an order.
- Implement robust error handling.
- Use a database (**MongoDB**) to persist data.
- Implement unit tests

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**
- **NPM**
- **Docker** (optional, for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JessanyKaline/api-nest-versus-express

2. Navigate to the desired framework folder:
   ```bash
   cd <framework> # Replace <framework> with 'express' or 'nest'
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   
   - For Nest
     ```bash
     npm run start:dev
     ```
   - For Express
     ```bash
     npm run dev
     ```
## Docker
A docker-compose.yml file is included in the project to simplify setup with MongoDB.

1. Navigate to the project folder.
2. Run the following command:
   ```bash
    docker-compose up
This will start both the MongoDB server and its client.

Note: Each framework (express and nest) has its own docker-compose.yml file.

## Project Structure

### Express

The Express project follows the **Clean Architecture** principles, organized as follows:

```plaintext
src/
├── domain/
│   ├── dtos/
│   │   ├── order.ts
│   │   └── product.ts
│   ├── entities/
│   │   ├── Order.ts
│   │   └── Product.ts
│   ├── errors/
│   │   ├── OrderErrors.ts
│   │   └── ProductErrors.ts
│   └── interfaces/
│       └── repositories/
│           ├── OrderRepository.ts
│           └── ProductRepository.ts
├── application/
│   ├── useCases/
│   │   ├── order/
│   │   │   ├── CreateOrder.useCase.ts
│   │   │   ├── DeleteOrder.useCase.ts
│   │   │   ├── GetOrderById.useCase.ts
│   │   │   ├── ListOrders.useCase.ts
│   │   │   └── UpdateOrder.useCase.ts
│   │   ├── product/
│   │   │   ├── CreateProduct.useCase.ts
│   │   │   ├── DeleteProduct.useCase.ts
│   │   │   ├── GetProductById.useCase.ts
│   │   │   ├── ListProducts.useCase.ts
│   │   │   └── UpdateProduct.useCase.ts
│   └── interfaces/
│       └── controllers/
│           ├── OrderController.ts
│           └── ProductController.ts
├── infrastructure/
│   ├── database/
│   │   ├── mongodb/
│   │   │   ├── models/
│   │   │   └── repositories/
│   ├── http/
│   │   ├── express/
│   │   │   ├── routes/
│   │   │       ├── orderRoutes.ts
│   │   │       └── productRoutes.ts
└── main/
    └── server.ts
```

### Nest.js

The Nest.js project follows the Nest.js Architecture, structured as:

```plaintext
src/
├── orders/
│   ├── dto/
│   │   ├── order.dto.ts
│   ├── orders.controller.spec.ts
│   ├── orders.controller.ts
│   ├── orders.module.ts
│   ├── orders.service.spec.ts
│   └── orders.service.ts
├── products/
│   ├── dto/
│   │   ├── product.dto.ts
│   ├── products.controller.spec.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   ├── products.service.spec.ts
│   └── products.service.ts
├── schemas/
│   ├── order.schema.ts
│   ├── product.schema.ts
├── utils/
│   ├── object-id.utils.ts
├── app.controller.ts
├── app.module.ts
└── main.ts
```

Contribution

Feel free to fork this repository, make changes, and submit a pull request. Contributions are always welcome!




   
