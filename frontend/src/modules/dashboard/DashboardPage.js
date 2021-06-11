import Head from 'next/head'
import DashboardHeading from '../../components/Dashboard/DashboardHeading'
import ShrinkLayout from '../../ui/ShrinkLayout'
const DashboardPage = () => {
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
