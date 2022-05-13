import Layout from "components/Layout";
import Link from "next/link";

interface Props {
    errorMsg: string
    redirect?: string
}

function Error({errorMsg, redirect = "/"}: Props){
    return (
        <Layout title="에러" hasTabBar={false}>
            <div className="Error">
                <h1 className="title">{errorMsg}</h1>
                <Link href='/'>
                    <a>
                        <button className="home theme-main">홈으로</button>
                    </a>
                </Link>
                <style jsx>{`
                    .Error {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }

                    .title {
                        color: white;
                        font-size: 20px;
                    }

                    .home {
                        margin-top: 50px;
                        width: 130px;
                    }
                `}</style>
            </div>
        </Layout>
    );
}

export default Error;