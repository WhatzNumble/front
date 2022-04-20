import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {useDispatch} from 'react-redux';
import {testActions} from 'store/test';

interface Props {
    message?: string | number
    duration?: number
}

function Toast({message = '', duration = 3}: Props){
    const dispatch = useDispatch();
    const [hasWin, setHasWin] = useState(false);

    useEffect(()=>{
        setHasWin(true);
        setTimeout(()=> {
            // dispatch(testActions.removeToast());
        }, duration * 1000);
    }, []);


    return hasWin ? (
        <>
            {ReactDOM.createPortal(
                <div className="Toast">
                    {message}
                    <style jsx>{`
                        .Toast {
                            position: fixed;
                            top: 60%;
                            left: 50%;
                            padding: 5px 15px;
                            background-color: #0000005e;
                            color: white;
                            border-radius: 30px;
                            animation: in ${duration}s;
                            animation-fill-mode: forwards;
                        }

                        @keyframes in {
                            0% {
                                opacity: 0;
                                transform: translate(-50%, 0);
                            }
                            10% {
                                opacity: 1;
                                transform: translate(-50%, -20px);
                            }
                            90% {
                                opacity: 1;
                                transform: translate(-50%, -20px);
                            }
                            100% {
                                opacity: 0;
                                transform: translate(-50%, 0);
                            }
                        }

                        .modal-enter  {
                            opacity: 0;
                            transform: scale(0.9);
                        }
                        .modal-enter-active  {
                            opacity: 1;
                            transform: translateX(0);
                            transition: 1.5s;
                        }
                        .modal-exit  {
                            opacity: 1;
                        }
                        .modal-exit-active  {
                            opacity: 0;
                            transform: scale(0.9);
                            transition: .5s;
                        }
                    `}</style>
                </div>,
                document.querySelector('#modal-root')!
            )}
        </>
    ) : <></>;
}

export default Toast;