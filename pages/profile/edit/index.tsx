import Layout from 'components/Layout';
import { NextPage } from 'next';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from 'store/ui';
import ProfileAvatar from '../ProfileAvatar';

import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import { userActions } from 'store/user';

const CancelButton = () => {
  return <button>취소</button>;
};

const CompleteButton = () => {

}

const ProfileEditPage: NextPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: AppState) => state.user);
  const [nickName, setNickName] = useState<string>(userState.nickName);
  const [avatarSrc, setAvatarSrc] = useState<string>(userState.userAvatar);

  const { editType } = useRouter().query;
  const isSignUp = editType === 'signup';

  // useUserTypeRedirect('/', 'guest'); //guest 일 경우 홈으로 redirect

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    // editorDispatch({ type: 'CHANGE_NICKNAME', name: e.target.value });
  };

  const successUpdateProfile = () => {
    //dispatch(userActions.loadUser(response));
    Router.push('/');
    dispatch(
      uiActions.pushToast({
        message: isSignUp ? '프로필이 생성되었습니다' : '프로필이 수정되었습니다',
      })
    );
  };

  const failUpdateProfile = () => {
    Router.push('/');
    dispatch(
      uiActions.pushToast({
        message: '프로필 수정 실패 ',
      })
    );
  };

  const handleNext = () => {
    //SUBMIT REQUEST

    //ONSUCCESS
    successUpdateProfile();

    //ON FALSE
  };

  return (
    <Layout
      headerLeft={<CancelButton />}
      headerTitle={isSignUp ? '프로필 생성하기' : '프로필 수정하기'}
      headerRight={<button onClick={() => handleNext()}>완료</button>}
    >
      <div className='profile'>
        <ProfileAvatar avatarSrc={avatarSrc} />

        <div className='nickNameForm'>
          <input onChange={handleNickName} value={nickName} />
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
