import AdminLayout from "components/Admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { User, Video, Constraint} from "libs/types";
import Grid, { GridColumn } from "components/Grid";
import Button from "components/Admin/Button";

interface VideoType extends Pick<Video, 'videoId' | 'videoTitle' | 'videoContent' | 'videoThumbnail' | 'directDir' | 'embedLink'>{
    [key: string]: string | number | null | undefined
}

function UserDetail(){
    const router = useRouter();
    const userList = [
        {id: '1', email: 'test1@tes.com', nickname: '넘블1', lastLogin: '2022.03.01'},
    ];
    const videoList: VideoType[] = [
        {videoId: 1, videoTitle: 'test 1', videoContent: '설명 설명 설명 설명 설명 ', videoThumbnail: 'link~~~', directDir: '', embedLink: 'aaa', videoViews: ''},
        {videoId: 2, videoTitle: 'test 2', videoContent: '설명 설명 설명 설명 설명 ', videoThumbnail: 'link~~~', directDir: '', embedLink: 'sss', videoViews: ''},
        {videoId: 3, videoTitle: 'test 3', videoContent: '설명 설명 설명 설명 설명 ', videoThumbnail: 'link~~~', directDir: 'ddd', embedLink: '', videoViews: ''},
    ];

    const onClickRow = (e: React.MouseEvent<HTMLElement>, param: VideoType)=>{
        if(e.target instanceof HTMLButtonElement){
            alert(`삭제 ${param.videoId}`);
        }
    }

    const labelFunction = (data: VideoType)=>{
        return data.embedLink ? 'Embed' : 'Self';
    }

    const getUser = async ()=>{
        const {id} = router.query;
        // id로 유저정보 fetch
    }

    useEffect(()=>{
    }, []);

    const Buttons = <>
        <Button text="삭제" type="red"/>
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
        <AdminLayout path={['유저', '상세정보']}>
            <div className="UserDetail">
                <Grid<User> title={`상세 정보`} datas={userList}>
                    <GridColumn width="160px" field="id" headerText="아이디"/>
                    <GridColumn width="160px" field="nickname" headerText="닉네임"/>
                    <GridColumn width="160px" field="email" headerText="Email"/>
                    <GridColumn width="170px" field="lastLogin" headerText="마지막 로그인"/>
                </Grid>

                <Grid<VideoType> title="업로드 영상" datas={videoList} onClickRow={onClickRow}>
                    <GridColumn width="170px" field="" headerText="Type" labelFunction={labelFunction}/>
                    <GridColumn width="160px" field="videoId" headerText="Video ID"/>
                    <GridColumn width="160px" field="videoTitle" headerText="Title"/>
                    <GridColumn width="160px" field="videoContent" headerText="Description"/>
                    <GridColumn width="170px" field="videoThumbnail" headerText="Thumbnail url"/>
                    <GridColumn width="120px" field="" headerText="" element={Buttons}/>
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