# Authentication based CRUD API

This project is a test, it's a crud app, in which admin and users can signup and login, see lists of products, see all products but only an admin has the authorization to create/update and delete product.

## Getting Started

you should have the following already
Docker Installed on your computer or have the following:
nodejs and MongoDb

### Installing

Clone the App

```
git clone https://github.com/krofax/disxt-api-test.git
```

Before running the app, you have to set environment variables defined in the .env_sample in a .env file

####Starting the App With Docker
All you have to do is run `docker-compose up`

####With Node

```
cd app-directory
npm install
npm start
```

## API endpoints.

| End-Points                               | Functionality                                       |
| :----------------------------------------| :-------------------------------------------------- |
| POST /api/v1/public/signup               | Sign up a user(client/admin)                        |
| POST /api/v1/public/login                | Logs a user in.                                     |
| GET/api/v1/public/getproducts            | Both Clients and Admins can get all products        |
| GET/api/v1/public/getsingleproduct/{id}  | Both Clients and Admins can get a specific product  |
| POST /api/v1/private/product             | Admin can create a product                          |
| DELETE /api/v1/private/deleteproduct/{id}| Admin delete a specific product based on the id.    |
| PUT /api/v1/private/updateproduct/{id}   | Admin update a specific product based on the id.    |
                             

## Built With

- [Express](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Mongoose](https://maven.apache.org/) - ODM

## Authors

- **Blessing Krofegha** - _Initial work_ - [Author](https://github.com/krofax/disxt-api-test)

