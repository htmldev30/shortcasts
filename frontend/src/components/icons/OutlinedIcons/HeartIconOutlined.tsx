import React, { SVGProps } from 'react'
export default function HeartIconOutlined(props: SVGProps<SVGSVGElement>) {
    return (
        <>
            <svg
                width={16}
                height={16}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                {...props}
            >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
        </>
    )
}
