import React, { SVGProps } from 'react'

export default function UserIconOutlined(props: SVGProps<SVGSVGElement>) {
    return (
        <>
            <svg
                width={16}
                height={16}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                {...props}
            >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </>
    )
}
