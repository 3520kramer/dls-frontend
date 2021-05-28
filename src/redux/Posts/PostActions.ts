import { GET_POSTS, PostActionTypes, Post } from './PostTypes';

export const getPostsAction = (posts: Post[]): PostActionTypes => {
  return {
    type: GET_POSTS,
    payload: posts
  };
};