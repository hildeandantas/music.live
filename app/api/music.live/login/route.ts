'use server'

import { NextResponse } from 'next/server'
import queryString from 'query-string'
import randomstring from 'randomstring'
import { bootstrap } from 'global-agent'

process.env.GLOBAL_AGENT_HTTP_PROXY = ''
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
bootstrap()

export async function GET() {
    try {
        return NextResponse.redirect(
            'https://accounts.spotify.com/authorize?' +
                queryString.stringify({
                    response_type: 'code',
                    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
                    scope: 'user-read-private user-read-email',
                    redirect_uri:
                        process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
                    state: randomstring.generate({
                        length: 16,
                        charset: 'alphabetic',
                    }),
                })
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
