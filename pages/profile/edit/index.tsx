import Layout from 'components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { ReactEventHandler, useReducer } from 'react';
import { profileEditReducer, initialState } from './profileEditReducer';
import { useDispatch } from 'react-redux';
import { uiActions } from 'store/ui';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';

const CancelButton = () => {
  return <button>취소</button>;
};

const ProfileEditPage: NextPage = () => {
  const dispatch = useDispatch();
  const { nickName, userAvatar, token } = useSelector((state: AppState) => state.user);
  const [state, editorDispatch] = useReducer(profileEditReducer, {
    page: 'profile',
    nick: nickName,
    avatar: userAvatar,
    categories: [],
  });
  const { editType } = useRouter().query;
  const isSignUp = editType === 'signup';

  // useUserTypeRedirect('/', 'guest');

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    editorDispatch({ type: 'CHANGE_NICKNAME', name: e.target.value });
  };

  const handleNext = () => {
    dispatch(
      uiActions.pushToast({
        message: isSignUp ? '프로필이 생성되었습니다' : '프로필이 수정되었습니다',
      })
    );
  };

  return (
    <Layout
      headerLeft={<CancelButton />}
      headerTitle={isSignUp ? '프로필 생성하기' : '프로필 수정하기'}
      headerRight={<button onClick={() => handleNext()}>다음</button>}
    >
      <div className='profile'>
        <div className='avatar'>
          <Image src={userAvatar || '/logo.svg'} width={180} height={180} alt='user-avatar' />
          <button className='editButton'>
            <Image src='/edit_button.svg' layout='fill' alt='edit-button' />
          </button>
        </div>
        <div className='nickNameForm'>
          <input onChange={handleNickName} value={state.nick} />
          <p className='info'>
            사용하고자 하는 닉네임을 입력해주세요 <br />
            Whatz에 표시되는 이름입니다
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .profile {
            margin: 133px 0px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .avatar {
              border-radius: 50%;
              width: 180px;
              height: 180px;
              .editButton {
                position: absolute;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                left: 234px;
                top: 304px;
                background: #ffffff;
              }
            }
            .nickNameForm {
              margin-top: 48px;
              input {
                border: 0;
                border-bottom: 2px solid #8f8f8f;
                width: 315px;
                font-family: 'Apple SD Gothic Neo';
                font-style: normal;
                font-weight: 800;
                font-size: 40px;
                line-height: 40px;
                /* identical to box height, or 100% */
                text-align: center;
                letter-spacing: -0.3px;
                /* wirefram */
                color: #565656;
                &:focus {
                  outline: none;
                }
              }
              .info {
                font-family: 'Apple SD Gothic Neo';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;
                /* or 150% */
                text-align: center;
                letter-spacing: -0.3px;
                /* wirefram_light */
                color: #8c8c8c;
              }
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default ProfileEditPage;
