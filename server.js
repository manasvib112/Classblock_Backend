const mongoose = require('mongoose')
const swaggerJsDocs = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const user = require('./routes/user')
// const teacher = require('./routes/teacher')
const classroom = require('./routes/classroom')
const events = require('./routes/events')
const post = require('./routes/post')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

app.use(passport.initialize())
require('./config/passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', user)
app.use('/api/classroom', classroom)
app.use('/api/events', events)
app.use('/api/post', post)

mongoose.connect(
  'mongodb+srv://MANASVI:manasvi@cluster0.fiebu.mongodb.net/classblock?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      name: 'ClassBlock API Documentation',
      description:
        'Documentation for the v1 version of APIs for the ClassBlock App'
    },
    servers: ['http://localhost:5000']
  },
  apis: ['server.js', './routes/*.js']
}

const swaggerDocs = swaggerJsDocs(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', () => {
  console.log('Database connected successfully')
})

const port = process.env.PORT || 5000
console.log(mongoose.modelNames())
app.listen(port, () => {
  console.log(`Server running on port number :${port}`)
})
