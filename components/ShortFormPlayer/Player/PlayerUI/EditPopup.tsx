import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import ConfirmBox from 'components/ConfirmBox';
import useToastMessage from 'hooks/useToastMessage';

interface Props {
  isEmbed: boolean;
  videoId: number;
}

const EditPopup: React.FC<Props> = ({ videoId, isEmbed }) => {
  const { pushToast } = useToastMessage();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const onClickEdit = () => {
    Router.push({
      pathname: `/my-video/upload/${isEmbed ? 'embed' : 'self'}/`,
      query: {
        edit: true,
        videoId: videoId,
      },
    });
  };

  const onClickDelete = () => {
    setShowConfirmDelete(true);
  };

  const deleteConfirmCallBack = (confirm: boolean) => {
    if (confirm) {
      axios
        .post('/video/delete', {
          body: {
            id: videoId,
          },
        })
        .then((res) => {
          pushToast('영상을 삭제했습니다.');
          Router.push('/my-video');
        })
        .catch((err) => {
          setShowConfirmDelete(false);
          pushToast('삭제에 실패했습니다.');
        });
    } else {
      setShowConfirmDelete(false);
    }
  };
  return (
    <div className='editPopup'>
      <div className='header'>영상 수정 팝업</div>
      <div onClick={onClickEdit}>영상 수정하기</div>
      <div onClick={onClickDelete}>영상 삭제하기</div>
      <ConfirmBox
        show={showConfirmDelete}
        callback={deleteConfirmCallBack}
        message='정말 삭제하시겠습니까?'
        okText='삭제하기'
        noText='취소'
      />
      <style jsx>
        {`
          .editPopup {
            color: var(--black);
            .header {
              color: var(--gray-4);
              font-size: 12px;
              margin-bottom: 10px;
            }
            div {
              padding-top: 10px;
              color: var(--black);
              font-family: 'Spoqa Han Sans Neo';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 140%;
              /* or 22px */

              display: flex;
              align-items: center;
              letter-spacing: -0.002em;
            }
            button[class*='button-'] {
              padding: 8px 0;
              text-align: left;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EditPopup;
