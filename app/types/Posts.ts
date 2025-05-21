export type MusicType = {
    name?: string
    artist?: string
    image?: string
}

export type PostType = {
    from?: string
    urlImage?: string
    listenTo?: string
    postText?: string
    imgUrl?: string
    music?: MusicType
}
