import Card from '../../components/UIComponents/Card'
import Avatar from '../../components/UIComponents/Avatar'
import AccountEditForm from './AccountEditForm'

const AccountInfoEdit = ({ userProfile }) => {
    const isVerified: boolean = userProfile.isVerified
    const message = {
        alert: true,
        description: 'Please verify your email',
    }

    return (
        <>
            <Card title="My Account" message={isVerified ? null : message}>
                <Avatar avatarUrl={userProfile.avatar} />

                <AccountEditForm userProfile={userProfile} />
            </Card>
        </>
    )
}

export default AccountInfoEdit
