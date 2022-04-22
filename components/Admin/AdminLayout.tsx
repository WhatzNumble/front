import Head from "next/head";
import Header from "./Header";
import SideBar from "./SideBar";

interface Props {
    children: React.ReactNode
    title?: string
}

function AdminLayout({children, title = ''}: Props){
    const headerHeight = 60;

    return (
        <div>
            <Head>
                <title>{title ? `${title} | Whatz` : 'Whatz'}</title>
            </Head>
            <Header height={headerHeight}/>
            <main className="AdminLayout">
                <SideBar/>
                {children}
            </main>
            
            <style jsx>{`
                .AdminLayout {
                    display: flex;
                    height: calc(100vh - ${headerHeight}px);
                }
            `}</style>
        </div>
    )
}

export default AdminLayout;