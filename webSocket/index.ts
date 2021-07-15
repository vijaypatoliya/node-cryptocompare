import { Socket } from 'socket.io';
import { io } from '../index';

import { getPriceObj } from '../services/currency.service';

const getSocketEvents = async (socket: Socket, eventName: string, eventBody: any) => {
    try {
        switch (eventName) {
            case 'service-price':
                const response = await getPriceObj(eventBody)
                return { success: true, data: response };
            default:
                throw new Error('Invalid Event.')
        }
    } catch (e) {
        return { success: false, error: e.message };
    }
}
const sendSocketEvents = async (socket: Socket, emitType: string, eventName: string, eventBody: any) => {
    try {
        let response: any = {};
        switch (emitType) {
            case 'sameSokcet':
                response = await new Promise((resolve, reject) => {
                    socket.emit('server-event', { eventName, eventBody }, (response: any) => {
                        if (!response.success) reject(response.error)
                        return resolve(response);
                    })
                });
                break;
            case 'brodcastAll':
                io.sockets.emit('server-event', { eventName, eventBody })
                break;
            default:
                throw new Error('Invalid Event.');

        }
        return response;
    } catch (e) {
        console.log(e)
        return { success: false, error: e.message };
    }
}

export { getSocketEvents, sendSocketEvents };
