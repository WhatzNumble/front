import { NextPage } from "next";
import Layout from "components/Layout";
import {useDispatch} from 'react-redux';
import {uiActions} from 'store/ui';
import ConfirmBox from "components/ConfirmBox";
import { useState } from "react";
import {CSSTransition} from "react-transition-group";

const Test2: NextPage = ()=>{
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const confirmMsg = `회원가입을 종료 하시겠습니까?
        회원가입을 종료 하시겠습니까?
        회원가입을 종료 하시겠습니까?`;

    const onClick = ()=>{
        dispatch(uiActions.pushToast({
           message: '토스트 메시지!',
        }));
    }
    
    const onClickConfirm = ()=>{
        setShow(true);
    }

    const confirmCallback = (ok: boolean)=>{
        const message = ok ? '예' : '아니오';
        dispatch(uiActions.pushToast({message}));

        setShow(false);
    }

    return (
        <Layout title="test-2">
            <div className="Test2">
                <div>
                    <button onClick={onClick}>토스트 출력</button>
                    <button onClick={onClickConfirm}>컨펌 메시지</button>
                </div>

                <ConfirmBox message={confirmMsg} show={show} callback={confirmCallback}/>

                <style jsx>{`
                    .Test2 {
                        button {
                            padding: 10px;
                            font-weight: bold;
                            margin: 5px;
                        }
                    }
                `}</style>
            </div>
        </Layout>
    );    
}

export default Test2;