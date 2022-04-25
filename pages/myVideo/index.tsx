import Layout from "components/Layout";
import { GetServerSideProps } from "next";

interface Video {
    id: number

}

interface Props {

}

function MyVideo({}: Props){
    return (
        <Layout title="마이 비디오">
            <div>
                마이 비디오



                <style jsx>{`
                
                `}</style>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ()=>{
    return {
        props: {

        }
    }
}

export default MyVideo;