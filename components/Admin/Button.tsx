import React from "react";
import CSS from "csstype";

interface Props {
    text: string
    name?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>)=> void
    style?: CSS.Properties
    type?: 'red' | 'dark'
}

function Button({text, name, onClick, style, type = 'dark'}: Props){
    const onClickButton = (e: React.MouseEvent<HTMLButtonElement>)=>{
        if(onClick){
            onClick(e);
        }
    }

    return <>
        <button 
            style={style} 
            className={`admin-button ${type}`} 
            name={name} 
            onClick={onClickButton}
        >
            {text}
        </button>
        <style jsx>{`
            .admin-button {
                width: 100px;
                padding : 6px 0;
                color: white;
                border-radius: 5px;
                margin-bottom: 3px;
                transition: .2s;
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 6px -0px black;
                }
                &.dark {
                    background-color: #383838;
                }
                &.red {
                    background-color: #ff3737;
                }
            }
        `}</style>
    </>;
}

export default Button;