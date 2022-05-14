import Layout from "components/Layout";
import React, { useRef, useState } from "react";
import {useDispatch} from 'react-redux';
import {uiActions} from 'store/ui';

interface Inputs {
    [key: string]: string 
    id: string
    pw: string
}

interface Invalids {
    [key: string]: boolean 
    id: boolean
    pw: boolean
}

interface Props {
    onLogin: (param: Inputs)=> void
}

function Login({onLogin}: Props){
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState<Inputs>({id: '', pw: ''});
    const [invalids, setInvalids] = useState<Invalids>({id: false, pw: false});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        });
        setInvalids({
            ...invalids,
            [name]: false
        });
    }

    const onSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        if(!validate()){
            dispatch(uiActions.pushToast({message: '아이디, 비밀번호를 모두 입력하세요.'}));
            return;
        }

        onLogin(inputs);
    }

    const validate = ()=>{
        let valid = true;
        for(let key in inputs){
            if(!inputs[key] || !inputs[key].trim()) {
                setInvalids(pre => ({
                    ...pre,
                    [key]: true
                }));
                valid = false;
            }
        }
        return valid;
    }

    return (
        <form className="Login" onSubmit={onSubmit}>
            <input 
                className={invalids.id ? 'invalid' : ''} 
                name="id" 
                onChange={onChange} 
                value={inputs.id} 
                autoComplete="off" 
                placeholder="아이디"
            />
            <input 
                className={invalids.pw ? 'invalid' : ''} 
                name="pw" 
                onChange={onChange} 
                value={inputs.pw} 
                autoComplete="off" 
                placeholder="비밀번호"
            />
            <button className="submit">로그인</button>

            <style jsx>{`
                $radius: 7px;

                .Login {
                    display: flex;
                    flex-direction: column;
                    width: 300px;
                    height: 165px;
                    padding: 20px;
                    border-radius: $radius;
                    box-shadow: 0 0 20px -10px black;
                }

                input {
                    border: 1px solid #dddddd;
                    padding: 10px;
                    outline: none;
                    transition: .2s;
                    &:first-of-type {
                        border-bottom: 0;
                        border-radius: $radius $radius 0 0;
                    }
                    &:last-of-type {
                        border-radius: 0 0 $radius $radius;
                    }
                    &::placeholder {
                        padding-left: 2px;
                    }
                }

                .submit {
                    margin-top: 15px;
                    border-radius: $radius;
                    padding: 10px 0;
                    font-weight: bold;
                    background-color: var(--black);;
                    color: var(--white);;
                    transition: .2s;
                    &:hover {
                        background-color: #5e5e5e;
                    }
                }

                .invalid {
                    border-color: red;
                }
            `}</style>
        </form>
    );
}

export default Login;