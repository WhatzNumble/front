// 공통으로 사용하는 타입들을 정의합니다.

export interface Constraint<T> {
  [key: string]: T;
}

export interface User extends Constraint<string> {
  id: string;
  email: string;
  nickname: string;
  lastLogin: string;
}

export interface Video {
  videoId: number;
  videoThumbnail: string;
  nickname: string;
  profile: string;
  likes: number;
  title: string;
  content: string;
  videoDate: string;
  views: number;
  directDir: string | null;
  embedLink?: string | null;
}

export type VideoList = Pick<Video, 'videoId' | 'videoThumbnail'>[];
