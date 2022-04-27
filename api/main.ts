import request from './core';

// 서버에서 발급된 access 토큰을 통해 
// 현재 도메인에 저장된 cookie를 통해 토큰 재발급 
const getRefresh= (token: string) => {
  return request({url: 'auth/refresh'});
}