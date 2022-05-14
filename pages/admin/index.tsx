import Login from "components/Admin/Login";
import ConfirmBox from "components/ConfirmBox";
import Loading from "components/Loading";
import useToastMessage from "hooks/useToastMessage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "utils/config";

function Admin(){
    const router = useRouter();
    const {pushToast} = useToastMessage();
    const {apiBaseURL} = config;
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState({
        show: false,
        msg: ''
    });

    const onLogin = async ({id, pw}: {id: string, pw: string})=>{
        try{
            setLoading(true);
            const res = await fetch(`${apiBaseURL}/member/admin`, {
                method: "POST",
                body: JSON.stringify({
                    id,
                    password: pw
                })
            });
            if(res.ok){
                router.push('/admin/user');
            }else{
                throw new Error();
            }
        }catch(ex){
            setConfirm({
                show: true,
                msg: '로그인중 문제가 발생하였습니다.'
            });
        }finally{
            setLoading(false);
        }
        // router.push('/admin/user');
    }

    const confirmCallback = ()=>{
        setConfirm({...confirm, show: false});
    }

    useEffect(()=>{

    }, []);

    return (
        <main className="Admin">
            <h1 className="title">Whatz</h1>
            <Login onLogin={onLogin}/>
            <Loading show={loading}/>
            <ConfirmBox show={confirm.show} message={confirm.msg} callback={confirmCallback} isAlert/>
            <style jsx>{`
                .Admin {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .title {
                    margin-bottom: 20px;
                }
            `}</style>
        </main>
    );
}

export default Admin;