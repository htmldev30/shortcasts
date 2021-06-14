import { useAuth0 } from '@auth0/auth0-react'
import Button from '../UIComponents/Button'
import { LoginIconOutlined } from '../icons/index'

const buttonIconColor = {
    white: '#ffffff',
}
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    return (
        <Button
            icon={
                <LoginIconOutlined style={{ stroke: buttonIconColor.white }} />
            }
            onClick={() => loginWithRedirect()}
        >
            Login
        </Button>
    )
}

export default LoginButton
