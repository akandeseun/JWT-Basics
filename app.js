require('dotenv').config
require('express-async-errors')

const express = require('express');
const app = express()
const mainRoute = require('./routes/main')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleWare = require('./middlewares/notFound')

// Middlewares ( built in )
app.use(express.static('./public'))
app.use(express.json())

// Routes
app.use('/api/v1', mainRoute)


// Middleware ( defined )
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleWare)

const port = process.env.PORT || 3000

const start = async() => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
