export class CreateUserProfileDto {
    readonly username: string
    readonly displayName: string
    readonly bio: string
    readonly avatar: string
    readonly isVerified: boolean
    readonly userId: string
}
