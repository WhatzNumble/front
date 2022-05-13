import AdminLayout from "components/Admin/AdminLayout";
import { Video } from "libs/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ContentsDetail(){
    const router = useRouter();
    const [video, setVideo] = useState<Video>();

    const getVideo = async ()=>{
        const {id} = router.query;
        // 비디오 id로 fetch

        // 테스트용
        setVideo({
            nickname: 'test',
            profile: 'test',
            videoId: 1,
            videoLike: 12,
            videoTitle: '비디오 제목!',
            videoThumbnail: '/test_link',
            videoContent: '내용 내용 내용 내용 내용 내용 ',
            videoCreationDate: '2022.05.05',
            videoViews: 339,
            directDir: 'vd_link',
        });
    }

    useEffect(()=>{
        getVideo();
    }, []);

    return (
        <AdminLayout>
            <div className="ContentsDetail">
                비디오 아이디 : {router.query.id}
                <div className="preview">
                    <div className="img">
                        <Image src={'/icon/common/empty_img.svg'} alt="empty" layout="fill"/>
                    </div>
                    <div className="desc">
                        <h3>영상 설명</h3>
                        <p>{video?.videoContent}</p>
                    </div>
                </div>
                <style jsx>{`
                    .ContentsDetail {
                        padding: 20px;
                    }

                    .img {
                        position: relative;
                        width: 400px;
                        height: 400px;
                        border: 1px solid red;
                    }

                    .preview {
                        display: flex;
                    }

                    .desc {
                        margin-left: 20px;
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default ContentsDetail;