import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import { screen } from "styles/screen";
import Modal from "./Modal";

interface Props {
    message: string
    callback?: (ok: boolean)=> void
    show: boolean
    okText?: string
    noText?: string
    isAlert?: boolean
}

function ConfirmBox({message, callback, show, okText = '예', noText = '아니오', isAlert = false}: Props){
    const [hasWin, setHasWin] = useState(false);

    const onClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const targ = e.target as HTMLButtonElement;
        const ok = targ.name === 'ok';
        if(callback){
            callback(ok);
        }
    }

    useEffect(()=>{
        setHasWin(true);
    }, []);

    return hasWin ? <>
        {ReactDOM.createPortal(
            <Modal show={show}>
                <CSSTransition
                    in={show}
                    timeout={200}
                    classNames="confirm"
                    unmountOnExit
                >
                    <div className="ConfirmBox">
                        <div className="msg">{message}</div>
                        <div className="buttons" onClick={onClick}>
                            <button className="ok" name="ok">{okText}</button>
                            {!isAlert && <button className="no" name="no">{noText}</button>}
                        </div>

                        <style jsx>{`
                            $dark: #565656;

                            .ConfirmBox {
                                z-index: 98;
                                position: fixed;
                                top: 50%;
                                left: 50%;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                width : 310px;
                                min-height: 160px;
                                transform: translate(-50%, -50%);
                                background-color: white;
                                border-radius: 16px;
                                box-shadow: 0 0 6px -3px black;
                            }
                            
                            .msg {
                                padding: 30px 5px 10px 5px;
                                font-size: 16px;
                                text-align: center;
                                white-space: pre-line;
                                line-height: 24px;
                            }

                            .buttons {
                                display: flex;
                                justify-content: center;
                                margin: 20px 0 30px 0;
                                button {
                                    width: 105px;
                                    padding: 13px 0;
                                    background-color: white;
                                    border-radius: 50px;
                                    font-size: 16px;
                                    transition: .2s;

                                    &.ok {
                                        background-color: white;
                                        box-shadow: inset 0 0 0 1px $dark;
                                    }
                                    &.no {
                                        background-color: $dark;
                                        color: white;
                                        margin-left: 5px;
                                    }
                                }
                            }

                            .confirm-enter {
                                opacity: 0;
                                transform: translate(-50%, -50%) scale(0.9);
                            }

                            .confirm-enter-active {
                                opacity: 1;
                                transform: translate(-50%, -50%) scale(1);
                                transition: .2s;
                            }

                            .confirm-exit-active {
                                opacity: 0;
                                transform: translate(-50%, -50%) scale(0.9);
                                transition: .2s;
                            }

                            @media screen and (max-width: ${screen.galaxyS9_plus}){
                                .ConfirmBox {
                                    width: 280px;
                                }
                            }
                        `}</style>
                    </div>
                </CSSTransition>
            </Modal>,
            document.querySelector('#modal-root')!
        )}
    </> : <></>;
}

export default ConfirmBox;