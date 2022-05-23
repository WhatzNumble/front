import Layout from 'components/Layout';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import React, { useState, useRef } from 'react';

import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import { fileLoader } from 'utils/file';
import Button from 'components/Button';
import ProfileAvatar from '../ProfileAvatar';
import ProfileInfo from '../ProfileInfo';
import { profileWrapper } from '..';
import useToastMessage from 'hooks/useToastMessage';
import axios from 'axios';

const ProfileEditPage: NextPage = () => {
  const { user } = useSelector((state: AppState) => state.user);
  const [profilePreview, setProfilePreview] = useState(user.avatar);
  const { pushToast } = useToastMessage();
  const formRef = useRef<HTMLFormElement>(null);
  const [inputs, setInputs] = useState({
    profile: user.avatar,
    nickName: user.nickName,
  });

  const { editType } = useRouter().query;
  const isSignUp = editType === 'signup';

  const onNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputs({
      ...inputs,
      nickName: value,
    });
  };
  // useUserTypeRedirect('/', 'guest'); //guest 일 경우 홈으로 redirect
  const onProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const { name, files } = target;
    console.log(name, files);
    if (files && files.length === 1 && name === 'profileAvatar') {
      const filesName = files[0].name;
      const fileContent = await fileLoader(files[0]);
      console.log(fileContent);
      setProfilePreview(fileContent as string);
      setInputs({
        ...inputs,
        profile: filesName,
      });
    }
  };

  const successUpdateProfile = () => {
    Router.replace(isSignUp ? '/' : '/profile');
    pushToast(isSignUp ? '프로필이 생성되었습니다' : '프로필이 수정되었습니다');
  };

  const failUpdateProfile = () => {
    pushToast('업데이트중 문제가 발생했습니다.');
    Router.push('/');
  };

  const updateProfileRequest = async () => {
    try {
      const body = new FormData(formRef.current!);
      // console.log(body.get('nickName'));
      // console.log(body.get('profileAvatar'));

      const res = axios.post('/member/update', {
        body,
      });
      // console.log(res);
      successUpdateProfile();
    } catch (err) {
      // console.log(err);
      failUpdateProfile();
    }
  };

  const handleNext = async () => {
    await updateProfileRequest();
  };

  return (
    <Layout
      headerLeft={<div>취소</div>}
      headerTitle={isSignUp ? '프로필 생성하기' : '프로필 수정하기'}
      headerRight={<Button onClick={() => handleNext()} width='62px' text='완료' />}
    >
      <form className='profileWrapper' ref={formRef}>
        <ProfileAvatar isEdit onProfileChange={onProfileChange} avatarSrc={profilePreview} />
        <ProfileInfo isEdit onNickNameChange={onNickNameChange} name={inputs.nickName} />
      </form>
      <style jsx>{profileWrapper}</style>
      <style jsx>
        {`
          .profile {
            margin: 133px 0px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </Layout>
  );
};

export default ProfileEditPage;
