import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import TabBar from "./TabBar";

export const HEADER_HEIGHT = 64;
export const TAB_HEIGHT = 56;

interface Props {
    children: React.ReactNode
    title?: string
    headerTitle?: string
    headerLeft?: React.ReactNode
    headerRight?: React.ReactNode
    hasTabBar?: boolean
    tabBarTransparent?: boolean;
    showBack?: boolean
    onClickHeaderBack?: ()=> void
}

function Layout({
    children, 
    title = '', 
    headerTitle, 
    headerLeft, 
    headerRight, 
    hasTabBar = true, 
    tabBarTransparent = false, 
    showBack = false,
    onClickHeaderBack}: Props
){
    const router = useRouter();

    const onClickBack = ()=>{
        router.back();
    }

    return (
        <div className="Layout">
            <Head>
                <title>{title ? `${title} | Whatz` : 'Whatz'}</title>
            </Head>
            {headerTitle && 
                <Header 
                    title={headerTitle} 
                    left={headerLeft}
                    right={headerRight}
                    height={HEADER_HEIGHT} 
                    showBack={showBack}
                    onBackClick={onClickHeaderBack}
                />
            }
            <main className="main">
                {children}
            </main>
            {hasTabBar && <TabBar height={TAB_HEIGHT} transparent={tabBarTransparent}/>}
            <style jsx>{`
                .Layout {
                    height: 100vh;
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    background-color: black;
                    height: calc(100vh - ${(headerTitle ? HEADER_HEIGHT : 0) + (hasTabBar ? TAB_HEIGHT : 0)}px);
                }
            `}</style>
        </div>
    )
}

export default Layout;