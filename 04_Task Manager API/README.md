# CRUD API App

This is a CRUD operation API that users can interact with via frontend interface. This is different than read-only APIs such as the countries API where it serves only static data that users can fetch to use in their app.

It uses a database (non-relational: MongoDB (Cloud Version Atlas)) to persist users data in the app and change the API dynamically depending on the operations they perform with the interface.

## Tech Stack

MEN (Almost MERN but no React)

- MongoDB
- Express
- NodeJS

## Q and As

- Why PATCH and not PUT?

  Both are for updating the resource, but when you use PUT you're trying to replace to existing resource. PATCH is for a partial update. If you make a PATCH request and only change the name property then only the name property will update and the rest of the properties stay the same. PUT request will replace the old object and create a new object with only the properties the user passes in the request body. If the old object had a name and email and the user makes a PUT request and they only pass in an JSON object with the name property then it will remove the email property because it replaces the old object with the new object the user passes in the request body.

  For this project PATCH makes more sense because when updating a task we only want to change one property and we want to keep the rest untouched.

- Why the custom error 404 response?

  We used a custom error 404 response because if the user goes to a route that isn't configured then they get a generic "Cannot GET /api/v1/hello" type of message on the UI. Instead we can write a more user friendly response of "Route does not exist".

- Why use the async wrapper?

  This is a personal choice because in every controller function there was a try-catch block which got redundant. We don't want to repeat our selves constantly with the same boilerplate try-catch in every controller function, so we can use middleware to wrap the controller functions. There are npm packages that can do this for us, but for this we did it ourselves.

  We create a async wrapper function called asyncWrapper that takes in a async function as a callback. What we are doing is we want to use the await keyword inside the function but we don't want to have to use try-catch.

## How middleware works

Middleware runs everytime a request is made to the server. It executes in a first in first out data stucture.
In express we tell it to run something as middleware by using the use() function:

server.use(someFn);
server.use(anotherFn);

When any request is made to the server it will first run someFn then anotherFn because someFn is initialized
before anotherFn in the code.

In our code we use this logic to give a custom 404 message on the UI if the user enters a invalid route becuase
we initalize our tasksRouter in the middleware before notFound function in the middleware, so it checks all the
routes first then runs the notFound function if none of the routes hit.
