import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/tilted.svg';

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Spinner = styled.div`
    border: 6px solid rgb(111, 79, 248);
    border-left-color: #ffffff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
    margin-top: 20px; /* Отступ между логотипом и спиннером */
`;

const Logo = styled.img`
    width: 250px; /* Ширина логотипа */
    height: auto;
`;

const Loader = () => (
    <LoaderContainer>
        <Logo src={logo} alt="Tilted Logo" />
        <Spinner />
    </LoaderContainer>
);

export default Loader;