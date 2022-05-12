import { useState } from 'react';

interface Props {
  content: string;
}

const Content: React.FC<Props> = ({ content }) => {
  const [showContent, setShowContent] = useState(false);
  const toggleContent = () => {
    setShowContent((prev) => !prev);
  };
  return (
    <div className='contentWrapper'>
      {showContent ? (
        <div className='showContent' onClick={toggleContent}>
          {content}
        </div>
      ) : (
        <>
          <div className='content'>{content}</div>
          <button className='contentMore' onClick={toggleContent}>
            더보기
          </button>
        </>
      )}
      <style jsx>
        {`
          .contentWrapper {
            display: flex;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: -0.002em;
            .showContent {
              height: auto;
              overflow: scroll;
              height: 260px;
            }
            .content {
              width: calc(100% - 40px);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .contentMore {
              background: inherit;
              border: none;
              box-shadow: none;
              overflow: visible;
              cursor: pointer;
              padding: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Content;
