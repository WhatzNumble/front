import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from 'react-transition-group';

interface Props {
    message?: string | number
    duration?: number
}

function Toast({message = '', duration = 3}: Props){
    const [hasWin, setHasWin] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(()=>{
        setHasWin(true);
        setTimeout(()=> {
            setShow(false);
        }, duration * 1000);
    }, []);

    return hasWin ? <>
        {ReactDOM.createPortal(
            <CSSTransition
                in={show}
                timeout={200}
                classNames="toast"
                unmountOnExit
            >
                <div className="Toast">
                    {message}
                    <style jsx>{`
                        .Toast {
                            z-index: 99;
                            position: fixed;
                            top: 80%;
                            left: 50%;
                            padding: 10px 15px;
                            background-color: #00000083;
                            color: white;
                            font-size: 12px;
                            border-radius: 30px;
                        }

                        .toast-enter {
                            opacity: 0;
                            transform: translate(-50%, 0);
                        }
                        .toast-enter-active {
                            opacity: 1;
                            transform: translate(-50%, -20px);
                            transition: .2s;
                        }
                        .toast-enter-done {
                            opacity: 1;
                            transform: translate(-50%, -20px);
                        }
                        .toast-exit {
                            opacity: 1;
                            transform: translate(-50%, -20px);
                        }
                        .toast-exit-active {
                            opacity: 0;
                            transform: translate(-50%, 0);
                            transition: .2s;
                        }
                    `}</style>
                </div>
            </CSSTransition>,
            document.querySelector('#modal-root')!
        )}
    </> : <></>;
}

export default Toast;