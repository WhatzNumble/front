import { NextPage } from "next";
import Layout from "components/Layout";
import {useDispatch} from 'react-redux';
import {uiActions} from 'store/ui';


const Test2: NextPage = ()=>{
    const dispatch = useDispatch();

    const onClick = ()=>{
        dispatch(uiActions.pushToast({
           message: '토스트 메시지!',
        }));
    }

    return (
        <Layout title="test-2">
            <div className="Test2">
                <div>
                    <button onClick={onClick}>토스트 출력</button>
                </div>
                <style jsx>{`
                    .Test2 {
                        button {
                            padding: 10px;
                            font-weight: bold;
                        }
                    }
                `}</style>
            </div>
        </Layout>
    );    
}

export default Test2;