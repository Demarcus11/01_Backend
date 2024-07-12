export const notFound = (req, res) =>
  res.status(404).json({ message: "Page Not Found", _links: { self: { href: req.originalUrl } } });

/*

The function is used as middleware and is setup to be used after it checks all the routes and if the route
isn't in the code then this will be the next middleware function in the code so it runs. In server.js its 
intentionally put after the tasksRouter middleware, so it only runs after checking the routes.

A route is invalid if it isn't a route specified in our routes file:

    - "http://localhost:5000/api/v1/tas", is an invalid route because none of our routes have that endpoint
    - "http://localhost:5000/api/v1/task/dndwiw", although the taskID is invalid, the route is valid because we have a route setup to check for the route of: http://localhost:5000/api/v1/task/:id 
*/
