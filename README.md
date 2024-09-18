# JWT Express App

![](jwt_logo_1.jpg)

This project is a simple implementation of JSON Web Tokens (JWT) in an Express.js app. It demonstrates how to authenticate users, issue JWTs, and protect specific routes based on the JWTs provided by the client.

## Purpose

The purpose of this project is to understand the implementation and use of JSON Web Tokens for securing endpoints. The app includes:
- A login system that generates a JWT upon successful authentication.
- Protected routes that require valid JWTs for access.
- Role-based access control for certain resources (admin-only access).

## Features

- **/login**: Issues a JWT when the user provides valid credentials.
- **/resource**: A protected route that requires a valid JWT to access. Returns a message with the user's username.
- **/admin_resource**: A protected route accessible only to users with the "admin" role in their JWT. Returns a message if the user is an admin.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Lusanda11/JWT-express-app
    cd JWT-express-app
    ```

2. **Install dependencies**:

    Install the necessary dependencies using npm:

    ```bash
    npm install
    ```

3. **Start the server**:

    Once the dependencies are installed, you can start the Express server:

    ```bash
    node server.js
    ```

    The app will run on `http://localhost:8000`.

## Usage

### 1. Login and get a JWT

- **Endpoint**: `/login`
- **Method**: `POST`
- **Request Body**:

    ```json
    {
      "username": "admin",
      "password": "password"
    }
    ```

    If the credentials are valid, the response will include a JWT:

    ```json
    {
      "message": "Login successful",
      "token": "your-jwt-token-here"
    }
    ```

### 2. Access the `/resource` route

- **Endpoint**: `/resource`
- **Method**: `GET`
- **Authorization**: Include the JWT in the `Authorization` header:

    ```http
    Authorization: Bearer <your-jwt-token-here>
    ```

- **Response**:

    ```json
    {
      "message": "Welcome [username]"
    }
    ```

### 3. Access the `/admin_resource` route

- **Endpoint**: `/admin_resource`
- **Method**: `GET`
- **Authorization**: Include the JWT in the `Authorization` header:

    ```http
    Authorization: Bearer <your-jwt-token-here>
    ```

- **Response for Admin Users**:

    ```json
    {
      "message": "Welcome Admin"
    }
    ```

- **Response for Non-Admin Users**:

    ```json
    {
      "message": "Access denied. Admins only"
    }
    ```

## Dependencies

This project relies on the following Node.js packages:

- [express](https://www.npmjs.com/package/express): A web framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse the incoming request bodies.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Library for creating and verifying JWTs.

You can install these dependencies with:

```bash
npm install
```
## Contributing
Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request explaining your changes.

## License
This project is licensed under the unlicense.

## Contact
If you have any questions or need help, feel free to open an issue or reach out via GitHub.
