import { Box } from '@mui/material'

export default function Search() {
    return (
        <Box
            sx={{
                flex: 1,
                maxHeight: 'calc(100vh - 155px)',
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <h1 className="m-auto">Search</h1>
        </Box>
    )
}
