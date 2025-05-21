import { Box, Divider, Typography } from '@mui/material'
import ProfileHeader from '../profileHeader'
import {
    FavoriteBorder,
    ModeCommentOutlined,
    Replay,
} from '@mui/icons-material'
import { PostType } from '@/app/types/Posts'
import MusicCard from './musicCard'

export default function Post({
    from,
    urlImage,
    listenTo,
    postText,
    imgUrl,
    music,
}: PostType) {
    return (
        <Box sx={{ mb: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <ProfileHeader
                urlImage={urlImage}
                name={from}
                listenTo={listenTo}
            />
            {postText && (
                <Typography
                    sx={{
                        ml: '16px',
                        mr: '16px',
                        paddingBottom: 1,
                        paddingLeft: 0,
                    }}
                >
                    {postText}
                </Typography>
            )}
            {music && <MusicCard music={music} />}
            {imgUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imgUrl}
                    alt="Post"
                    style={{ width: '100%', height: 'auto' }}
                />
            )}

            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingX: 2,
                    paddingY: 1,
                }}
            >
                <FavoriteBorder />
                <ModeCommentOutlined />
                <Replay />
            </Box>
        </Box>
    )
}
