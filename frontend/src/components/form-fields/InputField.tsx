import React from 'react'
import { useField } from 'formik'
import { Input } from '../UIComponents/Input'
import InputErrorMessage from '../UIComponents/InputErrorMessage'

export const InputField: React.FC<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > & {
        name: string
        file?: string
        errorMsg?: string
        label?: string
        textarea?: boolean
        altErrorMsg?: string
        rows?: number
    }
> = ({ label, textarea, file, errorMsg, ref: _, className, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={`h-full w-full block ${className}`}>
            {label && file ? (
                <label className="inline-block mb-1 font-medium text-sm">
                    {label}
                </label>
            ) : label ? (
                <label className="mb-1 font-medium text-sm">{label}</label>
            ) : null}
            <Input
                error={meta.error}
                textarea={textarea}
                file={file}
                {...field}
                {...props}
            />
            {meta.error && meta.touched ? (
                <div className={`flex mt-1`}>
                    <InputErrorMessage>
                        {errorMsg || meta.error}
                    </InputErrorMessage>
                </div>
            ) : null}
        </div>
    )
}
