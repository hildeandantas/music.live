import { io } from 'socket.io-client'

export const socket = io('http://localhost:5555', {
    key: 'music.live',
    transports: ['websocket', 'polling'],
})
