import Login from "components/Admin/Login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Admin(){
    const router = useRouter();

    const onLogin = ({id, pw}: {id: string, pw: string})=>{
        // 로그인 요청 추후 구현해야됨

        router.push('/admin/user');
    }

    useEffect(()=>{

    }, []);

    return (
        <main className="Admin">
            <h1 className="title">Whatz</h1>
            <Login onLogin={onLogin}/>
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