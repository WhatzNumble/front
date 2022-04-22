import AdminLayout from "components/Admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";


function UserDetail(){
    const router = useRouter();

    useEffect(()=>{
    }, []);

    return (
        <AdminLayout>
            <div className="UserDetail">
                <h1>유저 상세 페이지</h1>
                {router.query.id}
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