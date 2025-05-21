'use server'

import { api } from '@/app/services/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ status: 'OK' }, { status: 200 })
}
export async function POST(request: NextRequest) {
    try {
        const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
        const client_secret = process.env.CLIENT_SECRET

        const { searchParams } = new URL(request.url)
        const refreshToken = searchParams.get('refreshToken')

        const response = await api.post(
            'https://accounts.spotify.com/api/token',
            {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: client_id,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:
                        'Basic ' +
                        Buffer.from(`${client_id}:${client_secret}`).toString(
                            'base64'
                        ),
                },
            }
        )

        return NextResponse.json(response.data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
