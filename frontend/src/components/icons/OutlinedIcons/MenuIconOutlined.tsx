import React, { SVGProps } from 'react'

export default function MenuIconOutlined(props: SVGProps<SVGSVGElement>) {
    return (
        <>
            <svg
                width={24}
                height={24}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                {...props}
            >
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </>
    )
}
