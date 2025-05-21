/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiClient } from '@/app/services/apiclient'
import { IconButton, LinearProgress } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import RepeatIcon from '@mui/icons-material/Repeat'
import RepeatOneIcon from '@mui/icons-material/RepeatOne'

export default function ControlButtons({
    player,
}: {
    player: any
    open: boolean
}) {
    const [state, setState] = useState<any>(null)
    const [position, setPosition] = useState(0)

    useEffect(() => {
        if (!player) return

        const onStateChange = (state: any) => {
            if (!state) return
            setState(state)
            setPosition(state.position)
        }

        player.addListener('player_state_changed', onStateChange)
        return () =>
            player.removeListener('player_state_changed', onStateChange)
    }, [player])

    useEffect(() => {
        if (!state) return

        setPosition(state.position ?? 0)

        const interval = setInterval(() => {
            if (!state.paused) {
                setPosition((prev) => {
                    const next = prev + 1000
                    return next < state.duration ? next : state.duration
                })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [state])

    const handleRepeat = useCallback(() => {}, [])

    const handleShuffle = useCallback(() => {
        const next = !state?.shuffle
        apiClient
            .put(`/me/player/shuffle?state=${next}`)
            .catch((err) => console.error('Erro ao definir shuffle:', err))
    }, [state?.shuffle])

    const handleNext = useCallback(() => player?.nextTrack(), [player])
    const handlePrev = useCallback(() => player?.previousTrack(), [player])
    const handleTogglePlay = useCallback(() => player?.togglePlay(), [player])

    const handleSeek = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value)
            player?.seek(value)
        },
        [player]
    )

    const formatMS = (ms: number): string => {
        const totalSeconds = Math.floor(ms / 1000)
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-center text-white">
                <IconButton onClick={handleShuffle}>
                    <ShuffleIcon
                        fontSize="small"
                        sx={{ color: state?.shuffle ? 'green' : 'white' }}
                    />
                </IconButton>

                <IconButton onClick={handlePrev}>
                    <SkipPreviousIcon
                        fontSize="medium"
                        sx={{ color: 'white' }}
                    />
                </IconButton>

                <IconButton onClick={handleTogglePlay}>
                    {state?.paused ? (
                        <PlayCircleIcon
                            fontSize="large"
                            sx={{ color: 'white' }}
                        />
                    ) : (
                        <PauseCircleIcon
                            fontSize="large"
                            sx={{ color: 'white' }}
                        />
                    )}
                </IconButton>

                <IconButton onClick={handleNext}>
                    <SkipNextIcon fontSize="medium" sx={{ color: 'white' }} />
                </IconButton>

                <IconButton onClick={handleRepeat}>
                    {state?.repeat === 2 ? (
                        <RepeatOneIcon
                            fontSize="small"
                            sx={{ color: 'green' }}
                        />
                    ) : (
                        <RepeatIcon
                            fontSize="small"
                            sx={{
                                color: state?.repeat === 0 ? 'white' : 'green',
                            }}
                        />
                    )}
                </IconButton>
            </div>

            <section className="flex items-center gap-4 text-white">
                <span className="w-10 text-right">{formatMS(position)}</span>
                <div className="relative h-2 w-full">
                    <LinearProgress
                        variant="determinate"
                        value={
                            state?.duration
                                ? (position / state?.duration) * 100
                                : 0
                        }
                        sx={{
                            height: 4,
                            borderRadius: 4,
                            backgroundColor: '#333',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'white',
                            },
                        }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={state?.duration}
                        value={position}
                        onChange={handleSeek}
                        className="absolute top-0 left-0 h-2 w-full cursor-pointer opacity-0"
                    />
                </div>
                <span className="w-10">{formatMS(state?.duration ?? 0)}</span>
            </section>
        </div>
    )
}
