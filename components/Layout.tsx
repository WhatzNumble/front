import Head from "next/head";
import TabBar from "./TabBar";

interface Props {
    children: React.ReactNode
    title?: string
    hasTabBar?: boolean
}

function Layout({children, title = '', hasTabBar = true}: Props){
    return (
        <div>
            <Head>
                <title>{title ? `${title} | Whatz` : 'Whatz'}</title>
            </Head>
            <main className="Layout">
                {children}
            </main>
            {hasTabBar && <TabBar/>}
            <style jsx>{`
                .Layout {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}

export default Layout;