import Link from "next/link";

const LINK_INFOS = [
    {path: '/', name: '홈'},
    {path: '/myVideo', name: '마이 비디오'},
    {path: '/interest', name: '관심 영상'},
    {path: '/profile', name: '프로필'},
];

function TabBar(){
    return (
        <nav className="TabBar">
            <ul className="nav-box">
                {LINK_INFOS.map(info => (
                    <li key={info.path}>
                        <Link href={info.path}>
                            <a>{info.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                .TabBar {
                    z-index: 9;
                    position: fixed;
                    bottom: 0;
                    background-color: white;
                    width: 100%;
                    box-shadow: 0 0 20px -15px black;
                }

                .nav-box {
                    display: flex;
                    justify-content: center;
                }

                li {
                    padding: 15px 15px;
                    font-size: 15px;
                    color: gray;
                }
            `}</style>
        </nav>
    )
}

export default TabBar;