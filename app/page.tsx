import { Box } from '@mui/material'
import React from 'react'
import Feed from './components/feed'
import Social from './components/social/social'

export default function Home() {
    return (
        <Box
            sx={{
                flex: 1,
                overflow: 'auto',
                maxHeight: 'calc(100vh - 155px)',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                height: '100%',
            }}
        >
            <Social />
            <Feed />
            <Box
                sx={{
                    width: '30%',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                }}
            />
            
        </Box>
    )
}

{
    /* <Box
component="div"
sx={{
    position: 'fixed',
    zIndex: 1201,
    bottom: 0,
    width: '100%',
    marginTop: 'auto',
}}
>
<Player />
</Box> */
}
