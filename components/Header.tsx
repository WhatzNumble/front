import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
    title: string
    left?: React.ReactNode
    right?: React.ReactNode
    height?: number
    onBackClick?: ()=> void
    showBack?: boolean
}

function Header({title, left, right, height = 40, showBack = false, onBackClick}: Props){
    const router = useRouter();

    const onClick = ()=>{
        router.back();
        if(showBack && onBackClick){
            onBackClick();
        }
    }

    return (
        <header  className="Header">
            <h1 className="title">{title}</h1>
            {showBack && 
                <button className="left" data-header-button onClick={onClick}>
                    <Image src='/ic_back.svg' width={24} height={24} alt='back'/>
                </button>
            }
            <div className="right" data-header-button>{right}</div>
            <style jsx>{`
                .Header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: ${height}px;
                    font-size: 13px;
                    background-color: black;
                }

                .title {
                    font-weight: normal;
                    font-size: 16px;
                    color: white;
                }

                .left {
                    position: absolute;
                    left: 16px;
                    background-color: transparent;
                    padding: 0 10px 0 0;
                }

                .right {
                    position: absolute;
                    right: 8px;
                }
            `}</style>
            <style jsx global>{`
                [data-header-button] {
                    button {
                        &:disabled {
                            filter: brightness(0.5);
                        }
                    }
                }
            `}</style>
        </header>
    );
}

export default Header;