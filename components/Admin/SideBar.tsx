import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MENUS = [
    {path: '/admin/user', name: '유저'},
    {path: '/admin/contents', name: '콘텐츠'},
];

function SideBar(){
    const router = useRouter();

    return (
        <nav className="SideBar">
            <ul className="nav-box">
                {MENUS.map(info => (
                    <li key={info.path}>
                        <Link href={info.path}>
                            <a>
                                <div className={`link ${router.pathname.includes(info.path) ? 'match' : ''}`}>{info.name}</div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                .SideBar {
                    background-color: rgb(75, 75, 75);
                    color: var(--white);;
                }

                .nav-box {
                    padding-top: 10px;
                }

                .link {
                    width: 150px;
                    padding: 10px;
                    font-weight: bold;
                    &:hover {
                        color: var(--primary);
                    }
                }

                .match {
                    position: relative;
                    color: var(--primary);
                    &:after {
                        position: absolute;
                        content: '◀';
                        right: 0;
                        margin-right: 15px;
                    }
                }
            `}</style>
        </nav>
    );
}

export default SideBar;