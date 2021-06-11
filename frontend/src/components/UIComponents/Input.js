import React, { forwardRef } from 'react'

export const Input = forwardRef(
    ({ className, file, textarea, error, transparent, ...props }, ref) => {
        const bg = transparent ? `bg-transparent` : `bg-white`
        const ring = error
            ? `ring-1 ring-red`
            : 'focus:outline-none focus:border-muted focus:ring-2 focus:ring-highlight'
        const inputFieldClass = `w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300
        rounded shadow-sm appearance-none ${bg} ${ring} ${className} `

        return textarea ? (
            <textarea
                ref={ref}
                className={inputFieldClass}
                data-testid="textarea"
                {...props}
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
