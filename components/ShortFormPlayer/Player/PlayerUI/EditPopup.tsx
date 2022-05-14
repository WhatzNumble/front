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
  console.log(isEmbed);
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
          console.log(res.status);
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
      <h2 className='text'>영상 업로드 하기</h2>
      <button onClick={onClickEdit}>수정하기</button>
      <button onClick={onClickDelete}>삭제하기</button>
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
            color: black;
            .text {
              font-size: 14px;
              margin-bottom: 10px;
            }
            button {
              color: black;
              font-weight: bold;
              font-size: 18px;
              background-color: white;
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
