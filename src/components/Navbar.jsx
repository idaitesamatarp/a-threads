import forumLogo from '../assets/forum.svg';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import { MdLeaderboard } from 'react-icons/md';
import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar({ auth, signOut }) {
	return (
		<nav className='bg-slate-950 p-5 h-14'>
			<div className='flex justify-between items-center h-full w-full mx-auto'>
				<div className='flex items-center flex-shrink-0 text-white'>
					<img src={forumLogo} alt='logo' width={25} className='mr-2' />
					<span className='font-semibold text-xl tracking-tight'>
						a&apos; Threads App {auth ? `for ${auth?.name}` : ''}
					</span>
				</div>

				<div className='inline-flex gap-5'>
					<a
						href='/'
						className='text-white'
						data-tooltip-id='thread'
						data-tooltip-content='Threads'
					>
						<HiChatBubbleBottomCenterText size={25} />
					</a>
					<Tooltip
						id='thread'
						style={{
							backgroundColor: 'rgb(220 38 38 / var(--tw-bg-opacity, 1))',
							borderRadius: 30,
						}}
					/>

					<a
						href='/leaderboards'
						className='text-white'
						data-tooltip-id='leaderboards'
						data-tooltip-content='Leaderboards'
					>
						<MdLeaderboard size={25} />
					</a>
					<Tooltip
						id='leaderboards'
						style={{
							backgroundColor: 'rgb(22 163 74 / var(--tw-bg-opacity, 1))',
							borderRadius: 30,
						}}
					/>

					{!auth ? (
						<Link
							to='/login'
							className='text-white'
							data-tooltip-id='signin_out'
							data-tooltip-content='Sign In'
						>
							<RiLoginCircleFill size={25} />
						</Link>
					) : (
						<span
							className='text-white cursor-pointer'
							data-tooltip-id='signin_out'
							data-tooltip-content='Sign Out'
							onClick={signOut}
						>
							<RiLogoutCircleFill size={25} />
						</span>
					)}
					<Tooltip
						id='signin_out'
						style={{
							backgroundColor: 'rgb(37 99 235 / var(--tw-bg-opacity, 1))',
							borderRadius: 30,
						}}
					/>
				</div>
			</div>
		</nav>
	);
}

const authUserShape = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
};

Navbar.propTypes = {
	auth: PropTypes.shape(authUserShape),
	signOut: PropTypes.func.isRequired,
};
