require('dotenv').config()
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { CustomAPIError, BadRequestError, UnauthenticatedError } = require('../errors/index')


const login = async (req, res) => {
  const {username, password} = req.body

  if (!username || !password) {
    throw new BadRequestError('Please Provide Username and Password')

  } else {

    const id = new Date().getDate()
    const jwtSecret = process.env.JWT_SECRET

    const token = jwt.sign({id, username}, jwtSecret, {expiresIn: '30d'})

    res.status(StatusCodes.OK).json({msg: `User created.`, token})

  }
}

const dashboard = async(req, res) => {
  const testing = req.user  

  res.status(StatusCodes.ACCEPTED).json({msg: `Welcome ${req.user.username}, your ID is ${req.user.id}. Have a fun experience`})
}

module.exports = {
  login,
  dashboard
};
