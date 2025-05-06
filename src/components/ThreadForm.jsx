import PropTypes from 'prop-types';
import { useState } from 'react';
import useInput from '../hooks/useInput';

export default function ThreadForm({ auth, addThread }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');

  const MAX_CHARS = 500;
  const [limitBody, setLimitBody] = useState(MAX_CHARS);

  const handleLimitBody = (e) => {
    const { value } = e.target;
    setLimitBody(value === '' ? MAX_CHARS : limitBody - 1);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setBody('');
    setLimitBody(MAX_CHARS);
  };

  const saveThread = (e) => {
    e.preventDefault();

    addThread({ title, body, category });
    resetForm();
  };

  return (
    <div className='flex items-start gap-4 my-5'>
      <img
        src={auth.avatar}
        alt={auth.name}
        className='relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center'
      />
      <div className='flex w-full flex-col'>
        <form>
          <div className='flex flex-row gap-2 mb-2'>
            <input
              id='title'
              className='h-full w-full
							rounded-[7px]
							border border-blue-gray-200 bg-transparent
							px-3 py-2.5
							font-sans text-sm font-normal text-blue-gray-700
							outline outline-0
							transition-all
							placeholder-shown:border placeholder-shown:border-blue-gray-200
							focus:border-2 focus:border-gray-900 focus:outline-0
							disabled:border-0 disabled:bg-blue-gray-50'
              placeholder='Title goes here...'
              value={title}
              onChange={onTitleChange}
              required
            />

            <input
              id='category'
              className='h-full w-full
							rounded-[7px]
							border border-blue-gray-200 bg-transparent
							px-3 py-2.5
							font-sans text-sm font-normal text-blue-gray-700
							outline outline-0
							transition-all
							placeholder-shown:border placeholder-shown:border-blue-gray-200
							focus:border-2 focus:border-gray-900 focus:outline-0
							disabled:border-0 disabled:bg-blue-gray-50'
              placeholder='Category goes here...'
              value={category}
              onChange={onCategoryChange}
              required
            />
          </div>

          <div className='relative'>
            <textarea
              id='body'
              rows='8'
              className='peer h-full min-h-[100px] w-full !resize-none
							rounded-[7px]
							border border-blue-gray-200 bg-transparent
							px-3 py-2.5
							font-sans text-sm font-normal text-blue-gray-700
							outline outline-0
							transition-all
							placeholder-shown:border placeholder-shown:border-blue-gray-200
							focus:border-2 focus:border-gray-900 focus:outline-0
							disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
              placeholder='Is there anything you want to share today?'
              value={body}
              onChange={(e) => {
                onBodyChange(e);
                handleLimitBody(e);
              }}
              maxLength={MAX_CHARS}
              required
            ></textarea>
            <p className='flex items-start mt-0 text-xs text-slate-400'>
              <strong>{body.length}</strong>/{MAX_CHARS}
            </p>
          </div>

          <div className='flex w-full justify-end py-1.5'>
            <div className='flex gap-2'>
              <button
                className='select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                type='button'
                onClick={(e) => saveThread(e)}
              >
								Post Thread
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadForm.propTypes = {
  auth: PropTypes.shape(userShape).isRequired,
  addThread: PropTypes.func.isRequired,
};
