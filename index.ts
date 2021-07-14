import express, { Request, Response } from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import path from 'path'
import cors from 'cors'

import config from './config'

/** Import Jobs */
require('./jobs/index');

/** DB Connection */
require('./lib/db');

/** Index Routes */
import indexRoutes from './routes/index'

const app = express()
app.use(compression())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1', cors(), indexRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Go lang Cron Service.');
})

app.listen(config.PORT, () => console.log(`API listening on ${config.PORT}`))
