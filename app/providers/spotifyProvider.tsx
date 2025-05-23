'use client'

import { createContext, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import queryString from 'query-string'
import randomstring from 'randomstring'
import { apiClient } from '@/app/services/apiclient'
import { User } from '@/app/types/User'

type SpotifyContextType = {
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    user: User | null
}

export const SpotifyContext = createContext<SpotifyContextType>({
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    user: null,
})

export default function SpotifyProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const cookies = parseCookies()
    const [user, setUser] = useState<User | null>(null)
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const token = cookies.spotifyToken
    const refreshToken = cookies.spotifyRefreshToken

    useEffect(() => {
        const { searchParams } = new URL(window.location.href)
        const urlToken = searchParams.get('token')
        const urlRefreshToken = searchParams.get('refreshToken')

        if (!token) {
            if (urlToken && urlRefreshToken) {
                setCookie(null, 'spotifyToken', urlToken, {
                    path: '/',
                    maxAge: 3600,
                })
                setCookie(null, 'spotifyRefreshToken', urlRefreshToken, {
                    path: '/',
                })

                window.location.href = '/'
            } else {
                window.location.href =
                    'https://accounts.spotify.com/authorize?' +
                    queryString.stringify({
                        response_type: 'code',
                        client_id: client_id,
                        scope: 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private',
                        redirect_uri:
                            process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
                        state: randomstring.generate({
                            length: 16,
                            charset: 'alphabetic',
                        }),
                    })
            }
        }
    }, [client_id, token])

    useEffect(() => {
        if (!token) return

        const fetchUser = async () => {
            try {
                const response = await apiClient.get('/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setUser(response.data)
                setCookie(null, 'userData', JSON.stringify(response.data), {
                    path: '/',
                    maxAge: 3600,
                })
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            }
        }

        fetchUser()
    }, [token])

    return (
        <SpotifyContext.Provider
            value={{
                token,
                refreshToken,
                isAuthenticated: !!token,
                user,
            }}
        >
            {children}
        </SpotifyContext.Provider>
    )
}
