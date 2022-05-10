import useWindow from 'hooks/useWindow';
import Image from 'next/image';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from './Modal';

interface Props {
    show: boolean
}

function Loading({show}: Props){
    const hasWin = useWindow();

    return hasWin ? <>
    {ReactDOM.createPortal(
        <Modal show={show}>
            <CSSTransition 
                in={show}
                classNames='show'
                timeout={300}
                unmountOnExit
            >
                <div className='Loading'>
                    <Image src='/loading.gif' layout='fill'/>
                    <style jsx>{`
                        .Loading {
                            z-index: 97;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 35px;
                            height: 35px;
                            transform: translate(-50%, -50%);
                        }

                        .show-enter {
                            opacity: 0;
                            transform: translate(-50%, -50%) scale(0.3);
                        }

                        .show-enter-active {
                            opacity: 1;
                            transform: translate(-50%, -50%) scale(1);
                            transition: .2s;
                        }

                        .show-exit-active {
                            opacity: 0;
                            transform: translate(-50%, -50%) scale(0.3);
                            transition: .2s;
                        }
                    `}</style>
                </div>
            </CSSTransition>
        </Modal>,
        document.querySelector('#modal-root')!
    )}</> : <></>
}

export default Loading;