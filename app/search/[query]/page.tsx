/* eslint-disable @next/next/no-img-element */
'use client'

import { apiClient } from '@/app/services/apiclient'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { searchResult } from '@/app/types/SearchResult'
import React from 'react'

export default function Search({
    params,
}: {
    params: Promise<{ query: string }>
}) {
    const [query, setQuery] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<searchResult | null>(
        null
    )

    useEffect(() => {
        let isMounted = true

        params.then((res) => {
            if (isMounted) {
                setQuery(res.query)
            }
        })

        return () => {
            isMounted = false
        }
    }, [params])

    useEffect(() => {
        if (query) {
            setLoading(true)
            apiClient
                .get('/search', {
                    params: {
                        q: query,
                        type: 'track,artist,album,playlist',
                        limit: 10,
                        offset: 0,
                        include_external: 'audio',
                    },
                })
                .then((res) => {
                    setSearchResults(res.data)
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [query])

    function handlePlay(uri: string) {
        apiClient
            .put('/me/player/play', {
                uris: [uri],
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <Box
            sx={{
                flex: 1,
                overflow: 'auto',
                maxHeight: 'calc(100vh - 155px)',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                height: '100%',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    flex: 1,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 2,
                    overflow: 'auto',
                }}
            >
                {!loading && searchResults ? (
                    <>
                        <div className="mb-8 flex h-[300px] gap-4">
                            <div className="bg-black-400 flex flex-1/2 rounded-lg p-4">
                                <img
                                    src={
                                        searchResults?.tracks?.items[0]?.album
                                            ?.images?.[0]?.url
                                    }
                                    alt={searchResults.albums?.items[0]?.name}
                                    className="aspect-square h-20 rounded-lg object-cover"
                                />
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                    }}
                                >
                                    <Typography variant="h6">
                                        {searchResults.tracks?.items[0]?.name}
                                    </Typography>
                                </Box>
                            </div>
                            <div className="bg-black-500 flex-1/2 rounded-lg">
                                <div className="max-h-full overflow-auto">
                                    {searchResults.tracks?.items.map(
                                        (track, index) => (
                                            <div
                                                key={index}
                                                className="bg-black-600 hover:bg-black-500 flex items-start gap-3 p-3 shadow transition hover:cursor-pointer"
                                                onClick={() =>
                                                    handlePlay(track?.uri)
                                                }
                                            >
                                                <img
                                                    className="aspect-square w-12 rounded-md object-cover"
                                                    src={
                                                        track?.album
                                                            ?.images?.[2]?.url
                                                    }
                                                    alt={track?.name}
                                                />
                                                <section className="overflow-hidden">
                                                    <h1
                                                        className="truncate text-lg font-medium text-white"
                                                        title={track?.name}
                                                    >
                                                        {track?.name}
                                                    </h1>
                                                    <h2
                                                        className="text-black-300 truncate text-sm"
                                                        title={track?.artists
                                                            .map(
                                                                (artist) =>
                                                                    artist.name
                                                            )
                                                            .join(', ')}
                                                    >
                                                        {/* {track?.type} */}
                                                        {track?.artists
                                                            .map(
                                                                (artist) =>
                                                                    artist.name
                                                            )
                                                            .join(', ')}
                                                    </h2>
                                                </section>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="mb-4 text-2xl">Artists</h1>
                            <div className="flex max-h-60 flex-wrap justify-between gap-4 overflow-hidden">
                                {searchResults.artists?.items.map(
                                    (artist, index) => (
                                        <div key={index} className="w-44">
                                            <img
                                                className="mb-2 aspect-square w-full rounded-full object-cover"
                                                src={artist?.images[1]?.url}
                                                alt={artist?.name}
                                            />
                                            <section className="max-w-44">
                                                <h1
                                                    className="truncate text-lg"
                                                    title={artist?.name}
                                                >
                                                    {artist?.name}
                                                </h1>
                                                <h2 className="text-black-200 text-sm">
                                                    {artist?.type}
                                                </h2>
                                            </section>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="mb-4 text-2xl">Albuns</h1>
                            <div className="flex max-h-60 flex-wrap justify-between gap-4 overflow-hidden">
                                {searchResults.albums?.items.map(
                                    (album, index) => (
                                        <div
                                            key={index}
                                            className="w-44"
                                            onClick={() =>
                                                handlePlay(album.uri)
                                            }
                                        >
                                            <img
                                                className="mb-2 aspect-square w-full rounded-md object-cover"
                                                src={album?.images[1]?.url}
                                                alt={album?.name}
                                            />
                                            <section className="max-w-44">
                                                <h1
                                                    className="truncate text-lg"
                                                    title={album?.name}
                                                >
                                                    {album?.name}
                                                </h1>
                                                <h2 className="text-black-200 text-sm">
                                                    {album?.type}
                                                </h2>
                                            </section>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="mb-4 text-2xl">Playlists</h1>
                            <div className="flex max-h-60 flex-wrap justify-between gap-4 overflow-hidden">
                                {searchResults ? (
                                    searchResults.playlists?.items.map(
                                        (playlist, index) =>
                                            playlist && (
                                                <div
                                                    key={index}
                                                    className="w-44"
                                                    onClick={() =>
                                                        handlePlay(playlist.uri)
                                                    }
                                                >
                                                    <img
                                                        className="mb-2 aspect-square w-full rounded-md object-cover"
                                                        src={
                                                            playlist?.images[0]
                                                                ?.url
                                                        }
                                                        alt={playlist?.name}
                                                    />
                                                    <section className="max-w-44">
                                                        <h1
                                                            className="truncate text-lg"
                                                            title={
                                                                playlist?.name
                                                            }
                                                        >
                                                            {playlist?.name}
                                                        </h1>
                                                        <h2 className="text-black-200 text-sm">
                                                            {playlist?.type}
                                                        </h2>
                                                    </section>
                                                </div>
                                            )
                                    )
                                ) : (
                                    <CircularProgress variant="indeterminate" />
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <CircularProgress variant="indeterminate" />
                    </div>
                )}
            </Box>
        </Box>
    )
}
