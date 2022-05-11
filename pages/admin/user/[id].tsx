import AdminLayout from "components/Admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { User, Video, Constraint} from "libs/types";
import Grid, { GridColumn } from "components/Grid";

interface VideoType extends Pick<Video, 'videoId' | 'videoTitle' | 'videoContent' | 'videoThumbnail' | 'directDir' | 'embedLink'>{
    [key: string]: string | number | null | undefined
}

function UserDetail(){
    const router = useRouter();
    const userList = [
        {id: '1', email: 'test1@tes.com', nickname: '넘블1', lastLogin: '2022.03.01'},
    ];
    const videoList: VideoType[] = [
        {videoId: 1, videoTitle: 'test 1', videoContent: '설명 설명 설명 설명 설명 ', videoThumbnail: 'link~~~', directDir: '', embedLink: '', videoViews: ''},
        {videoId: 2, videoTitle: 'test 2', videoContent: '설명 설명 설명 설명 설명 ', videoThumbnail: 'link~~~', directDir: '', embedLink: '', videoViews: ''},
        {videoId: 3, videoTitle: 'test 3', videoContent: '설명 설명 설명 설명 설명 ', videoThumbnail: 'link~~~', directDir: '', embedLink: '', videoViews: ''},
    ];

    const onClickRow = (e: React.MouseEvent<HTMLElement>, param: VideoType)=>{
        if(e.target instanceof HTMLButtonElement){
            alert(`삭제 ${param.videoId}`);
        }
    }

    useEffect(()=>{
    }, []);

    const Button = <>
        <button className="del">삭제</button>
        <style jsx>{`
            .del {
                width: 100px;
                padding : 6px 0;
                color: white;
                border-radius: 5px;
                transition: .2s;
                background-color: #ff3737;
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 6px -0px black;
                }
            }
        `}</style>
    </>

    return (
        <AdminLayout>
            <div className="UserDetail">
                <h2>유저 상세 페이지</h2>

                <Grid<User> title="사용자 정보" datas={userList}>
                    <GridColumn width="160px" field="id" headerText="User ID"/>
                    <GridColumn width="160px" field="email" headerText="Email"/>
                    <GridColumn width="160px" field="nickname" headerText="Nickname"/>
                    <GridColumn width="170px" field="lastLogin" headerText="Last login"/>
                </Grid>

                <Grid<VideoType> title="업로드 영상" datas={videoList} onClickRow={onClickRow}>
                    <GridColumn width="160px" field="videoId" headerText="Video ID"/>
                    <GridColumn width="160px" field="videoTitle" headerText="Title"/>
                    <GridColumn width="160px" field="videoContent" headerText="Description"/>
                    <GridColumn width="170px" field="videoThumbnail" headerText="Thumbnail url"/>
                    <GridColumn width="170px" field="directDir" headerText="Video Link"/>
                    <GridColumn width="170px" field="embedLink" headerText="Embed Link"/>
                    <GridColumn width="120px" field="" headerText="" element={Button}/>
                </Grid>

                <style jsx>{`
                    .UserDetail {
                        padding: 10px;
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default UserDetail;