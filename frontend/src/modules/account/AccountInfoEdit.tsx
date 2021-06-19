import Card from '../../components/UIComponents/Card'
import Avatar from '../../components/UIComponents/Avatar'
import AccountEditForm from './AccountEditForm'
const AccountInfoEdit = ({ userProfile }) => {
    return (
        <>
            <Card title="My Account">
                <Avatar avatarUrl={userProfile.avatar} />

                <AccountEditForm userProfile={userProfile} />
            </Card>
        </>
    )
}

export default AccountInfoEdit
