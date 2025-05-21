/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Fade,
    IconButton,
    ListSubheader,
    Menu,
    MenuItem,
    Modal,
    Typography,
} from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import { useTheme } from '@mui/material/styles'
import {
    VolumeDown as VolumeDownIcon,
    Devices as DevicesIcon,
    Computer as ComputerIcon,
    FormatListBulleted as FormatListBulletedIcon,
    SkipPrevious as SkipPreviousIcon,
    PlayArrow as PlayArrowIcon,
    SkipNext as SkipNextIcon,
} from '@mui/icons-material'
import { apiClient } from '@/app/services/apiclient'

type Device = {
    id: string
    name: string
}

type Artist = {
    name: string
}

type Track = {
    name: string
    album: {
        images: { url: string }[]
    }
    artists: Artist[]
}

export default function ExtraControls({ player }: { player: any }) {
    const [volume, setVolume] = useState(0.5)
    const [devices, setDevices] = useState<Device[]>([])
    const [queue, setQueue] = useState<Track[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<Track | null>(null)
    const [anchorElDevices, setAnchorElDevices] = useState<HTMLElement | null>(
        null
    )
    const [anchorElQueue, setAnchorElQueue] = useState<HTMLElement | null>(null)

    const theme = useTheme()

    const fetchDevices = useCallback(() => {
        apiClient
            .get('/me/player/devices')
            .then((res) => setDevices(res.data.devices))
            .catch(console.error)
    }, [])

    const fetchQueue = useCallback(() => {
        apiClient
            .get('/me/player/queue')
            .then((res) => {
                setQueue(res.data.queue)
                setCurrentPlayer(res.data.currently_playing)
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        if (!player) return
        player.getVolume().then((v: number) => setVolume(v))
        fetchQueue()
    }, [player, fetchQueue])

    useEffect(() => {
        fetchDevices()
    }, [fetchDevices])

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value)
        setVolume(newVol)
        player?.setVolume(newVol)
    }

    const handleSelectDevice = (deviceId: string) => {
        apiClient
            .put('/me/player', {
                device_ids: [deviceId],
                play: true,
            })
            .then((res) => {
                if (res.status === 204) console.log('Resumed queue on device.')
            })
            .catch(console.error)
        setAnchorElDevices(null)
    }

    return (
        <div className="flex items-center justify-end gap-4 px-2">
            {/* Queue Modal */}
            <Modal
                open={Boolean(anchorElQueue)}
                onClose={() => setAnchorElQueue(null)}
                className="flex items-center justify-center"
            >
                <div className="bg-black-700 w-full max-w-3xl rounded-md p-6 shadow-lg">
                    <h2 className="mb-4 text-center text-2xl font-light text-white">
                        Fila de reprodução
                    </h2>
                    <div className="flex flex-col gap-6 md:flex-row">
                        {currentPlayer && (
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={currentPlayer.album.images[1]?.url}
                                    alt="Album cover"
                                    sx={{ width: 240, height: 240 }}
                                />
                                <CardContent sx={{ px: 1 }}>
                                    <Typography variant="h6">
                                        {currentPlayer.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                    >
                                        {currentPlayer.artists
                                            .map((a) => a.name)
                                            .join(', ')}
                                    </Typography>
                                </CardContent>
                                <Box className="flex items-center justify-center">
                                    <IconButton>
                                        {theme.direction === 'rtl' ? (
                                            <SkipNextIcon />
                                        ) : (
                                            <SkipPreviousIcon />
                                        )}
                                    </IconButton>
                                    <IconButton>
                                        <PlayArrowIcon
                                            sx={{ height: 38, width: 38 }}
                                        />
                                    </IconButton>
                                    <IconButton>
                                        {theme.direction === 'rtl' ? (
                                            <SkipPreviousIcon />
                                        ) : (
                                            <SkipNextIcon />
                                        )}
                                    </IconButton>
                                </Box>
                            </Card>
                        )}

                        <div className="max-h-[60vh] flex-1 space-y-3 overflow-y-auto">
                            {queue.map((track, index) => (
                                <div
                                    key={index}
                                    className="bg-black-400 hover:bg-black-500 flex items-center gap-3 rounded-md p-2"
                                >
                                    <img
                                        src={track.album.images[2]?.url}
                                        alt={track.name}
                                        className="h-12 w-12 rounded-md object-cover"
                                    />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="truncate text-sm font-medium text-white">
                                            {track.name}
                                        </span>
                                        <span className="text-black-100 truncate text-xs">
                                            {track.artists[0]?.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Queue Button */}
            <IconButton
                onClick={(e) => {
                    setAnchorElQueue(e.currentTarget)
                    fetchQueue()
                }}
                sx={{ color: 'white' }}
            >
                <FormatListBulletedIcon fontSize="small" />
            </IconButton>

            {/* Devices Menu */}
            <Menu
                anchorEl={anchorElDevices}
                open={Boolean(anchorElDevices)}
                onClose={() => setAnchorElDevices(null)}
                slots={{ transition: Fade }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: '#222',
                            color: 'white',
                            fontSize: '12px',
                        },
                    },
                }}
            >
                <ListSubheader
                    sx={{
                        backgroundColor: '#222',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '16px',
                    }}
                >
                    <DevicesIcon fontSize="small" sx={{ mr: 1 }} /> Dispositivos
                    Disponíveis
                </ListSubheader>
                {devices.map((device) => (
                    <MenuItem
                        key={device.id}
                        onClick={() => handleSelectDevice(device.id)}
                        sx={{
                            '&:hover': { backgroundColor: '#333' },
                            fontSize: '14px',
                        }}
                    >
                        <ComputerIcon fontSize="small" sx={{ mr: 1 }} />
                        {device.name}
                    </MenuItem>
                ))}
            </Menu>

            {/* Devices Button */}
            <IconButton
                onClick={(e) => setAnchorElDevices(e.currentTarget)}
                sx={{ color: 'white' }}
            >
                <DevicesIcon fontSize="small" />
            </IconButton>

            {/* Volume Slider */}
            <div className="flex items-center gap-2">
                <VolumeDownIcon sx={{ color: 'white' }} />
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-[2px] w-24 cursor-pointer accent-white outline-0"
                />
            </div>
        </div>
    )
}
