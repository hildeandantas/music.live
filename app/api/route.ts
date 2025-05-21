'use server'
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ status: 'OK' }, { status: 200 })
}

export async function POST(req: Request) {
    const body = await req.json()
    return NextResponse.json({ message: `POST recebido de ${body.nome}` })
}
