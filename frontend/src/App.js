import React, { useEffect, useState } from 'react';
import './index.css';
import styled from 'styled-components';
import axios from 'axios';
import Loader from './components/Loader';
import Farming from './pages/Farming';
import Tasks from './pages/Tasks';
import Referrals from './pages/Referrals';
import Registration from './pages/Registration';
import Welcome from './pages/Welcome';
import Navigation from './components/Navigation';

const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; /* Padding for navigation bar */
`;

const API_BASE_URL = 'https://tiltedxyz.ru/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0.00);
  const [activePage, setActivePage] = useState('welcome');
  const [referralCode, setReferralCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFarming, setIsFarming] = useState(false);
  const [farmingCooldown, setFarmingCooldown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const initUser = async () => {
      let telegramUser = null;

      if (window.Telegram?.WebApp) {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        if (initDataUnsafe && initDataUnsafe.user) {
          telegramUser = {
            telegram_id: initDataUnsafe.user.id,
            tg_username: initDataUnsafe.user.username,
            nickname: initDataUnsafe.user.username,
          };

          try {
            const response = await axios.get(`${API_BASE_URL}/users/by_telegram_id/${telegramUser.telegram_id}/`);
            if (response.status === 200 && response.data) {
              setUser(response.data);
              setPoints(response.data.points);
              setActivePage('farming');
            } else {
              console.error('User data not found, redirecting to registration');
              setUser(telegramUser);
              setActivePage('welcome');
            }
          } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(telegramUser);
            setActivePage('welcome');
          } finally {
            setLoading(false);
          }
        }
      } else {
        // Гостевой пользователь
        telegramUser = {
          id: 'guest',
          telegram_id: 'guest',
          tg_username: 'Guest',
          nickname: 'Guest',
          points: 0,
        };
        setUser(telegramUser);
        setPoints(0);
        setActivePage('farming');
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const handleRegistration = async (nickname, photo) => {
    if (!user) {
      console.error('User is not initialized');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('telegram_id', user.telegram_id);
      formData.append('nickname', nickname);
      if (referralCode) formData.append('referral_code', referralCode);
      if (photo) formData.append('avatar', photo);

      const response = await axios.post(`${API_BASE_URL}/register/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        setPoints(response.data.points);
        setActivePage('farming');
      } else {
        setErrorMessage('Failed to register user. Please try again.');
        console.error('User data is missing in the response');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };

  const handleStartFarming = async () => {
    if (!user) return;

    try {
      await axios.patch(`${API_BASE_URL}/users/${user.telegram_id}/start_farming/`);
      const now = new Date();
      localStorage.setItem('farmingState', JSON.stringify({
        isFarming: true,
        farmingCooldown: true,
        cooldownEndTime: now.getTime() + 8 * 60 * 60 * 1000,
      }));
      setIsFarming(true);
      setFarmingCooldown(true);
      setTimeLeft(8 * 60 * 60); // 8 часов в секундах
    } catch (error) {
      console.error('Failed to start farming:', error);
    }
  };

  const handleClaimRewards = async () => {
    if (!user) return;

    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${user.telegram_id}/claim_rewards/`);
      if (response.data.status === 'points claimed') {
        setPoints(response.data.points);
        localStorage.removeItem('farmingState');
        setIsFarming(false);
        setFarmingCooldown(false);
        setTimeLeft(0);
      }
    } catch (error) {
      console.error('Failed to claim points:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPoints(0);
    setActivePage('welcome');
  };

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const handleCreateAccount = () => {
    setActivePage('registration');
  };

  if (loading) {
    return <Loader />;
  }

  return (
      <AppContainer>
        {errorMessage && <p>{errorMessage}</p>}
        {activePage === 'welcome' && <Welcome onCreateAccount={handleCreateAccount} />}
        {activePage === 'registration' && <Registration onRegister={handleRegistration} />}
        {activePage === 'farming' && (
            <Farming
                username={user.nickname}
                points={points}
                setPoints={setPoints}
                onStartFarming={handleStartFarming}
                onClaimRewards={handleClaimRewards}
                isFarming={isFarming}
                farmingCooldown={farmingCooldown}
                timeLeft={timeLeft}
                onLogout={handleLogout}
            />
        )}
        {activePage === 'tasks' && <Tasks user={user} />}
        {activePage === 'referrals' && <Referrals user={user} />}
        {activePage !== 'welcome' && activePage !== 'registration' && (
            <Navigation activePage={activePage} onNavigate={handleNavigate} />
        )}
      </AppContainer>
  );
}

export default App;
