import { CSSTransition } from "react-transition-group";
import ReactDOM from 'react-dom';
import Modal from "components/Modal";
import { useState, useEffect } from "react";


interface Props {
    show: boolean
    children: React.ReactNode
}

function PopBox({show, children}: Props){
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
                    <div className="show">
                        {children}
                        <style jsx>{`
                            .show {
                                z-index: 11;
                                position: fixed;
                                top: 100%;
                                border-radius: 16px 16px 0 0;
                                padding: 5px;
                                background-color: white;
                                width: 100%;
                                min-height: 50px;
                                transition: .3s;
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