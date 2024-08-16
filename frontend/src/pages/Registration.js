import React, { useState } from 'react';
import styled from 'styled-components';
import profile_fake from '../assets/Profilefake.svg'; // Replace with your placeholder image

const RegistrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background-color: #292929;
    color: #fff;
    width: 80%;
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
        background-color: #2f334c;
    }
`;

const Registration = ({ onRegister }) => {
    const [nickname, setNickname] = useState('');
    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    return (
        <RegistrationContainer>
            <h1>Welcome to Tilted Club</h1>
            <div>
                {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Profile" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                ) : (
                    <div>
                        <img src={profile_fake} alt="Fake" />
                    </div>
                )}
                <input type="file" onChange={handlePhotoChange} style={{ display: 'none' }} id="photoInput" />
                <label htmlFor="photoInput" style={{ cursor: 'pointer', color: '#6a0dad', marginTop: '10px' }}>Add Photo</label>
            </div>
            <Input
                type="text"
                placeholder="Your Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <Button onClick={() => {
                console.log('Register button clicked');
                onRegister(nickname, photo);
            }} disabled={!nickname}>Continue</Button>
        </RegistrationContainer>
    );
};

export default Registration;
