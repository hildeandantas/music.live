import axios from 'axios'
import { parseCookies } from 'nookies'

const cookie = parseCookies()
const token = cookie.spotifyToken
// const refreshToken = cookie.spotifyRefreshToken

export const apiClient = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error)
        // if (error.response.status === 401) {
        //     fetch(
        //         `http://localhost:3000/api/music.live/refreshToken?refreshToken=${refreshToken}`,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         }
        //     )
        //         .then((response) => response.json())
        //         .then((data) => {
        //             setCookie(null, 'spotifyToken', data.access_token, {
        //                 path: '/',
        //                 maxAge: 3600,
        //             })
        //         })
        //         .catch((error) => console.error(error))
        // }
    }
)
