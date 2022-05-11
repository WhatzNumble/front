import Head from "next/head";
import Header from "./Header";
import SideBar from "./SideBar";

export const HEADER_HEIGHT = 80;

interface Props {
    children: React.ReactNode
}

function AdminLayout({children}: Props){
    return (
        <div>
            <Head>
                <title>Whatz</title>
            </Head>
            <Header height={HEADER_HEIGHT}/>
            <main className="AdminLayout">
                <SideBar/>
                {children}
            </main>
            
            <style jsx>{`
                .AdminLayout {
                    display: flex;
                    height: calc(100vh - ${HEADER_HEIGHT}px);
                }
            `}</style>
        </div>
    )
}

export default AdminLayout;