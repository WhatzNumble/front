import Layout from 'components/Layout'
import Toast from 'components/Toast'
import type { NextPage } from 'next'
import { useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { AppState } from 'store';
import {testActions} from 'store/test';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const {toastMessages} = useSelector((state: AppState) => state.test);
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  const onClick = ()=>{
    dispatch(testActions.pushToast(1313131));
    // setShow(true);
  }

  const getSeq = ()=>{
    let num = 0;
    return ()=> num++;
  }

  return (
    <Layout title='홈'>
      <div>
        홈
      </div>

      {toastMessages.map(msg => (
        <Toast key={getSeq()()} message={msg}/>
      ))}

      <div>
        <button onClick={onClick}>토스트</button>
        <input ref={inputRef}></input>
      </div>
    </Layout>
  )
}

export default Home
