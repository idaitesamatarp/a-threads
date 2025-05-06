import { useState } from 'react';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { createComment } from '../states/threadDetail/action';
import PropTypes from 'prop-types';

function CommentInput({ name, avatar }) {
  const dispatch = useDispatch();
  const [content, onContentChange, setContent] = useInput('');

  const MAX_CHARS = 500;
  const [limitContent, setLimitContent] = useState(MAX_CHARS);

  const handleLimitContent = (e) => {
    const { value } = e.target;
    setLimitContent(value === '' ? MAX_CHARS : limitContent - 1);
  };

  const resetForm = () => {
    setContent('');
    setLimitContent(MAX_CHARS);
  };

  const saveComment = (e) => {
    e.preventDefault();

    dispatch(createComment(content));
    resetForm();
  };

  return (
    <div className='flex items-center gap-4 text-slate-800'>
      <img
        src={avatar}
        alt={name}
        className='relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center'
      />

      <div className='w-full'>
        <textarea
          rows='3'
          className='peer h-full min-h-[100px] w-full
          !resize-none
          rounded-[7px]
          bg-transparent
          px-3 py-2.5
          font-sans text-sm font-normal text-blue-gray-700
          outline outline-0
          transition-all
          placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
          focus:border-2 focus:border-gray-900 focus:outline-0
          disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
          placeholder='Post your comment...'
          value={content}
          onChange={(e) => {
            onContentChange(e);
            handleLimitContent(e);
          }}
          maxLength={MAX_CHARS}
          required
        ></textarea>
        <p className='flex items-start mt-0 text-xs text-slate-400'>
          <strong>{content.length}</strong>/{MAX_CHARS}
        </p>
      </div>

      <button
        className='rounded-full bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        type='button'
        onClick={(e) => saveComment(e)}
      >
				Reply
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default CommentInput;
