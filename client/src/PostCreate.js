import { useState } from 'react';
import axios from 'axios';
import { DOMAIN_POST } from './constants';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${DOMAIN_POST}/posts`, {
      title,
    })
    setTitle('');
  };

  return (
    <form onSubmit={submit}>
      <div className='form-group'>
        <label htmlFor='title' className='form-label'>Title</label>
        <input id='title' className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );
};

export default PostCreate;
