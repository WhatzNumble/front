import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import { screen } from "styles/screen";
import Modal from "./Modal";

interface Props {
    message: string
    callback?: (ok: boolean)=> void
    show: boolean
}

function ConfirmBox({message, callback, show}: Props){
    const [hasWin, setHasWin] = useState(false);

    const onClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const targ = e.target as HTMLButtonElement;
        const ok = targ.name === 'ok';
        if(callback){
            callback(ok);
        }
    }

    const test = '320px';

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
                            <button name="no">아니오</button>
                            <button name="ok">예</button>
                        </div>

                        <style jsx>{`
                            $gray: #dddddd;
                            $radius: 10px;

                            .ConfirmBox {
                                z-index: 98;
                                position: fixed;
                                top: 50%;
                                left: 50%;
                                width : 320px;
                                transform: translate(-50%, -50%);
                                background-color: white;
                                border-radius: $radius;
                                box-shadow: 0 0 6px -3px black;
                            }
                            
                            .msg {
                                border-bottom: 1px solid $gray;
                                padding: 20px 6px;
                                text-align: center;
                                white-space: pre-line;
                            }

                            .buttons {
                                display: flex;
                                justify-content: center;
                                button {
                                    width: 50%;
                                    padding: 20px 0;
                                    background-color: white;
                                    transition: .1s;
                                    &:first-child {
                                        border-right: 1px solid $gray;
                                        border-bottom-left-radius: $radius;
                                    }
                                    &:last-child {
                                        border-bottom-right-radius: $radius;
                                    }
                                    &:hover {
                                        background-color: #ebebeb;
                                    }
                                    &:active {
                                        background-color: $gray;
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
                                    width: 300px;
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