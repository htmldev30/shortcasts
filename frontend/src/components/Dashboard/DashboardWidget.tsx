import React, { ReactNode } from 'react'
import { TrendingUpIconOutlined } from '../icons/index'

const iconColors = { green: '#10B981' }

interface WidgetInfoProps {
    widgetName: string
    widgetValue: string
    widgetProgressPercentage: number
    icon: ReactNode
}
const DashboardWidget = ({
    widgetName,
    widgetValue,
    widgetProgressPercentage,
    icon,
}: WidgetInfoProps) => {
    // CONTEXT API will be used to access widget data for DASHBOARD PAGE ONLY
    // may need widgetProgressDifference

    return (
        <div className="shadow-lg xl:w-full md:w-full rounded-2xl w-36 p-4 bg-white dark:bg-gray-800">
            <div className="flex items-stretch">
                <span className="rounded-xl relative p-4 bg-highlight-500">
                    {icon}
                </span>
                <p className="text-md text-text-500 font-medium ml-2">
                    {widgetName}
                </p>
            </div>
            <div className="flex flex-col justify-start">
                <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
                    {widgetValue}
                    {/* <span className="text-sm">$</span> */}
                </p>
                <div className="flex items-center text-sm justify-end">
                    {widgetProgressPercentage > 100 ? (
                        <>
                            <TrendingUpIconOutlined
                                style={{ stroke: `${iconColors.green}` }}
                            />
                            <span className="text-green-500">
                                {widgetProgressPercentage}%
                            </span>
                        </>
                    ) : (
                        <span className="text-highlight-700">
                            {widgetProgressPercentage}%
                        </span>
                    )}
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                    <div
                        style={{
                            width: `${widgetProgressPercentage}%`,
                            maxWidth: '100%',
                        }}
                        className="absolute top-0 h-2 left-0 rounded bg-green-500"
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardWidget
