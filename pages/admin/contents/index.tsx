import AdminLayout from "components/Admin/AdminLayout";
import ConfirmBox from "components/ConfirmBox";
import Loading from "components/Loading";
import { useEffect, useState } from "react";

function Contents(){
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState({show: false, msg: ''});

    const getVideos = async ()=>{
        try{
            setLoading(true);
            const res = await fetch('');
            if(res.ok){
                return await res.json();    
            }else{
                throw new Error();
            }
        }catch(ex){
            setConfirm({
                show: true,
                msg: '조회중 문제가 발생하였습니다.'
            });
            return [];
        }finally{
            setLoading(true);
        }
    }

    useEffect(()=>{

    }, []);

    return (
        <AdminLayout title="콘텐츠">
            <div className="Contents">
                콘텐츠 페이지
                
                <Loading show={loading}/>
                <ConfirmBox 
                    show={confirm.show} 
                    message={confirm.msg} 
                    callback={()=> {setConfirm({show: false, msg: ''})}} 
                    isAlert
                />

                <style jsx>{`
                    .Contents {
                        padding: 10px;
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default Contents;