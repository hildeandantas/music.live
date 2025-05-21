type images = {
    url: string
    height: number
    width: number
}

export type searchResult = {
    tracks: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                album: {
                    album_type: string
                    total_tracks: number
                    available_markets: Array<string>
                    external_urls: {
                        spotify: string
                    }
                    href: string
                    id: string
                    images: images[]
                    name: string
                    release_date: string
                    release_date_precision: string
                    restrictions: {
                        reason: string
                    }
                    type: string
                    uri: string
                    artists: [
                        {
                            external_urls: {
                                spotify: string
                            }
                            href: string
                            id: string
                            name: string
                            type: string
                            uri: string
                        },
                    ]
                }
                artists: [
                    {
                        external_urls: {
                            spotify: string
                        }
                        href: string
                        id: string
                        name: string
                        type: string
                        uri: string
                    },
                ]
                available_markets: [string]
                disc_number: number
                duration_ms: number
                explicit: boolean
                external_ids: {
                    isrc: string
                    ean: string
                    upc: string
                }
                external_urls: {
                    spotify: string
                }
                href: string
                id: string
                is_playable: boolean
                linked_from: object
                restrictions: {
                    reason: string
                }
                name: string
                popularity: number
                preview_url: string
                track_number: number
                type: string
                uri: string
                is_local: boolean
            },
        ]
    }
    artists: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                external_urls: {
                    spotify: string
                }
                followers: {
                    href: string
                    total: number
                }
                genres: Array<string>
                href: string
                id: string
                images: images[]
                name: string
                popularity: number
                type: string
                uri: string
            },
        ]
    }
    albums: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                album_type: string
                total_tracks: number
                available_markets: Array<string>
                external_urls: {
                    spotify: string
                }
                href: string
                id: string
                images: images[]
                name: string
                release_date: string
                release_date_precision: string
                restrictions: {
                    reason: string
                }
                type: string
                uri: string
                artists: [
                    {
                        external_urls: {
                            spotify: string
                        }
                        href: string
                        id: string
                        name: string
                        type: string
                        uri: string
                    },
                ]
            },
        ]
    }
    playlists: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                collaborative: boolean
                description: string
                external_urls: {
                    spotify: string
                }
                href: string
                id: string
                images: images[]
                name: string
                owner: {
                    external_urls: {
                        spotify: string
                    }
                    href: string
                    id: string
                    type: string
                    uri: string
                    display_name: string
                }
                public: boolean
                snapshot_id: string
                tracks: {
                    href: string
                    total: number
                }
                type: string
                uri: string
            },
        ]
    }
    shows: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                available_markets: [string]
                copyrights: [
                    {
                        text: string
                        type: string
                    },
                ]
                description: string
                html_description: string
                explicit: boolean
                external_urls: {
                    spotify: string
                }
                href: string
                id: string
                images: images[]
                is_externally_hosted: boolean
                languages: [string]
                media_type: string
                name: string
                publisher: string
                type: string
                uri: string
                total_episodes: number
            },
        ]
    }
    episodes: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                audio_preview_url: string
                description: string
                html_description: string
                duration_ms: 1686230
                explicit: boolean
                external_urls: {
                    spotify: string
                }
                href: string
                id: string
                images: images[]
                is_externally_hosted: boolean
                is_playable: boolean
                language: string
                languages: Array<string>
                name: string
                release_date: string
                release_date_precision: string
                resume_point: {
                    fully_played: boolean
                    resume_position_ms: number
                }
                type: string
                uri: string
                restrictions: {
                    reason: string
                }
            },
        ]
    }
    audiobooks: {
        href: string
        limit: number
        next: string
        offset: number
        previous: string
        total: number
        items: [
            {
                authors: [
                    {
                        name: string
                    },
                ]
                available_markets: [string]
                copyrights: [
                    {
                        text: string
                        type: string
                    },
                ]
                description: string
                html_description: string
                edition: string
                explicit: boolean
                external_urls: {
                    spotify: string
                }
                href: string
                id: string
                images: images[]
                languages: [string]
                media_type: string
                name: string
                narrators: [
                    {
                        name: string
                    },
                ]
                publisher: string
                type: string
                uri: string
                total_chapters: number
            },
        ]
    }
}
