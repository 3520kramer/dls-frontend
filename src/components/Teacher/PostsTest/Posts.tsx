import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from './Counter';
import { getPosts } from '../../../redux/Posts/PostEffect';
import { Post } from '../../../redux/Posts/PostTypes';
import { AppState } from '../../../redux/store';

export default function Posts() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  const posts = useSelector((state: AppState) => state.posts);
  
  const postItems = posts.posts.map((post: Post) => (
    <div key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  ));
  
  return (
    <>
      <Counter/>
      <div>{postItems}</div>
    </>
  );
}
