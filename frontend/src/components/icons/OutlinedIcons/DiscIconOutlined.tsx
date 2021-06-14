import React, { SVGProps } from 'react'
export default function DiscIconOutlined(props: SVGProps<SVGSVGElement>) {
    return (
        <>
            <svg
                width={16}
                height={16}
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                {...props}
            >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        </>
    )
}
