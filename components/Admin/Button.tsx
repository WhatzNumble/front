interface Props {

}

function Button(){
    return <>
        <button className="admin-button"></button>
        <style jsx>{`
            .admin-button {
                width: 100px;
                padding : 6px 0;
                color: white;
                border-radius: 5px;
                transition: .2s;
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 6px -0px black;
                }
                &.detail {
                    background-color: #383838;
                    margin-bottom: 3px;
                }
                &.del {
                    background-color: #ff3737;
                }
            }
        `}</style>
    </>;
}

export default Button;