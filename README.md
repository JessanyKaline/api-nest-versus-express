# api-nest-versus-express

The main purpose of this repository is to build a project with different frameworks: Express versus Nest.js. 

# Getting Started

- Install Node
- Install NPM

- Clone the repository
```
git clone https://github.com/JessanyKaline/api-nest-versus-express
```
- Install dependencies
```
cd <framework> //express or nest
npm install
```

- If Express
```
npm run dev
```

- If Nest
```
npm run start:dev
```

## Docker
A docker-compose file has been added to the project with a MongoDB.

It is as easy as go to the project folder and execute the command 'docker-compose up' once you have Docker installed, and both the MongoDB server and client will be running. There one docker-composer.yml for each frameworks (express / nest).


# EXPRESS
The project is to build with Clean Architecture

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
│   │   │   ├── UpdateOrder.useCase.ts
│   │   ├── product/
│   │   │   ├── CreateProduct.useCase.ts
│   │   │   ├── DeleteProduct.useCase.ts
│   │   │   ├── GetProductById.useCase.ts
│   │   │   ├── ListProducts.useCase.ts
│   │   │   ├── UpdateProduct.useCase.ts
│   └── interfaces/
│       └── controllers/
│           └── OrderController.ts
│           └── ProductController.ts
├── infrastructure/
│   ├── database/
│   │   ├── mongodb/
│   │   │   ├── models/
│   │   │   └── repositories/
│   ├── http/
│   │   ├── express/
│          ├── routes/
│              └── orderRoutes.ts
|              └── productRoutes.ts
└── main/
    └── server.ts

# NEST.JS

The project is to build with Nest Architecture

src/
├── orders/
│   ├── dto/
│   │   ├── order.dto.ts
│   ├── orders.controller.spec.ts
│   ├── orders.controller.ts
│   └── orders.module.ts
│   └── orders.service.spec.ts
│   └── orders.service.ts
├── products/
│   ├── dto/
│   │   ├── product.dto.ts
│   ├── products.controller.spec.ts
│   ├── products.controller.ts
│   └── products.module.ts
│   └── products.service.spec.ts
│   └── products.service.ts
├── schemas/
│   ├── order.schema.ts
│   ├── products.schema.ts
├── utils/
│   ├── object-id.utils.ts
└── app.controller.ts
└── app.module.ts
└── main.ts
   