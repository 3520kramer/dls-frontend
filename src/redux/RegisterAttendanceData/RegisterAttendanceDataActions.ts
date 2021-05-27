import { GET_POSTS, PostActionTypes, Post } from './RegisterAttendanceDataTypes';

export const getPostsAction = (posts: Post[]): PostActionTypes => {
  return {
    type: GET_POSTS,
    payload: posts
  };
};