import { Box } from '@mui/material'
import { Poppins } from 'next/font/google'
import './globals.css'

import MiniDrawer from './components/MiniDrawer'
import PlayerContextProvider from './providers/PlayerContext'
import SpotifyProvider from './providers/spotifyProvider'
import Player from './components/webPlayer/player'

const popins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html className={popins.className} lang="pt-br">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Music.live</title>
            </head>

            <body className={`h-screen w-full overflow-hidden antialiased`}>
                <SpotifyProvider>
                    <PlayerContextProvider>
                        <MiniDrawer>
                            <Box sx={{ height: '100%' }}>
                                {children}
                                <Player />
                            </Box>
                        </MiniDrawer>
                    </PlayerContextProvider>
                </SpotifyProvider>
            </body>
        </html>
    )
}
