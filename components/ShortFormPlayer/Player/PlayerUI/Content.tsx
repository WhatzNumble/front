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
    <div className='content'>
      {showContent ? (
        <div className='spread' onClick={toggleContent}>
          {content}
        </div>
      ) : (
        <>
          <div className='folded'>{content}</div>
          <button className='contentMore' onClick={toggleContent}>
            더보기
          </button>
        </>
      )}
      <style jsx>
        {`
          .content{
            width: 100%;
            display: flex;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: -0.002em;
            .spread{
              display: flex;
              align-items: flex-end;
              width: 100%;
              overflow: scroll;
              height: 260px;
            }
            .folded{
              width: calc(100% - 40px);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .contentMore {
              color: var(--white);
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
