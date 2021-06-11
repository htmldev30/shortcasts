import { useAuth0 } from '@auth0/auth0-react'
import Button from '../UIComponents/Button'
import { LoginIconOutlined } from '../icons/index'

const buttonColor = {
    white: '#ffffff',
}
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    return (
        <Button onClick={() => loginWithRedirect()}>
            <LoginIconOutlined style={{ stroke: buttonColor.white }} />
            Login
        </Button>
    )
}

export default LoginButton
