import Layout from "components/Layout";
import ShortFormPlayer from "components/ShortFormPlayer";
import { useRouter } from "next/router";

function Play(){
    const router = useRouter();
    const {playList} = router.query;
    const videos = JSON.parse(playList as string);

    return (
        <Layout title="좋아요 - 영상재생" tabBarTransparent>
            <ShortFormPlayer preLoadedVideos={videos}/>
        </Layout>
    );
}

export default Play;