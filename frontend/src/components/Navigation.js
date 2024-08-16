// src/components/Navigation.js
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as TasksIcon } from '../assets/icons/tasks.svg';
import { ReactComponent as ReferralsIcon } from '../assets/icons/referrals.svg';

const NavContainer = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #0D0F1F;
    padding: 24px 64px 20px 64px;
    position: fixed;
    bottom: 0;
    width: 250px;

    border: #f3f3f3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 0 4px rgb(255, 255, 255);
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    color: ${props => (props.active ? '#6f4ff8' : '#2f334c')};
    font-weight: ${props => (props.active ? 'bold' : 'normal')};
    flex:10;
    
    
    &:hover {
        color: #6f4ff8;
    }

    svg {
        fill: currentColor;
        width: 30px;
        height: 30px;
    }
`;

const NavLabel = styled.span`
    font-size: 12px;
`;

const Navigation = ({ activePage, onNavigate }) => (
    <NavContainer>
        <NavItem active={activePage === 'home'} onClick={() => onNavigate('home')}>
            <HomeIcon />
            <NavLabel>Home</NavLabel>
        </NavItem>
        <NavItem active={activePage === 'tasks'} onClick={() => onNavigate('tasks')}>
            <TasksIcon />
            <NavLabel>Tasks</NavLabel>
        </NavItem>
        <NavItem active={activePage === 'referrals'} onClick={() => onNavigate('referrals')}>
            <ReferralsIcon />
            <NavLabel>Referrals</NavLabel>
        </NavItem>
    </NavContainer>
);

export default Navigation;