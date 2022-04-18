import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "store/index";
import { testActions } from "store/test";

import Video from "components/Video";

const Test: NextPage = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state: AppState) => state.test);

  const onClick = () => {
    dispatch(testActions.setCount(count + 1));
  };

  return (
    <div className='Test'>
      <h1 className='title'>테스트에요~</h1>
      <button onClick={onClick}>{count}</button>
      <style jsx>{`
        .Test {
          .title {
            color: blue;
          }
        }
      `}</style>
      <Video isEmbed videoSrc='uwlXQRWu54E' />
    </div>
  );
};

export default Test;
