import { CSSTransition } from "react-transition-group";
import ReactDOM from 'react-dom';
import Modal from "components/Modal";
import { useState, useEffect } from "react";


interface Props {
    show: boolean
    children: React.ReactNode
    onClosePopBox: ()=> void
}

function PopBox({show, children, onClosePopBox}: Props){
    const [hasWin, setHasWin] = useState(false);

    useEffect(()=>{
        setHasWin(true);
    }, []);

    return hasWin ? <>
        {ReactDOM.createPortal(
            <Modal show={show}>
                <CSSTransition
                    in={show}
                    classNames="show"
                    timeout={300}
                    unmountOnExit
                >
                    <div className="PopBox">
                        {children}
                        <div className="close">
                            <button onClick={onClosePopBox}>닫기</button>
                        </div>
                        <style jsx>{`
                            $dark: #8C8C8C;

                            .PopBox {
                                z-index: 11;
                                position: fixed;
                                top: 100%;
                                border-radius: 16px 16px 0 0;
                                padding: 3px;
                                background-color: white;
                                width: 100%;
                                min-height: 50px;
                                transition: .3s;
                            }

                            .close {
                                display: flex;
                                justify-content: center;
                                margin: 20px 0 30px 0;
                                button {
                                    border: 1px solid $dark;
                                    color: #565656;
                                    font-size: 16px;
                                    width: 130px;
                                    padding: 13px 0;
                                    border-radius: 30px;
                                    background-color: white;
                                }
                            }
            
                            .show-enter-active {
                                transform: translateY(-100%);
                            }
                            
                            .show-enter-done {
                                transform: translateY(-100%);
                            }
            
                            .show-exit-active {
                                transform: translateY(0);
                            }
                        `}</style>
                    </div>
                </CSSTransition>
            </Modal>,
            document.querySelector('#modal-root')!
        )}
    </> : <></>
}

export default PopBox;