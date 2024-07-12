# Project

This is a small project to show how you can protect a route and only allow access to an authenticated user.

We have 2 routes: `/login` and `/dashboard`

## Login Route

When the user types in a username and password and hits the "submit" button, our frontend code sends of POST request to the public route `/api/v1/login`, the server processes the request by running the login() controller
function.

This function grabs the username and password from the request body:

        ```javascript
        await axios.post("/api/v1/login", { username, password }); // { username, password } is the body of the request
        ```

Then it checks if the username and password fields are both given, if not then it throws a BadRequestError with the message of "Please provide and username and password". This custom error class gets passed to the error middleware function "errorHandlerMiddleware()" which sends a response:

        ```javascript
        export const errorHandlerMiddleware = (err, req, res, next) => {
            // if an error happens in a controller, make a custom message
            if (err instanceof CustomAPIError) {
                return res.status(err.statusCode).json({ msg: err.message });
            }
            // else returna generic error and message
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong try again later");
        };
        ```

Since the status isn't 200, axios will run the catch block. Axios give us a response property on the error object which holds a data propety which will have the response json obj sent by the backend. We also remove the token in local storage because if the user has a unsuccessful login they will no longer have access to the protected route:

        ```javascript
        if (err instanceof CustomAPIError) {
            return res.status(err.statusCode).json({ msg: err.message }); // { msg: err.message } is the data sent we're sending to the frontend
        }
        ```

        ```javascript
        catch (error) {
            console.log(error.response.data.msg); // we can access the msg property in the data sent by the backend
            localStorage.removeItem("token");
        }
        ```

If the request is successful then the backend will create a new JWT token and send a response with the success status code and the request data, since this is a login the request data will be a success message "user created" and their newly made JWT token:

    ```javascript
    const id = Date.now();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(200).json({ msg: "user created", token });
    ```

On the frontend, we store that token in local storage, so the user can keep accessing the protected route once they successfully login in:

    ```javascript
    localStorage.setItem("token", data.token); // as you see above the backend sends the token in the response json obj, so: const { data } = await axios.post("/api/v1/login", { username, password }), will have access to data.token
    ```

## Dashboard Route

This is a protected route that users need to be authenticated to have access to.

When a user clicks the "Get Data" button is sends a GET request to the protected route `/api/v1/dashboard`, since the route is protected it runs the authenticationMiddleware() function before running the dashboard() function:

    ```javascript
    router.route("/dashboard").get(authenticationMiddleware, dashboard);
    ```

The authenticationMiddleware() first gets the value from the authorization header which is sent in the request by the frontend:

    ```javascript
    const { data } = await axios.get("/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`, // this jwt token is received in the response of the get request of the login post request
      },
    });
    ```

It checks if the value of Authorization property exists or is empty, if so then it throws a UnauthenticatedError error, this happens if the user tries to access the route without logging in successfully:

    ```javascript
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("No token provided");
    }
    ```

Next it grabs the token from the Authorization header property because its using the convention of "Bearer <token>" the token isn't just the value of the property. Then it verfies is the token, if valid then it will create a user property on the request object and pass an object containing the user id and username then it gives access by running next() which will run the next middleware function which is dashboard(), if not valid then it will throw a UnauthenticatedError error:

    ```javascript
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route");
    }
    ```

The dashboard() function will send a response with a status code of 200 and the data:

    ```javascript
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data: ${luckyNumber}`,
    });
    ```

On the frontend we display that data given in the response:

    ```javascript
    const { data } = await axios.get("/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;
    ```
