import { useState, useEffect } from 'react';
import { DOMAIN_POST } from './constants';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const { data } = await axios.get(`${DOMAIN_POST}/posts`);
    setPosts(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <ul className='d-flex flex-wrap justify-content-between'>
      {Object.values(posts).map((post) => {
        return (
          <li
            className='card'
            key={post.id}
            style={{ width: '30%', marginBottom: '20px' }}
          >
            <div className='card-body'>
              <h3 className='card-title'>{post.title}</h3>
              <CommentList postId={post.id} />
              <CommentCreate postId={post.id} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
