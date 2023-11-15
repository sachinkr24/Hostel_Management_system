//protecting our routes on the basis of authorization, get a token from middleware then validating to show routes


const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;//authorization on the basis of user_id 
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};


// Asynchronous Operations
//In React applications, asynchronous operations like making API calls or handling side effects
//can be managed effectively using middleware. Middleware allows developers to intercept certain actions, 
//perform asynchronous tasks, and then dispatch new actions with the results once the tasks are complete.


// Authentication and Authorization
// Middleware is particularly useful for handling authentication and authorization tasks. 
// For example, if a user attempts to access a protected route, the middleware can check 
// if the user is authenticated and redirect them to the login page if necessary.