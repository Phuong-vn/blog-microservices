import { useState, useEffect } from 'react';
import axios from 'axios';
import { DOMAIN_COMMENT } from './constants';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComment = async () => {
    const { data } = await axios.get(
      `${DOMAIN_COMMENT}/posts/${postId}/comments`
    );
    setComments(data);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <ul>
      {comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
      })}
    </ul>
  );
};

export default CommentList;
