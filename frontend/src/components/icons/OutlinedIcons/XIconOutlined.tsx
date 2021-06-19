import React, { SVGProps } from 'react'

export default function XIconOutlined(props: SVGProps<SVGSVGElement>) {
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
                <path d="M6 18L18 6M6 6l12 12" />
            </svg>
        </>
    )
}
