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
  nickname: string;
  profile: string;
  videoId: number;
  videoLike: number;
  videoTitle: string;
  videoThumbnail: string;
  videoContent: string;
  videoCreationDate: string;
  videoViews: number;
  directDir: string | null;
  embedLink?: string | null;
}

export type VideoBasic = Pick<Video, 'videoId' | 'videoThumbnail'>;
