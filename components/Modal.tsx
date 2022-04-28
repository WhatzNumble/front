import {CSSTransition} from 'react-transition-group';
import ReactDOM from 'react-dom';
import {useEffect, useState} from 'react';

interface Props {
    children: React.ReactNode
    show: boolean
    transitionTime?: number
}

function Modal({children, show, transitionTime = 200}: Props){
    const [hasWin, setHasWin] = useState(false);
    useEffect(()=>{
        setHasWin(true);
    }, []);

    return hasWin ? <>
        {children}
        {ReactDOM.createPortal(
            <CSSTransition
                in={show}
                timeout={200}
                classNames="overlay"
                unmountOnExit
            >
                <div className='overlay'>
                    <style jsx>{`
                        .overlay {
                            z-index: 10;
                            position: fixed;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0,0,0,0.4);
                        }
                
                        .overlay-enter {
                            opacity: 0;
                        }

                        .overlay-enter-active {
                            opacity: 1;
                            transition: ${transitionTime}ms;
                        }

                        .overlay-exit-active {
                            opacity: 0;
                            transition: ${transitionTime}ms;
                        }
                    `}</style>
                </div>
            </CSSTransition>,
            document.querySelector('#modal-root')!
        )}
    </> : <></>;
}

export default Modal;