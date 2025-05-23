'use client'
import { Box, Divider } from '@mui/material'
import SocialCard from './socialCard'
import { useEffect, useState } from 'react'
import { apiClient } from '@/app/services/apiclient'
import followers from '@/app/mock/followers.json'

type FollowerProfile = {
    id: string
    display_name: string
    images: {
        url: string
    }[]
}

export default function Social() {
    const [followerProfiles, setFollowerProfiles] = useState<FollowerProfile[]>(
        []
    )

    const musics = [
        {
            name: "Maria I'm Drunk",
            artist: 'Travis Scott && Justin Bieber',
        },
        {
            name: 'Sorry',
            artist: 'Justin Bieber',
        },
        {
            name: 'Havana',
            artist: 'Camila Cabello',
        },
    ]

    useEffect(() => {
        async function fetchFollowers() {
            try {
                const requests = followers.map((f) =>
                    apiClient.get(`users/${f.userId}`)
                )

                const responses = await Promise.all(requests)
                const data = responses.map((res) => res.data)

                setFollowerProfiles(data)
            } catch (error) {
                console.error('Erro ao buscar perfis:', error)
            }
        }

        fetchFollowers()
    }, [])

    return (
        <Box
            sx={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ccc',
            }}
        >
            {followerProfiles.map((profile, index) => (
                <>
                    <Box sx={{ px: 1}}>
                        <SocialCard
                            key={profile.id || index}
                            urlImage={profile.images[0]?.url}
                            name={profile.display_name}
                            listenTo={`${musics[index].name} - ${musics[index].artist}`}
                        />
                    </Box>
                    <Divider />
                </>
            ))}
        </Box>
    )
}
