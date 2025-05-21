import ProfileHeader from '../profileHeader'

export default function SocialCard({
    urlImage,
    name,
    listenTo,
}: {
    urlImage?: string
    name?: string
    listenTo?: string
}) {
    return (
        <ProfileHeader
            urlImage={urlImage}
            name={name}
            listenTo={listenTo}
            outline
        />
    )
}
