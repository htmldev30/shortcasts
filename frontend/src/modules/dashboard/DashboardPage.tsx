import Head from 'next/head'
import DashboardHeading from '../../components/Dashboard/DashboardHeading'
import ShrinkLayout from '../../ui/ShrinkLayout'

interface DashboardPageProps {}
const DashboardPage = ({}: DashboardPageProps) => {
    return (
        <>
            <Head>
                <title>Dashboard | ShortCasts</title>
                <meta
                    name="keywords"
                    content="View analytics for your ShortCasts profile"
                />
            </Head>
            <ShrinkLayout>
                <DashboardHeading />
            </ShrinkLayout>
        </>
    )
}

export default DashboardPage
