import Layout from "components/Layout";
import ShortFormPlayer from "components/ShortFormPlayer";
import { Video } from "libs/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Play(){
    const router = useRouter();
    const {playList} = router.query;
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(()=>{
        if(!playList){
            let arr = router.pathname.split('/');
            arr.pop();
            router.push(arr.join('/'));
        }else{
            setVideos(JSON.parse(playList as string));
        }
    }, []);

    return (
        <Layout title="마이비디오 - 영상재생" tabBarTransparent>
            <ShortFormPlayer preLoadedVideos={videos}/>
        </Layout>
    );
}

export default Play;