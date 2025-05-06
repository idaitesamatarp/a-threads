import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = (e, { name, email, password }) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
					Register your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <RegisterInput register={onRegister} />
        <p className='mt-10 text-center text-sm/6 text-gray-500'>
					Already have an account?{' '}
          <Link
            to='/login'
            className='font-semibold text-slate-600 hover:text-slate-500'
          >
						Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
