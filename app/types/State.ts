export type State = {
    timestamp: number
    context: {
        uri: string
        metadata: object
    }
    duration: number
    paused: boolean
    shuffle: boolean
    position: number
    loading: boolean
    repeat_mode: number
    track_window: {
        current_track: {
            id: string
            uri: string
            type: string
            uid: string
            linked_from: {
                uri: null
                id: null
            }
            media_type: string
            track_type: string
            name: string
            duration_ms: number
            artists: [
                {
                    name: string
                    uri: string
                    url: string
                },
            ]
            album: {
                name: string
                uri: string
                images: [
                    {
                        url: string
                        height: number
                        width: number
                        size: string
                    },
                    {
                        url: 'https://i.scdn.co/image/ab67616d000048518d2fd8a9ebbdb3e15ff6469d'
                        height: 64
                        width: 64
                        size: string
                    },
                    {
                        url: string
                        height: 300
                        width: 300
                        size: string
                    },
                ]
            }
            is_playable: true
        }
        next_tracks: [
            {
                id: '79aC7SzO45iUOBD647DQl5'
                uri: 'spotify:track:79aC7SzO45iUOBD647DQl5'
                type: 'track'
                uid: '39477c2970536be9'
                linked_from: {
                    uri: null
                    id: null
                }
                media_type: 'video'
                track_type: 'video'
                name: 'Baby Its You'
                duration_ms: 266129
                artists: [
                    {
                        name: 'MisterNez'
                        uri: 'spotify:artist:6JqaZz1lot2BgNxZxe3ssO'
                        url: 'https://api.spotify.com/v1/artists/6JqaZz1lot2BgNxZxe3ssO'
                    },
                ]
                album: {
                    name: 'Baby Its You'
                    uri: 'spotify:album:6Tn2eDa0OHwbBQsKiySTZq'
                    images: [
                        {
                            url: 'https://i.scdn.co/image/ab67616d0000b27333641656baa10b2eccf0beae'
                            height: 640
                            width: 640
                            size: 'UNKNOWN'
                        },
                        {
                            url: 'https://i.scdn.co/image/ab67616d0000485133641656baa10b2eccf0beae'
                            height: 64
                            width: 64
                            size: 'UNKNOWN'
                        },
                        {
                            url: 'https://i.scdn.co/image/ab67616d00001e0233641656baa10b2eccf0beae'
                            height: 300
                            width: 300
                            size: 'UNKNOWN'
                        },
                    ]
                }
                is_playable: true
            },
        ]
        previous_tracks: [
            {
                id: '3ZdJffjzJWFimSQyxgGIxN'
                uri: 'spotify:track:3ZdJffjzJWFimSQyxgGIxN'
                type: 'track'
                uid: '86052e240013b13b'
                linked_from: {
                    uri: null
                    id: null
                }
                media_type: 'video'
                track_type: 'video'
                name: 'Just A Dream'
                duration_ms: 237800
                artists: [
                    {
                        name: 'Nelly'
                        uri: 'spotify:artist:2gBjLmx6zQnFGQJCAQpRgw'
                        url: 'https://api.spotify.com/v1/artists/2gBjLmx6zQnFGQJCAQpRgw'
                    },
                ]
                album: {
                    name: '5.0'
                    uri: 'spotify:album:3mz9p3cA0Cl5oDUlpTxB0c'
                    images: [
                        {
                            url: 'https://i.scdn.co/image/ab67616d0000b273ad198c2dfdaf6b7fdc460df7'
                            height: 640
                            width: 640
                            size: 'UNKNOWN'
                        },
                        {
                            url: 'https://i.scdn.co/image/ab67616d00004851ad198c2dfdaf6b7fdc460df7'
                            height: 64
                            width: 64
                            size: 'UNKNOWN'
                        },
                        {
                            url: 'https://i.scdn.co/image/ab67616d00001e02ad198c2dfdaf6b7fdc460df7'
                            height: 300
                            width: 300
                            size: 'UNKNOWN'
                        },
                    ]
                }
                is_playable: true
            },
        ]
    }
    restrictions: {
        disallow_seeking_reasons: []
        disallow_skipping_next_reasons: []
        disallow_skipping_prev_reasons: []
        disallow_toggling_repeat_context_reasons: []
        disallow_toggling_repeat_track_reasons: []
        disallow_toggling_shuffle_reasons: []
        disallow_peeking_next_reasons: []
        disallow_peeking_prev_reasons: []
        undefined: ['not_supported_by_content_type', 'not_supported_by_device']
        disallow_resuming_reasons: ['not_paused']
    }
    disallows: {
        seeking: boolean
        skipping_next: boolean
        skipping_prev: boolean
        toggling_repeat_context: boolean
        toggling_repeat_track: boolean
        toggling_shuffle: boolean
        peeking_next: boolean
        peeking_prev: boolean
        undefined: true
        resuming: true
    }
    playback_id: 'b4592d9a461f2c69b255cca0467b65da'
    playback_quality: 'VERY_HIGH'
    playback_features: {
        hifi_status: 'NONE'
        playback_speed: {
            current: 1
            selected: 1
            restricted: true
        }
    }
    playback_speed: 1
}
