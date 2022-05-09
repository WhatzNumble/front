import Image from "next/image";

interface Props {
    height?: number; 
}

function Header({height}: Props){
    return (
        <header className="Header">
            <Image src="/admin_logo.svg" width={180} height={40.2}/>
            <style jsx>{`
                .Header {
                    height: ${height}px;
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    background-color: black;
                }
            `}</style>
        </header>
    );
}

export default Header;