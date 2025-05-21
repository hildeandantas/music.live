'use server'
import axios from 'axios'
import { bootstrap } from 'global-agent'

process.env.GLOBAL_AGENT_HTTP_PROXY = ''
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
bootstrap()

export const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

api.defaults.baseURL = 'https://api.spotify.com/v1'
