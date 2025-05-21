'use server'

import { NextResponse } from 'next/server'
import { api } from '@/app/services/api'
export async function GET() {
    try {
        const response = await api.get('/me', { withCredentials: true })
        const data = await response.data

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
