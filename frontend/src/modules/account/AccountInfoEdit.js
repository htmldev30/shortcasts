import Card from '../../components/Other/Card'
import Image from 'next/image'
import AccountEditForm from './AccountEditForm'
const AccountInfoEdit = ({ userProfile }) => {
    return (
        <>
            <Card cardTitle="Account">
                <img
                    className="user-avatar"
                    src={userProfile.userProfile.avatar}
                    alt="Picture of user"
                />
                <AccountEditForm userProfile={userProfile} />
            </Card>
        </>
    )
}

export default AccountInfoEdit
