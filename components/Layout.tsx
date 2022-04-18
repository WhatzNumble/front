import Head from "next/head";
import TabBar from "./TabBar";

interface Props {
    children: JSX.Element | JSX.Element[]
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
                {hasTabBar && <TabBar/>}
            </main>
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