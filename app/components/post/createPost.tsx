'use client'
import {
    Box,
    Button,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import ProfileHeader from '../profileHeader'
import { Replay } from '@mui/icons-material'
import { MusicType } from '@/app/types/Posts'
import { useRef, useState } from 'react'
import Post from './post'

export default function CreatePost({
    from,
    urlImage,
    listenTo,
    music: { name, artist, image },
}: {
    from?: string
    urlImage?: string
    listenTo?: string
    music: MusicType
}) {
    const [open, setOpen] = useState(false)
    const [postText, setPostText] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 2,
                mb: 2,
                mt: 1,
                border: '1px solid #ccc',
            }}
        >
            <ProfileHeader
                urlImage={urlImage}
                name={from}
                listenTo={listenTo}
            />
            <Box sx={{ p: 1, pt: 0 }}>
                <TextField
                    sx={{ width: '100%', mt: 1 }}
                    label="O que você está ouvindo"
                    onChange={(e) => setPostText(e.target.value)}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <IconButton
                        disableRipple
                        sx={{
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            ':hover': { backgroundColor: '' },
                        }}
                        onClick={handleOpen}
                    >
                        <Replay />
                        <Typography>Music</Typography>
                    </IconButton>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {/* <IconButton
                    disableRipple
                    sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 2 }}
                    onClick={handleClick}
                >
                    <Image />
                    <Typography>Image</Typography>
                </IconButton> */}
                    <IconButton
                        disableRipple
                        sx={{
                            flex: 1,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                        }}
                    >
                        <Replay />
                        <Typography>Publish</Typography>
                    </IconButton>
                </Box>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        width: '40%',
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Post
                        urlImage={urlImage}
                        listenTo={listenTo}
                        from={from}
                        imgUrl={preview ?? undefined}
                        music={{ name, artist, image }}
                        postText={postText ?? undefined}
                    />
                    <Button variant="outlined" sx={{ ml: 'auto' }}>
                        Post
                    </Button>
                </Box>
            </Modal>
        </Box>
    )
}
