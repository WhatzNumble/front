interface Props {
    title: string
    height?: number
    onClickBack: ()=> void
}

function Header({title, height = 40, onClickBack}: Props){
    return (
        <header  className="Header">
            <button className="back" onClick={onClickBack}>◀뒤로</button>
            {title}
            <style jsx>{`
                .Header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: ${height}px;
                    font-weight: bold;
                    font-size: 13px;
                    background-color: #ebe9e9;
                }

                .back {
                    position: absolute;
                    left: 15px;
                    font-weight: bold;
                }
            `}</style>
        </header>
    );
}

export default Header;