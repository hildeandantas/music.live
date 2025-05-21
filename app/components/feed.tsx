'use client'
import React, { useContext, useEffect, useState } from 'react'
import Post from './post/post'
import CreatePost from './post/createPost'
import { Box } from '@mui/material'
import { SpotifyContext } from '../providers/spotifyProvider'
import { PlayerContext } from '../providers/PlayerContext'
import { CurrentTrack } from '../types/CurrentTrack'

export default function Feed() {
    const { user } = useContext(SpotifyContext)
    const { player } = useContext(PlayerContext)

    const [current_track, setTrack] = useState<CurrentTrack | null>(null)
    // const [posts, setPosts] = useState([])

    useEffect(() => {
        if (!player) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <Box
            sx={{
                width: '50%',
                overflow: 'auto',
                paddingX: 1,
                border: '1px solid #ccc',
                borderRadius: 2,
            }}
        >
            <CreatePost
                from={user?.display_name}
                urlImage={user?.images?.[0]?.url}
                listenTo={`${current_track?.name} - ${current_track?.artists?.[0]?.name}`}
                music={{
                    name: current_track?.name,
                    artist: current_track?.artists?.[0]?.name,
                    image: current_track?.album?.images?.[0]?.url,
                }}
            />
            <Post
                from={user?.display_name}
                urlImage={user?.images?.[0]?.url}
                listenTo={`${current_track?.name} - ${current_track?.artists?.[0]?.name}`}
                postText="What Are you listening to?"
            />
            <Post
                from={user?.display_name}
                urlImage={user?.images?.[0]?.url}
                listenTo={`${current_track?.name} - ${current_track?.artists?.[0]?.name}`}
                postText="What Are you listening to?"
                imgUrl="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            />
            <Post
                from={user?.display_name}
                urlImage={user?.images?.[0]?.url}
                listenTo={`${current_track?.name} - ${current_track?.artists?.[0]?.name}`}
                postText="I love Xamã"
                music={{
                    name: 'Sagitário',
                    artist: 'Xamã',
                    image: 'https://i.scdn.co/image/ab67616d0000b2733eb1cf8913802f86b98bf6c4',
                }}
            />
            {/* {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                posts.map((post: any, index: number) => (
                    <Post
                        key={index}
                        from={'John Doe'}
                        urlImage={'/static/images/avatar/1.jpg'}
                        postText={post.body}
                    />
                ))
            } */}
        </Box>
    )
}
