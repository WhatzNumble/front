import AdminLayout from "components/Admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User, Video, Constraint} from "libs/types";
import Grid, { GridColumn } from "components/Grid";
import Button from "components/Admin/Button";
import Loading from "components/Loading";
import useToastMessage from "hooks/useToastMessage";
import config from "utils/config";
import { getCookieValue } from "utils/cookie";

interface VideoType extends Pick<Video, 'videoId' | 'videoTitle' | 'videoContent' | 'videoThumbnail' | 'directDir' | 'embedLink'>{
    [key: string]: string | number | null | undefined
}

function UserDetail(){
    const {apiBaseURL} = config;
    const router = useRouter();
    const {pushToast} = useToastMessage();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
        id: '',
        email: '',
        nickname: '',
        lastLogin: '',
    });
    const [videos, setVideos] = useState<VideoType[]>([]);

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
        setLoading(true);
        try{
            const res = await fetch(`${apiBaseURL}/admin/user/${id}`, {
                headers: {
                   'x-auth-token': getCookieValue('access-token')!
                }
            });
            if(res.ok){
                const result = await res.json();
                setUser({
                    ...user,
                    id: result.userId,
                    email: result.email,
                    nickname: result.nickname,
                });
                setVideos(result.videos);
            }else{
                throw new Error();
            }
        }catch(ex){
            pushToast('조회중 문제가 발생하였습니다.');
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUser();
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
        <AdminLayout path={['유저', '상세 정보']}>
            <div className="UserDetail">
                <Grid<User> title={`상세 정보`} datas={user}>
                    <GridColumn width="160px" field="id" headerText="아이디"/>
                    <GridColumn width="160px" field="nickname" headerText="닉네임"/>
                    <GridColumn width="160px" field="email" headerText="Email"/>
                    <GridColumn width="170px" field="lastLogin" headerText="마지막 로그인"/>
                </Grid>

                <Grid<VideoType> title="업로드 영상" datas={videos} onClickRow={onClickRow}>
                    <GridColumn width="170px" field="" headerText="Type" labelFunction={labelFunction}/>
                    <GridColumn width="160px" field="videoId" headerText="Video ID"/>
                    <GridColumn width="160px" field="videoTitle" headerText="Title"/>
                    <GridColumn width="160px" field="videoContent" headerText="Description"/>
                    <GridColumn width="170px" field="videoThumbnail" headerText="Thumbnail url"/>
                    <GridColumn width="120px" field="" headerText="" element={Buttons}/>
                </Grid>
                <Loading show={loading}/>
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