import Login from "components/Admin/Login";
import { useEffect, useState } from "react";

function Admin(){
    const [isAdmin, setIsAdmin] = useState(false);
    
    const onLogin = ({id, pw}: {id: string, pw: string})=>{
        // 로그인 요청 추후 구현해야됨

        setIsAdmin(true);
    }

    useEffect(()=>{

    }, []);

    return (
        <main className="Admin">
            {isAdmin ? 
                <div>어드민 화면</div> : 
                <Login onLogin={onLogin}/>
            }
            <style jsx>{`
                .Admin {

                }
            `}</style>
        </main>
    );
}

export default Admin;