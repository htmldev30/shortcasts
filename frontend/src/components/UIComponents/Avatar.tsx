export interface AvatarProps {
    avatarUrl: string
}

const Avatar = ({ avatarUrl }: AvatarProps) => {
    return (
        <img
            width={100}
            height={100}
            className="user-avatar"
            src={avatarUrl}
            alt="Picture of user"
        />
    )
}

export default Avatar
