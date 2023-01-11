// Code from collaborator on this project. A friend. 
// Code also adapted from Kitwind.io Free UI (base) Components
// https://kitwind.io/products/kometa/components
import DashboardWidget from './DashboardWidget'
import {
    HeartIconOutlined,
    FollowersIconOutlined,
    HeadphonesIconOutlined,
    DiscIconOutlined,
} from '../icons/index'

const iconColors = { primary: '#E63B19' }
const DashboardHeading = () => {
    return (
        <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardWidget
                    widgetName="Ranking"
                    widgetValue="301"
                    widgetProgressPercentage={101}
                    icon={
                        <DiscIconOutlined
                            style={{
                                stroke: `${iconColors.primary}`,
                            }}
                        />
                    }
                ></DashboardWidget>
                <DashboardWidget
                    widgetName="Listeners"
                    widgetValue="22000"
                    widgetProgressPercentage={101}
                    icon={
                        <HeadphonesIconOutlined
                            style={{
                                stroke: `${iconColors.primary}`,
                            }}
                        />
                    }
                ></DashboardWidget>
                <DashboardWidget
                    widgetName="Likes"
                    widgetValue="8003"
                    widgetProgressPercentage={500}
                    icon={
                        <HeartIconOutlined
                            style={{
                                stroke: `${iconColors.primary}`,
                            }}
                        />
                    }
                ></DashboardWidget>
                <DashboardWidget
                    widgetName="Followers"
                    widgetValue="5233"
                    widgetProgressPercentage={99}
                    icon={
                        <FollowersIconOutlined
                            style={{
                                stroke: `${iconColors.primary}`,
                            }}
                        />
                    }
                ></DashboardWidget>
            </div>
        </>
    )
}

export default DashboardHeading
