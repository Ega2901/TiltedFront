import React from 'react';
import styled from 'styled-components';
import logo from '../assets/tilted.svg'; // Убедитесь, что путь к логотипу правильный

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 0 20px; /* Добавляем padding для мобильных устройств */
`;

const Logo = styled.img`
    width: 150px; /* Уменьшаем размер логотипа */
    height: auto;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #6F4FF8;
    color: #fff;
    padding: 16px 30px;
    border: none;
    width: 90%;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: ${props => (props.disabled ? 'none' : '0 0 20px rgba(106, 79, 248, 0.6)')};

    &:hover {
        background-color: #5e0087;
    }
`;

const Welcome = ({ onCreateAccount }) => (
    <WelcomeContainer>
        <Logo src={logo} alt="Welcome logo tilted" />
        <Title>Welcome to Tilted</Title>
        <p>Maximize your airdrop earnings with Tilted. Join our community to participate in quests, refer friends, and earn Tilted Points effortlessly.</p>
        <Button onClick={onCreateAccount}>Create Account</Button>
    </WelcomeContainer>
);

export default Welcome;
