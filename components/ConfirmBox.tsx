import useWindow from "hooks/useWindow";
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
    const hasWin = useWindow();

    const onClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const targ = e.target as HTMLButtonElement;
        const ok = targ.name === 'ok';
        if(callback){
            callback(ok);
        }
    }

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
                            <button className="ok theme-gray" name="ok">{okText}</button>
                            {!isAlert && <button className="no theme-main" name="no">{noText}</button>}
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
                                border-radius: 32px;
                                box-shadow: 0 0 6px -3px black;
                            }
                            
                            .msg {
                                padding: 32px 16px 0 16px;
                                font-size: 16px;
                                text-align: center;
                                white-space: pre-line;
                                line-height: 24px;
                            }

                            .buttons {
                                display: flex;
                                justify-content: center;
                                margin: 20px 0 32px 0;
                                button {
                                    min-width: 100px;
                                    padding: 13px 22px;
                                    &.ok {
                                    }
                                    &.no {
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