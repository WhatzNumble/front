interface Props {
    title: string
    left?: React.ReactNode
    right?: React.ReactNode
    height?: number
}

function Header({title, left, right, height = 40}: Props){
    return (
        <header  className="Header">
            <h1 className="title">{title}</h1>
            <div className="left" data-header-button>{left}</div>
            <div className="right" data-header-button>{right}</div>
            <style jsx>{`
                .Header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: ${height}px;
                    font-weight: bold;
                    font-size: 13px;
                    background-color: white;
                }

                .title {
                    font-size: 16px;
                    color: #565656;
                }

                .left {
                    position: absolute;
                    left: 22px;
                }

                .right {
                    position: absolute;
                    right: 22px;
                }

                .back {
                    position: absolute;
                    left: 15px;
                    font-weight: bold;
                }
            `}</style>
            <style jsx global>{`
                [data-header-button] {
                    button {
                        background-color: transparent; 
                        color: #565656;
                        font-size: 16px;
                        font-weight: 600;
                        &:disabled {
                            color: #bbbbbb;
                        }
                    }
                }
            `}</style>
        </header>
    );
}

export default Header;