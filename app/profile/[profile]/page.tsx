export default function Profile({
    params,
}: {
    params: Promise<{ profile: string }>
}) {
    const profile = params.then((res) => res.profile)

    return <div>{profile}</div>
}
