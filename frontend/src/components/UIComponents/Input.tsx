// Code from Ben Awad's DogeHouse Input example (MIT License)
// https://github.com/benawad/dogehouse/blob/staging/kibbeh/src/ui/Input.tsx
import React, { forwardRef } from 'react'

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    textarea?: boolean
    rows?: number
    error?: string
    transparent?: string
    file?: string
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, file, textarea, error, transparent, ...props }, ref) => {
        const bg = transparent ? `bg-transparent` : `bg-white`
        const ring = error
            ? `ring-1 ring-red`
            : 'focus:outline-none focus:border-muted focus:ring-2 focus:ring-highlight'
        const inputFieldClass = `w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300
        rounded shadow-sm appearance-none ${bg} ${ring} ${className} `

        return textarea ? (
            <textarea
                ref={ref as any}
                className={inputFieldClass}
                data-testid="textarea"
                {...(props as any)}
            />
        ) : file ? (
            <input type="file" {...props} />
        ) : (
            <input
                ref={ref}
                className={inputFieldClass}
                data-testid="input"
                {...props}
            />
        )
    }
)

Input.displayName = 'Input'
