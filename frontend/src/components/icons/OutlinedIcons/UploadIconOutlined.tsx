import React, { SVGProps } from 'react'
export default function UploadIconOutlined(props: SVGProps<SVGSVGElement>) {
    return (
        <>
            <svg
                width={16}
                height={16}
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                {...props}
            >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        </>
    )
}
