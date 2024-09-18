// ****************** server.js *********************



// Import Dependencies.
// ----------------------------------------------------------------------------------------------------------------------------
    const express = require("express");
    const bodyParser = require("body-parser");
    const jwt = require("jsonwebtoken");
// ----------------------------------------------------------------------------------------------------------------------------

// Import Dependencies.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    express: Used to create the server and define routes.
    body-parser: Middleware to parse the body of incoming requests (specifically for JSON in this case).
    jsonwebtoken: Library to sign (create) and verify JSON Web Tokens (JWTs).
\* -------------------------------------------------------------------------------------------------------------------------- */

// Create Express App and Set Port.
// ----------------------------------------------------------------------------------------------------------------------------
    const app = express();
    const PORT = 8000;
    const SECRET_KEY = "mysecretkey";

    app.use(bodyParser.json()); // Middleware for Parsing Request Body.
// ----------------------------------------------------------------------------------------------------------------------------

// Create Express App and Set Port.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    app: Creates an instance of an Express application.
    PORT: Defines the port where the server will listen (8000).
    SECRET_KEY: This is the key used to sign and verify JWTs. You should keep this secret and secure.

    bodyParser.json(): This middleware allows the Express app to parse incoming JSON request bodies.
    It’s necessary to extract username and password from req.body.
\* -------------------------------------------------------------------------------------------------------------------------- */

// /login - Create and send JWT after verifying the username and password.
// ----------------------------------------------------------------------------------------------------------------------------
    app.post("/login", (req, res) =>
    {
        const { username, password } = req.body;

        // Normally you"d verify the username and password here
        if (username === "admin" && password === "password")
        {
            const token = jwt.sign({ username, role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
            return res.json({ message: "Login successful", token });
        }
        else if (username === "user" && password === "password")
        {
            const token = jwt.sign({ username, role: "user" }, SECRET_KEY, { expiresIn: "1h" });
            return res.json({ message: "Login successful", token });
        }
        else
        {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
// ----------------------------------------------------------------------------------------------------------------------------

// /login - Create and send JWT after verifying the username and password.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    POST /login: Accepts username and password in the request body.
    Authentication logic: In this exercise, a basic hardcoded check is used to validate the username and password.
    If the credentials match:
    A JWT is generated using jwt.sign(), embedding the username and role (admin or user) as the payload.
    The token is set to expire in 1 hour (expiresIn: '1h').
    The token is returned to the client in the response.
    If the credentials don't match:
    A 401 response with an "Invalid credentials" message is returned.
\* -------------------------------------------------------------------------------------------------------------------------- */

// /resource - Verifies JWT and returns a message with the username.
// ----------------------------------------------------------------------------------------------------------------------------
    app.get("/resource", (req, res) =>
    {
        const token = req.headers["authorization"];

        if (!token)
        {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) =>
        {
            if (err)
            {
                return res.status(401).json({ message: "Failed to authenticate token" });
            }
            res.json({ message: `Welcome ${decoded.username}` });
        });
    });
// ----------------------------------------------------------------------------------------------------------------------------

// /resource - Verifies JWT and returns a message with the username.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    GET /resource: This endpoint is protected, meaning only users with a valid JWT can access it.
    Authorization:
    The JWT is expected in the Authorization header of the request.
    If no token is provided, a 403 response with "No token provided" is returned.
    Token Verification:
    jwt.verify() is used to verify the token using the SECRET_KEY.
    If the token is invalid or expired, a 401 response with "Failed to authenticate token" is returned.
    If the token is valid, the username from the decoded token is used to greet the user (e.g., "Welcome [username]").
\* -------------------------------------------------------------------------------------------------------------------------- */

// /admin_resource - Verifies JWT and checks if the user is an admin.
// ----------------------------------------------------------------------------------------------------------------------------
    app.get("/admin_resource", (req, res) =>
    {
        const token = req.headers["authorization"];

        if (!token)
        {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) =>
        {
            if (err)
            {
                return res.status(401).json({ message: "Failed to authenticate token" });
            }

            if (decoded.role === "admin")
            {
                res.json({ message: "Welcome Admin" });
            }
            else
            {
                res.status(403).json({ message: "Access denied. Admins only" });
            }
        });
    });
// ----------------------------------------------------------------------------------------------------------------------------

// /admin_resource - Verifies JWT and checks if the user is an admin.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    GET /admin_resource: This endpoint is only accessible to users with an admin role in their token.
    Token Verification:
    The process is similar to /resource.
    The token is verified using jwt.verify().
    If the token is valid, the decoded payload is checked for the role attribute.
    Only users with a role of admin are granted access, and a message "Welcome Admin" is returned.
    Non-admin users receive a 403 response with the message "Access denied. Admins only".
\* -------------------------------------------------------------------------------------------------------------------------- */

// Start the server.
// ----------------------------------------------------------------------------------------------------------------------------
    app.listen(PORT, () =>
    {
        console.log(`Now listening at http://localhost:${PORT}`);
    });
// ----------------------------------------------------------------------------------------------------------------------------

// Start the server.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    app.listen(): This starts the Express server on the specified PORT (8000).
    Console message: Logs a message indicating the server is running and listening at http://localhost:8000.
\* -------------------------------------------------------------------------------------------------------------------------- */

// Summery.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    /login: This endpoint authenticates a user and generates a JWT.
    /resource: Requires a valid JWT to access, and responds with a personalized message based on the username in the token.
    /admin_resource: Restricted to users with an admin role. Non-admin users receive an access denied message.
\* -------------------------------------------------------------------------------------------------------------------------- */
