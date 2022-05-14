import AdminLayout from "components/Admin/AdminLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Grid, {GridColumn} from 'components/Grid';
import {User as UserType} from 'libs/types';
import Button from "components/Admin/Button";

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
        <Button name="detail" text="상세 정보"/>
        <Button name="del" text="삭제" type="red"/>
    </>;

    return (
        <AdminLayout path={['유저']}>
            <div className="User">
                <Grid<UserType> datas={userList} onClickRow={onClickRow}>
                    <GridColumn width="160px" field="id" headerText="User ID"/>
                    <GridColumn width="160px" field="email" headerText="Email"/>
                    <GridColumn width="160px" field="nickname" headerText="Nickname"/>
                    <GridColumn width="170px" field="lastLogin" headerText="Last login"/>
                    <GridColumn width="120px" field="" headerText="Status" element={Buttons}/>
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