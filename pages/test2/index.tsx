import { NextPage } from "next";
import Layout from "components/Layout";
import {useDispatch} from 'react-redux';
import {uiActions} from 'store/ui';
import ConfirmBox from "components/ConfirmBox";
import { useState } from "react";
import {CSSTransition} from "react-transition-group";
import PopBox from "components/PopBox";

const Test2: NextPage = ()=>{
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const confirmMsg = `회원가입을 종료 하시겠습니까?
        회원가입을 종료 하시겠습니까?
        회원가입을 종료 하시겠습니까?`;
    const confirmMsg2 = `영상은 15분을 넘을 수 없습니다.
        15분 이하의 영상만 올려주세요`;

    const onClick = ()=>{
        dispatch(uiActions.pushToast({
           message: '토스트 메시지!',
        }));
    }
    
    const onClickConfirm = ()=>{
        setShow(true);
    }
    const onClickConfirm2 = ()=>{
        setShow2(true);
    }
    const onClickConfirm3 = ()=>{
        setShow3(true);
    }
    const onClickPopBox = ()=>{
        setShow4(true);
    }

    const confirmCallback = (ok: boolean)=>{
        const message = ok ? '예' : '아니오';
        dispatch(uiActions.pushToast({message}));

        setShow(false);
    }
    const confirmCallback2 = (ok: boolean)=>{
        const message = ok ? '삭제하기' : '취소';
        dispatch(uiActions.pushToast({message}));

        setShow2(false);
    }
    const confirmCallback3 = (ok: boolean)=>{
        dispatch(uiActions.pushToast({message: '닫기'}));
        setShow3(false);
    }
    
    const onClosePopBox = ()=>{
        setShow4(false);
    }
    
    const onHeaderButtonClick = ()=>{
        dispatch(uiActions.pushToast({message: '헤더 버튼'}));
    }
    const onClickHeaderBack = ()=>{
        dispatch(uiActions.pushToast({message: '뒤로'}));
    }

    return (
        <Layout title="test-2"
            headerTitle="헤더입니다"
            headerLeft={<button onClick={onHeaderButtonClick}></button>}
            showBack={true}
            headerRight={<button className="theme-main" onClick={onHeaderButtonClick}>완료</button>}
        >
            <div className="Test2">
                <div>
                    <button onClick={onClick}>토스트 출력</button>
                    <button onClick={onClickConfirm}>컨펌 메시지</button>
                    <button onClick={onClickConfirm2}>컨펌 메시지 2</button>
                    <button onClick={onClickConfirm3}>컨펌 메시지 3</button>
                    <button onClick={onClickPopBox}>Pop Box</button>
                </div>

                <ConfirmBox message={confirmMsg} show={show} callback={confirmCallback}/>

                <ConfirmBox message='삭제 하시겠습니까?' show={show2} callback={confirmCallback2} okText='삭제하기' noText='취소'/>

                <ConfirmBox message={confirmMsg2} show={show3} callback={confirmCallback3} isAlert okText='닫기'/>

                <PopBox show={show4} onClosePopBox={onClosePopBox}>
                    <div className="pop-box">
                        <h1>타이틀</h1>
                        <pre>내용 내용 내용 내용 </pre>
                    </div>
                </PopBox>

                <style jsx>{`
                    .Test2 {
                        button {
                            padding: 3px;
                            font-weight: bold;
                            margin: 3px;
                        }
                    }

                    .pop-box {
                        padding: 20px;
                    }
                `}</style>
            </div>
        </Layout>
    );    
}

export default Test2;