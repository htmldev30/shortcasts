import React from 'react'
interface ShrinkLayoutProps {
    children: React.ReactNode
}
const ShrinkLayout = ({ children }: ShrinkLayoutProps) => {
    return (
        <>
            <div className="mx-36">{children}</div>
        </>
    )
}

export default ShrinkLayout
