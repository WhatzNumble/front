import Head from "next/head";
import Header from "./Header";
import SideBar from "./SideBar";

export const HEADER_HEIGHT = 80;

interface Props {
    children: React.ReactNode
    path?: string[]
}

function AdminLayout({children, path}: Props){
    return (
        <div>
            <Head>
                <title>Whatz</title>
            </Head>
            <Header height={HEADER_HEIGHT} path={path}/>
            <main className="AdminLayout">
                <SideBar/>
                <div className="wrapper">
                    {children}
                </div>
            </main>
            
            <style jsx>{`
                .AdminLayout {
                    display: flex;
                    height: calc(100vh - ${HEADER_HEIGHT}px);
                }

                .wrapper {
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                }
            `}</style>
        </div>
    )
}

export default AdminLayout;