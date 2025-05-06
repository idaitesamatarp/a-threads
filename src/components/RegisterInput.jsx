import { PiTextAaBold } from 'react-icons/pi';
import useInput from '../hooks/useInput';
import { RiLockPasswordFill, RiMailFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div>
      <form
        className='space-y-6'
        onSubmit={(e) => register(e, { name, email, password })}
      >
        <div className='relative mt-2'>
          <PiTextAaBold
            className='absolute
              top-2 left-2
              text-slate-600
              border-e-2
              pe-1'
            size={23}
          />
          <input
            type='text'
            name='name'
            id='name'
            autoComplete='off'
            required
            className='block w-full
              border-2
              rounded-md
              bg-transparent
              ps-9 py-1.5
              text-base text-gray-900
              outline-1 -outline-offset-1 outline-gray-300
              placeholder:text-gray-400
              focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600
              sm:text-sm/6'
            placeholder='Name'
            value={name}
            onChange={onNameChange}
          />
        </div>

        <div className='relative mt-2'>
          <RiMailFill
            className='absolute
              top-2 left-2
              text-slate-600
              border-e-2
              pe-1'
            size={23}
          />
          <input
            type='email'
            name='email'
            id='email'
            autoComplete='off'
            required
            className='block w-full
              border-2
              rounded-md
              bg-transparent
              ps-9 py-1.5
              text-base text-gray-900
              outline-1 -outline-offset-1 outline-gray-300
              placeholder:text-gray-400
              focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600
              sm:text-sm/6'
            placeholder='Email'
            value={email}
            onChange={onEmailChange}
          />
        </div>

        <div className='relative mt-2'>
          <RiLockPasswordFill
            className='absolute
              top-2 left-2
              text-slate-600
              border-e-2
              pe-1'
            size={23}
          />
          <input
            type='password'
            name='password'
            id='password'
            autoComplete='off'
            required
            className='block w-full
              border-2
              rounded-md
              bg-transparent
              ps-9 py-1.5
              text-base text-gray-900
              outline-1 -outline-offset-1 outline-gray-300
              placeholder:text-gray-400
              focus:outline-2 focus:-outline-offset-2 focus:outline-slate-600
              sm:text-sm/6'
            placeholder='Password'
            value={password}
            onChange={onPasswordChange}
          />
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center
              rounded-md
              bg-slate-600
              px-3 py-1.5
              text-sm/6 font-semibold text-white
              shadow-xs
              hover:bg-slate-500
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'
          >
						Register
          </button>
        </div>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
