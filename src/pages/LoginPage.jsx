import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/auth/action';
import toast from 'react-hot-toast';

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogin = ({ email, password }) => {
		if (email == '') return toast.error('Email is required, cannot be empty');
		if (password == '')
			return toast.error('Password is required, cannot be empty');

		dispatch(asyncSetAuthUser({ email, password }));
		navigate('/');
	};

	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<LoginInput login={onLogin} />

				<p className='mt-10 text-center text-sm/6 text-gray-500'>
					Don&apos;t have an account?{' '}
					<Link
						to='/register'
						className='font-semibold text-slate-600 hover:text-slate-500'
					>
						Register Here
					</Link>
				</p>
			</div>
		</div>
	);
}
