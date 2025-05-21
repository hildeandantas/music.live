/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { CurrentTrack } from '@/app/types/CurrentTrack'
import { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'

export default function MusicInfo({ player }: { player: any }) {
    const [current_track, setTrack] = useState<CurrentTrack | null>(null)

    useEffect(() => {
        if (!player) return

        const onStateChange = (state: any) => {
            if (!state) return
            setTrack(state.track_window.current_track)
        }

        player.addListener('player_state_changed', onStateChange)

        return () => {
            player.removeListener('player_state_changed', onStateChange)
        }
    }, [player])

    return (
        <div className="flex items-center gap-4 text-white">
            {current_track?.album?.images[0]?.url ? (
                <img
                    className="h-12 w-12"
                    src={current_track.album.images[0].url}
                    alt="album"
                />
            ) : (
                <Skeleton
                    variant="rectangular"
                    width={48}
                    height={48}
                    animation="wave"
                    sx={{ bgcolor: 'grey.800' }}
                />
            )}
            <section>
                <h1>
                    {current_track?.name ? (
                        current_track.name
                    ) : (
                        <Skeleton
                            variant="text"
                            width={100}
                            height={18}
                            animation="wave"
                            sx={{ bgcolor: 'grey.800' }}
                        />
                    )}
                </h1>

                <p className="text-black-200 text-sm">
                    {current_track?.artists ? (
                        current_track?.artists
                            ?.map((artist: { name: string }) => artist.name)
                            ?.join(', ')
                    ) : (
                        <Skeleton
                            variant="text"
                            width={100}
                            height={18}
                            animation="wave"
                            sx={{ bgcolor: 'grey.800' }}
                        />
                    )}
                </p>
            </section>
        </div>
    )
}
