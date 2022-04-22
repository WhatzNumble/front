interface Props {
    height?: 60; 
}

function Header({height}: Props){
    return (
        <header className="Header">
            <div className="logo">로고</div>
            <style jsx>{`
                .Header {
                    height: ${height}px;
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    border-bottom: 1px solid black;
                }

                .logo {
                    padding: 10px;
                    border: 1px solid black;
                    background-color: black;
                    color: white;
                    font-weight: bold;
                }
            `}</style>
        </header>
    );
}

export default Header;