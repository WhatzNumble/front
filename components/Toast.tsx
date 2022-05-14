import useWindow from "hooks/useWindow";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from 'react-transition-group';

interface Props {
    message?: string | number
    duration?: number
}

function Toast({message = '', duration = 2.8}: Props){
    const hasWin = useWindow();
    const [show, setShow] = useState(true);

    useEffect(()=>{
        setTimeout(()=> {
            setShow(false);
        }, duration * 1000);
    }, []);

    return hasWin ? <>
        {ReactDOM.createPortal(
            <CSSTransition
                in={show}
                timeout={300}
                classNames="toast"
                unmountOnExit
            >
                <div className="Toast">
                    {message}
                    <style jsx>{`
                        .Toast {
                            z-index: 99;
                            position: fixed;
                            bottom: 15%;
                            left: 50%;
                            width: fit-content;
                            max-width: calc(100% - 10px);
                            padding: 10px 20px;
                            background-color: #2c2c2c9a;
                            color: var(--white);;
                            font-size: 16px;
                            border-radius: 30px;
                        }

                        .toast-enter {
                            opacity: 0;
                            transform: translate(-50%, 0);
                        }
                        .toast-enter-active {
                            opacity: 1;
                            transform: translate(-50%, -20px);
                            transition: .3s;
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
                            transition: .3s;
                        }
                    `}</style>
                </div>
            </CSSTransition>,
            document.querySelector('#modal-root')!
        )}
    </> : <></>;
}

export default Toast;