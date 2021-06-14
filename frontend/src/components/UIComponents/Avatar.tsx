export interface AvatarProps {
    avatarUrl: string
}

const Avatar = ({ avatarUrl }: AvatarProps) => {
    return <img className="user-avatar" src={avatarUrl} alt="Picture of user" />
}

export default Avatar
