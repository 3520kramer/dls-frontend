export const GET_POSTS = 'GET_POSTS';

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