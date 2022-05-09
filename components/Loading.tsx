import useWindow from 'hooks/useWindow';
import Image from 'next/image';
import ReactDOM from 'react-dom';
import Modal from './Modal';

function Loading(){
    const hasWin = useWindow();

    return hasWin ? <>
    {ReactDOM.createPortal(
        <Modal show={true}>
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
                        animation: showup .3s cubic-bezier(.2,.81,.64,1.43);
                    }

                    @keyframes showup {
                        0% {transform: translate(-50%, -50%) scale(0.2);}
                        100% {transform: translate(-50%, -50%) scale(1);}
                    }
                `}</style>
            </div>
        </Modal>,
        document.querySelector('#modal-root')!
    )}</> : <></>
}

export default Loading;