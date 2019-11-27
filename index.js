// App setup
const express = require('express')
const app = express()
var port = 2000
const config = require('./config/database')

// CORS Setup
const cors = require('cors')
app.use(cors())

// Body parser setup
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Logger setup
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'TRACE'
module.exports.logger = logger

// DB setup
const { Client } = require('pg')
const client = new Client(config.pgLocal)
client.connect(err => {
    if (err) {
        logger.error('DB connection error', err)
    } else {
        logger.info('DB connected')
    }
})
module.exports.db = client

// Routes
const api = '/api'
app.use(`${api}/category`, require('./routes/categoryRoutes'))
app.use(`${api}/lift`, require('./routes/liftRoutes'))
app.use(`${api}/workout`, require('./routes/workoutRoutes'))
app.use(`${api}/workoutLift`, require('./routes/workoutLiftRoutes'))
app.use(`${api}/liftSet`, require('./routes/liftSetRoutes'))

// Start app
app.listen(port, () => { logger.info(`App listen is listening on port ${port}`) })

module.exports.app = app
