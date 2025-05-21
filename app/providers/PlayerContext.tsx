/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createContext, useEffect, useRef, useState } from 'react'
import { parseCookies } from 'nookies'
import { socket } from '../services/socket'

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void
        Spotify: any
    }
}

type PlayerContextType = {
    player: any
    deviceId: string | null
}

export const PlayerContext = createContext<PlayerContextType>({
    player: null,
    deviceId: null,
})

export default function PlayerContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [player, setPlayer] = useState<any>(null)
    const [deviceId, setDeviceId] = useState<string | null>(null)
    const playerRef = useRef<any>(null) // Guarda o player para limpar depois
    const token = parseCookies().spotifyToken

    useEffect(() => {
        if (!token || playerRef.current) return

        // Evita carregar o script mais de uma vez
        const existingScript = document.getElementById('spotify-player')
        if (!existingScript) {
            const script = document.createElement('script')
            script.id = 'spotify-player'
            script.src = 'https://sdk.scdn.co/spotify-player.js'
            script.async = true
            document.body.appendChild(script)
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            const newPlayer = new window.Spotify.Player({
                name: 'Music.Live Player',
                getOAuthToken: (cb: (arg0: string) => unknown) => cb(token),
                volume: 0.1,
            })

            if (!newPlayer) return

            playerRef.current = newPlayer
            setPlayer(newPlayer)

            newPlayer.addListener(
                'ready',
                ({ device_id }: { device_id: string }) => {
                    setDeviceId(device_id)
                    socket.emit('device-ready', `deviceId: ${device_id}`)
                    console.log('Ready with Device ID', device_id)
                }
            )

            newPlayer.addListener(
                'not_ready',
                ({ device_id }: { device_id: string }) => {
                    socket.emit('device-not-ready', null)
                    console.log('Device ID has gone offline', device_id)
                }
            )

            newPlayer.connect()
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.disconnect()
                playerRef.current = null
            }
        }
    }, [token])

    return (
        <PlayerContext.Provider
            value={{
                player,
                deviceId,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}
