// Code adapted from Kitwind.io Free UI (base) Components
// https://kitwind.io/products/kometa/components
import React from 'react'

interface CardProps {
    title: string
    description?: string
    message?: {
        alert: boolean
        description: string
    }
    children?: React.ReactNode
}

const Card = ({ children, title, message }: CardProps) => {
    return (
        <>
            <div className="overflow-hidden px-4 py-16">
                <div className="flex flex-col items-center justify-between">
                    <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                        <div className="relative">
                            <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                                <h3 className="mb-4 text-left font-semibold sm:text-center sm:mb-6 sm:text-xl">
                                    {title}
                                </h3>
                                {message ? (
                                    <span
                                        className={
                                            'text-center ' +
                                            (message.alert
                                                ? 'text-red-500'
                                                : null)
                                        }
                                    >
                                        {message.description}
                                    </span>
                                ) : null}

                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
