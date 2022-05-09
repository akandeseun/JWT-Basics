// AUthentication Middleware

require('dotenv').config()
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { CustomAPIError, BadRequestError, UnauthenticatedError } = require('../errors/index')

const authenticationMiddleware = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {

    throw new UnauthenticatedError('No Token Provided');

  } else {
    
    const auth = authHeader.split(' ');
    const token = auth[1];

    // verifying the validity of the token
    try {
      
      const jwtSecret = process.env.JWT_SECRET;

      // decoding the token 
      const decoded = jwt.verify(token, jwtSecret);

      const { id, username } = decoded;
      req.user = decoded;
      next();

      
    } catch (error) {
      throw new UnauthenticatedError('Invalid Token')
    }
  }
}

module.exports = authenticationMiddleware;
