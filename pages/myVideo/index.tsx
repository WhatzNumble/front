import Layout, { TAB_HEIGHT } from "components/Layout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

interface Video {
    id: number
    thumbnail: string
}

interface Props {
    vd: Video[]
}

function MyVideo({}: Props){
    const router = useRouter();
    const [showButtons, setShowButtons] = useState(false);

    const onClickUpload = (e: React.MouseEvent)=>{
        e.stopPropagation();
        setShowButtons(pre => !pre);
    }
    
    const onClickBack = (e: React.MouseEvent)=>{
        setShowButtons(false);
    }

    return (
        <Layout title="마이 비디오" headerTitle="마이 비디오">
            <div className="MyVideo" onClick={onClickBack}>
                마이 비디오

                <CSSTransition
                    in={showButtons}
                    timeout={200}
                    classNames="buttons"
                    unmountOnExit
                >
                    <div className="buttons">
                        <Link href={`${router.pathname}/embed`}>
                            <button name="/embed">임베드 영상 업로드</button>
                        </Link>
                        <Link href={`${router.pathname}/self`}>
                            <button name="slef">직접 영상 업로드</button>
                        </Link>
                    </div>
                </CSSTransition>

                <button className={`upload ${showButtons ? 'turn' : ''}`} name="upload" onClick={onClickUpload}>+</button>

                <style jsx>{`
                    .MyVideo {
                        height: 100%;
                    }

                    .buttons {
                        position: fixed;
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        bottom: ${88 + TAB_HEIGHT}px;
                        button {
                            width: 50%;
                            height: 40px;
                            &:first-child {
                                margin: 0 10px;
                            }
                            &:last-child {
                                margin-right: 10px;
                            }
                        }
                    }

                    .buttons-enter {
                        opacity: 0;
                        transform: translate(100%, 0);
                    }

                    .buttons-enter-active {
                        opacity: 1;
                        transform: translate(0, 0);
                        transition: .2s;
                    }

                    .buttons-exit-active {
                        opacity: 0;
                        transform: translate(100%, 0);
                        transition: .2s;
                    }

                    .upload {
                        position: fixed;
                        background-color: #0000008f;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        color: white ;
                        font-size: 30px;
                        right: 20px;
                        bottom: ${40 + TAB_HEIGHT}px;
                        transition: .2s;
                    }

                    .turn {
                        transform: rotate(45deg);
                    }
                `}</style>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ()=>{
    return {
        props: {
            vd: []
        }
    }
}

export default MyVideo;