import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ReactNode,
} from 'react'
import { Spinner } from './Spinner'
const sizeClassNames = {
    normal: 'px-4 py-2 text-base font-medium text-sm rounded-md',
    big: 'py-2 px-6 text-sm rounded-md',
    small: 'px-2 py-1 text-xs rounded-md',
    tiny: 'px-1 text-sm rounded-md',
}

const colorClassNames = {
    primary:
        'border border-transparent shadow-sm bg-primary-500 text-white text-button focus:ring-primary-500 hover:bg-primary-600 sm:ml-3 sm:w-auto sm:text-sm hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-primary-hover',
    gray: 'border border-gray-300 shadow-sm bg-white focus:ring-gray-500 text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
}

export type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    size?: keyof typeof sizeClassNames
    color?: keyof typeof colorClassNames
    loading?: boolean
    icon?: ReactNode
    transition?: boolean
    disabled?: boolean
    children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
    size = 'normal',
    color = 'primary',
    loading,
    icon,
    transition,
    disabled,
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            disabled={disabled || loading}
            className={`flex w-full justify-center focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-${color} ${
                sizeClassNames[size]
            } ${transition ? `transition duration-500 ease-out-in` : ``} ${
                colorClassNames[color]
            }  flex items-center justify-center ${className}`}
            data-testid="button"
            {...props}
        >
            <span className={loading ? 'opacity-0' : `flex items-center`}>
                {icon ? (
                    <span className={`mr-2 items-center`}>{icon}</span>
                ) : null}
                {children}
            </span>
            {loading ? (
                <span className={`absolute`}>
                    <Spinner size={size === 'small' ? '2' : '4'} />
                </span>
            ) : null}
        </button>
    )
}

export default Button
