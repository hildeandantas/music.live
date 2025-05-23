import { GraphicEq } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'

export default function ProfileHeader({
    outline,
    urlImage,
    name,
    listenTo,
    shadow,
}: {
    outline?: boolean
    urlImage?: string
    name?: string
    listenTo?: string
    shadow?: boolean
}) {
    return (
        <Box
            sx={{
                width: '100%',
                p: 1,

                border: outline ? '1px solid #ccc' : 'none',
                borderRadius: 2,
                boxShadow: shadow ? '0 0px 4px rgba(0, 0, 0, 0.2)' : 'none',
                maxHeight: '70px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                }}
            >
                <Avatar src={urlImage ?? ''} alt={name} />
                <Box>
                    <Typography
                        fontSize={18}
                        sx={{
                            fontWeight: '500',
                            color: '#555555',
                            ':hover': {
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: 'black',
                            },
                            textOverflow: 'ellipsis',
                        }}
                        fontFamily={'Poppins, sans-serif'}
                    >
                        {name ?? 'User Name'}
                    </Typography>
                    <Typography
                        fontFamily={'Poppins, sans-serif'}
                        fontSize={16}
                        sx={{
                            display: 'flex',
                            gap: 1,
                            fontWeight: '300',
                        }}
                        className="bg-gradient-to-r from-[#C6005C] to-[#1447E6] bg-clip-text font-bold text-transparent"
                    >
                        <GraphicEq fontSize="small" color="primary" />
                        {listenTo ?? 'Artist Name'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
