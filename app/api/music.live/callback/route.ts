'use server'
import { NextRequest, NextResponse } from 'next/server'
import queryString from 'query-string'
import { bootstrap } from 'global-agent'

process.env.GLOBAL_AGENT_HTTP_PROXY = ''
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
bootstrap()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get('code')
        const state = searchParams.get('state')

        const {
            NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
            CLIENT_SECRET,
            REDIRECT_URL,
        } = process.env

        if (state === null) {
            NextResponse.redirect(
                '/#' +
                    queryString.stringify({
                        error: 'state_mismatch',
                    })
            )
        } else {
            const response = await fetch(
                'https://accounts.spotify.com/api/token',
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization:
                            'Basic ' +
                            Buffer.from(
                                `${NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${CLIENT_SECRET}`
                            ).toString('base64'),
                    },
                    method: 'POST',
                    body: queryString.stringify({
                        code: code,
                        redirect_uri: NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
                        grant_type: 'authorization_code',
                    }),
                }
            )

            const result = await response.json()

            const homeUrl = REDIRECT_URL || '/'
            console.log(homeUrl)
            const redirect = NextResponse.redirect(homeUrl)

            redirect.cookies.set('spotifyToken', result.access_token, {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: result.expires_in,
            })

            return NextResponse.redirect(
                `${homeUrl}?token=${result.access_token}&refreshToken=${result.refresh_token}`
            )
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
