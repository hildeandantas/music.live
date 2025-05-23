import { Box } from '@mui/material'
import Feed from '@/app/components/feed'
import Social from '@/app/components/social/social'
export default function Home() {
    return (
        <Box
            sx={{
                flex: 1,
                overflow: 'auto',
                maxHeight: 'calc(100vh - 155px)',
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    width: '30%',
                    border: '1px solid #ccc',
                }}
            />
            <Feed />
            <Social />
        </Box>
    )
}
