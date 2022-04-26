import Layout from "components/Layout";
import { useRouter } from "next/router";

function Upload(){
    const router = useRouter();
    const type = router.query.type;


    return (
        <Layout title="영상 업로드" headerTitle={`${type === 'embed' ? '임베드' : '직접'} 영상 업로드`}>
            <div className="Upload">
                <style jsx>{`
                    .Upload {

                    }
                `}</style>
            </div>
        </Layout>
    );
}

export default Upload;