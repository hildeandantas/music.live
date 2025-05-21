'use client'
import { useContext, useEffect, useState } from 'react'
import MusicInfo from './musicInfo'
import ControlButtons from './controlButtons'
import ExtraControls from './extraControls'
import { apiClient } from '@/app/services/apiclient'
import { PlayerContext } from '@/app/providers/PlayerContext'

export default function Player() {
    const { player, deviceId } = useContext(PlayerContext)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!deviceId) return

        apiClient
            .put('/me/player', {
                device_ids: [deviceId],
                play: false,
            })
            .then((res) => {
                if (res.status === 204) console.log('Resumed Queue sucessfully')
                else console.log(res)
            })
            .catch((err) => console.log(err))
    }, [deviceId])

    return (
        <div
            className="bg-black-900 bottom-0 grid w-full grid-cols-3 px-4 py-2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <MusicInfo player={player} />
            <ControlButtons player={player} open={open} />
            <ExtraControls player={player} />
        </div>
    )
}
