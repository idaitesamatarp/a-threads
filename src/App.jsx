import { useEffect } from 'react';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPages from './pages/NotFoundPages';
import { asyncUnsetAuthUser } from './states/auth/action';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const auth = useSelector((state) => state.auth);
  const isPreload = useSelector((state) => state.isPreload);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <>
      <header className='w-full sticky top-0 z-[9999]'>
        <Loading />
        <Navbar auth={auth} signOut={onSignOut} />
      </header>
      <main className='container mx-auto'>
        <div className='max-w-full max-h-full overflow-hidden p-5'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {!auth ? (
              <>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
              </>
            ) : null}
            <Route path='/threads/:id' element={<DetailPage />} />
            <Route path='/leaderboards' element={<LeaderboardPage />} />
            <Route path='*' element={<NotFoundPages />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
