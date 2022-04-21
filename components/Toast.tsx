import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {useDispatch} from 'react-redux';
import {uiActions} from 'store/ui';

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
            dispatch(uiActions.removeToast());
        }, duration * 1000);
    }, []);

    return hasWin ? <>
        {ReactDOM.createPortal(
            <div className="Toast">
                {message}
                <style jsx>{`
                    .Toast {
                        z-index: 99;
                        position: fixed;
                        top: 60%;
                        left: 50%;
                        padding: 10px 15px;
                        background-color: #00000083;
                        color: white;
                        font-size: 12px;
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
                `}</style>
            </div>,
            document.querySelector('#modal-root')!
        )}
    </> : <></>;
}

export default Toast;