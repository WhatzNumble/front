import Head from "next/head";
import TabBar from "./TabBar";

export const TAB_HEIGHT = 56;

interface Props {
    children: React.ReactNode
    title?: string
    headerTitle?: string
    hasTabBar?: boolean
}

function Layout({children, title = '', headerTitle, hasTabBar = true}: Props){

    return (
        <div className="Layout">
            <Head>
                <title>{title ? `${title} | Whatz` : 'Whatz'}</title>
            </Head>
            <main className="main">
                {headerTitle && <header className="header">{headerTitle}</header>}
                {children}
            </main>
            {hasTabBar && <TabBar height={TAB_HEIGHT}/>}
            <style jsx>{`
                .Layout {
                    height: 100vh;
                }

                .header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 35px;
                    font-weight: bold;
                    font-size: 13px;
                    background-color: #ebe9e9;
                }

                .main {
                    width: 100%;
                    height: calc(100vh - ${TAB_HEIGHT}px);
                }
            `}</style>
        </div>
    )
}

export default Layout;