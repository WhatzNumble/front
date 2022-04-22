import AdminLayout from "components/Admin/AdminLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Grid, {GridColumn} from 'components/Grid';
import {User as UserType} from 'libs/types';

function User(){
    const router = useRouter();
    const [userList, setUserList] = useState<UserType[]>([]);

    const toDashboard = (id: string)=>{
        router.push(`${router.pathname}/${id}`);
    }
    
    const toDelete = (id: string)=>{
        alert(`${id} 삭제`);
    }

    const onClickRow = (e: React.MouseEvent<HTMLElement>, param: UserType)=>{
        if(e.target instanceof HTMLButtonElement){
            const {name} = e.target;
            if(name === 'detail'){
                toDashboard(param.id);
            }else if(name === 'del'){
                toDelete(param.id);
            }
        }
    }

    useEffect(()=>{
        // api 요청, 지금은 dummy data 
        setUserList([
            {id: '1', email: 'test1@tes.com', nickname: '넘블1', lastLogin: '2022.03.01'},
            {id: '2', email: 'test2@tes.com', nickname: '넘블2', lastLogin: '2022.03.01'},
            {id: '3', email: 'test3@tes.com', nickname: '넘블3', lastLogin: '2022.03.01'},
        ]);
    }, []);

    const Buttons = <>
        <button name="detail" className="detail">Dashboard</button>
        <button name="del" className="del">Delete</button>
        <style jsx>{`
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
        `}</style>
    </>;

    return (
        <AdminLayout title="유저">
            <div className="User">
                유저 페이지
                <Grid<UserType> datas={userList} onClickRow={onClickRow}>
                    <GridColumn width="160px" field="id" headerText="User ID"/>
                    <GridColumn width="160px" field="email" headerText="Email"/>
                    <GridColumn width="160px" field="nickname" headerText="Nickname"/>
                    <GridColumn width="160px" field="lastLogin" headerText="Last login"/>
                    <GridColumn width="160px" field="" headerText="Status" element={Buttons}/>
                </Grid>

                <style jsx>{`
                    .User {
                        padding: 10px;
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default User;