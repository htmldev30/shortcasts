const InputErrorMessage = ({ children }) => {
    return (
        <div className="flex text-red-500" data-testid="input-error-msg">
            {children}
        </div>
    )
}

export default InputErrorMessage
