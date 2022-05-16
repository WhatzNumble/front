import { CSSTransition } from "react-transition-group";
import ReactDOM from 'react-dom';
import Modal from "components/Modal";
import useWindow from "hooks/useWindow";


interface Props {
    show: boolean
    children: React.ReactNode
    onClosePopBox: ()=> void
}

function PopBox({show, children, onClosePopBox}: Props){
    const hasWin = useWindow();

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
                        <div className="content">
                            {children}
                        </div>
                        <div className="close">
                            <button className="theme-gray" onClick={onClosePopBox}>닫기</button>
                        </div>
                        <style jsx>{`
                            .PopBox {
                                z-index: 11;
                                position: fixed;
                                top: 100%;
                                border-radius: 32px 32px 0 0;
                                background-color: var(--white);;
                                width: 100%;
                                min-height: 50px;
                                transition: .3s;
                            }

                            .content {
                                padding: 32px 10px 0 24px;
                            }

                            .close {
                                display: flex;
                                justify-content: center;
                                margin: 24px 0 18px 0;
                                button {
                                    padding: 13px 28px;
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