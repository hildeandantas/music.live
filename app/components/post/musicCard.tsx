import { MusicType } from '@/app/types/Posts'
import { Box, Typography } from '@mui/material'

export default function MusicCard({
    music: { name, artist, image },
}: {
    music: MusicType
}) {
    return (
        <Box
            sx={{
                backgroundColor: '#efefef',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                m: 2,
                mt: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: 2,
            }}
        >
            <Box
                component="img"
                src={image}
                alt="Capa do álbum"
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    objectFit: 'cover',
                    flexShrink: 0,
                }}
            />
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    fontFamily="Poppins"
                    sx={{ color: '#333' }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    fontFamily="Poppins"
                    sx={{ color: '#666' }}
                >
                    {artist}
                </Typography>
            </Box>
        </Box>
    )
}
