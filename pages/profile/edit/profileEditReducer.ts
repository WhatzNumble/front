import { useDispatch } from 'react-redux';

type ProfileEditType = 'profile' | 'categories';
type State = {
  page: ProfileEditType;
  nick: string;
  avatar: string;
  categories: string[];
};

type Action =
  | { type: 'CHANGE_PAGE'; editType: ProfileEditType }
  | { type: 'CHANGE_NICKNAME'; name: string }
  | { type: 'CHANGE_AVATAR'; avatarSrc: string }
  | { type: 'CHANGE_CATAGORIES'; categories: string[] }
  | { type: 'CANCLE_EDIT' }

const initialState: State = {
  page: 'profile',
  nick: 'default_nick',
  avatar: '/logo.svg',
  categories: [],
};

const profileEditReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return { ...state, page: action.editType };
    case 'CHANGE_NICKNAME':
      return { ...state, nick: action.name };
    case 'CHANGE_CATAGORIES':
      return { ...state, categories: [...action.categories] };
    case 'CHANGE_AVATAR':
      //add api request ..
      return { ...state, avatar: action.avatarSrc };
    default:
      throw new Error('Action type error');
  }
};

export { profileEditReducer, initialState };
