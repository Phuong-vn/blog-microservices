import { useState } from 'react';
import axios from 'axios';
import { DOMAIN_COMMENT } from './constants';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${DOMAIN_COMMENT}/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  return <form onSubmit={onSubmit}>
    <div className='form-group'>
      <label>Comment</label>
      <input value={content} className='form-control mb-2' onChange={(e) => setContent(e.target.value)} />
      <button className='btn btn-primary'>Submit</button>
    </div>
  </form>
}

export default CommentCreate;
