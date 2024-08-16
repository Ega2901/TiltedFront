import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/tilted.svg';
import profile_img from '../assets/Profile.svg';
import points_icon from '../assets/icons/points_icon.png';

const FarmingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    text-align: center;
    padding-top: 20px;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 120px;
    height: 120px;
`;

const PointsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 400px;
    margin-bottom: 20px;
`;

const PointsLabel = styled.div`
    display: flex;
    align-items: center;
    color: white;
    margin-bottom: 5px;
    font-size: 14px;
`;

const PointsIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

const Points = styled.div`
    background-color: #4A4D62;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 20px rgba(106, 79, 248, 0.6);
`;

const PointsValue = styled.div`
    color: white;
    font-size: 32px;
`;

const FarmButton = styled.button`
    background-color: ${props => (props.disabled ? '#2f334c' : '#6f4ff8')};
    color: #fff;
    padding: 15px 30px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    max-width: 400px;
    margin-top: 20px;
    box-shadow: ${props => (props.disabled ? 'none' : '0 0 20px rgba(106, 79, 248, 0.6)')};

    &:hover {
        background-color: ${props => (props.disabled ? '#444' : '#5e0087')};
        box-shadow: ${props => (props.disabled ? 'none' : '0 0 30px rgba(106, 79, 248, 0.8)')};
    }
`;

const Timer = styled.div`
    font-size: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Farming = ({ username, points, setPoints, onStartFarming, onClaimRewards }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isFarming, setIsFarming] = useState(false);
    const [farmingCooldown, setFarmingCooldown] = useState(false);

    useEffect(() => {
        const storedState = JSON.parse(localStorage.getItem('farmingState'));
        if (storedState) {
            setIsFarming(storedState.isFarming);
            setFarmingCooldown(storedState.farmingCooldown);
            const remainingTime = storedState.cooldownEndTime - Date.now();
            setTimeLeft(Math.max(0, Math.floor(remainingTime / 1000)));
        }
    }, []);

    useEffect(() => {
        if (farmingCooldown && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (farmingCooldown && timeLeft === 0) {
            setFarmingCooldown(false);
        }
    }, [farmingCooldown, timeLeft]);

    useEffect(() => {
        localStorage.setItem('farmingState', JSON.stringify({
            isFarming,
            farmingCooldown,
            cooldownEndTime: Date.now() + timeLeft * 1000
        }));
    }, [isFarming, farmingCooldown, timeLeft]);

    const handleStartFarming = () => {
        onStartFarming();
        setIsFarming(true);
        setFarmingCooldown(true);
        setTimeLeft(8 * 60 * 60); // 8 часов в секундах
    };

    const handleClaimRewards = () => {
        onClaimRewards();
        setIsFarming(false);
        setFarmingCooldown(false);
        setTimeLeft(0); // сброс времени
    };

    return (
        <FarmingContainer>
            <img src={logo} alt="Welcome logo tilted" />
            <h1>Hello, {username}</h1>
            <ProfileImage src={profile_img} alt="Profile" />
            <PointsContainer>
                <PointsLabel>
                    Your Tilted Points
                </PointsLabel>
                <Points>
                    <PointsIcon src={points_icon} alt="Points Icon" />
                    <PointsValue>{(points || 0).toFixed(2)}</PointsValue>
                </Points>
            </PointsContainer>
            {!isFarming && !farmingCooldown && (
                <FarmButton onClick={handleStartFarming}>Start Farming</FarmButton>
            )}
            {farmingCooldown && timeLeft > 0 && (
                <FarmButton disabled>
                    <Timer>
                        Farming Cooldown
                        <span style={{ marginLeft: '10px' }}>{new Date(timeLeft * 1000).toISOString().substr(11, 8)}</span>
                    </Timer>
                </FarmButton>
            )}
            {farmingCooldown && timeLeft === 0 && (
                <FarmButton onClick={handleClaimRewards}>Claim Rewards +1000.00</FarmButton>
            )}
        </FarmingContainer>
    );
};

export default Farming;
