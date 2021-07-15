import express, { Request, Response } from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import path from 'path'
import cors from 'cors'
import http from 'http';
import { Server, Socket } from 'socket.io';

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

/** Api Routes */
app.use('/api/v1', cors(), indexRoutes)

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve('./view/index.html'));
})

/** Create http server */
const httpServer = http.createServer(app);

/** Create socket.io server */
const io = new Server(httpServer);

/** import getSocketEvents for handle incoming socket events */
import { getSocketEvents } from './webSocket/index'

/** Socket connection */
io.on('connection', (socket: Socket) => {
    socket.on('server-event', async (eventData: any, callback) => {
        callback(await getSocketEvents(socket, eventData.eventName, eventData.eventBody))
    });
});

httpServer.listen(config.PORT, () => console.log(`API listening on ${config.PORT}`))

export { io }
