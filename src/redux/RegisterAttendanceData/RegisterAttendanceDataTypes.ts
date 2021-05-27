export const GET_POSTS = 'GET_POSTS';
export const SET_SUBJECTS = 'SET_SUBJECTS';
export const SET_STUDENT_CLASSES = 'SET_SELECTED_STUDENT_CLASSES';
export const SET_SELECTED_MODULES = 'SET_SELECTED_MODULES';

export interface GetPostsStateType {
  posts: Post[];
}

interface GetPostsActionType {
  type: typeof GET_POSTS;
  payload: Post[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostActionTypes = GetPostsActionType;