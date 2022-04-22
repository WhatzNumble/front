import AdminLayout from "components/Admin/AdminLayout";
import { useEffect, useState } from "react";

interface User {
    id: string
    email: string
    nickname: string
    lastLogin: string
}

function User(){
    const [userList, setUserList] = useState<User[]>([]);
    const headerText = ['User ID','Email','Nickname','Last login','Status']

    useEffect(()=>{
        // api 요청, 지금은 dummy data 
        setUserList([
            {id: '1', email: 'test1@tes.com', nickname: '넘블1', lastLogin: '2022.03.01'},
            {id: '2', email: 'test2@tes.com', nickname: '넘블2', lastLogin: '2022.03.01'},
            {id: '3', email: 'test3@tes.com', nickname: '넘블3', lastLogin: '2022.03.01'},
        ]);
    }, []);

    return (
        <AdminLayout title="유저">
            <div className="User">
                유저 페이지
                <ul className="user-list">
                    <li className="row header">
                        {headerText.map(txt => (
                            <div className="col">{txt}</div>
                        ))}
                    </li>
                    {userList.map(user => (
                        <li className="row">
                            <div className="col">{user.id}</div>
                            <div className="col">{user.email}</div>
                            <div className="col">{user.nickname}</div>
                            <div className="col">{user.lastLogin}</div>
                            <div className="col">
                                <button className="detail">Dashboard</button>
                                <button className="del">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <style jsx>{`
                    .User {
                        padding: 10px;
                    }
                    
                    .user-list {
                    }
                    
                    .header {
                        font-weight: bold;
                        color: white;
                        background-color: #a0a0a0 !important;
                    }

                    .row {
                        display: flex;
                        background-color: #f0f0f0;
                        transition: .2s;
                        &:hover {
                            background-color: #e2e2e2;
                        }
                    }
                    
                    .col {
                        width: 160px;
                        padding: 10px; 
                        &:not(:last-of-type) {
                            border-right: 1px solid white;
                        }
                        button {
                            padding : 6px;
                            color: white;
                            transition: .2s;
                            &:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 0 6px -0px black;
                            }
                            &.detail {
                                background-color: #4646ff;
                                margin-right: 8px;
                            }
                            &.del {
                                background-color: #ff3737;
                            }
                        }
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default User;