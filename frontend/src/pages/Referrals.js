import React from 'react';
import styled from 'styled-components';
import logo from '../assets/tilted.svg'; // Замените на путь к вашему логотипу
import points_icon from '../assets/icons/points_icon.png'; // Замените на путь к вашей иконке

const ReferralsContainer = styled.div`
    padding: 20px;
    min-height: 100vh;
    text-align: center;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Logo = styled.img`
    width: 100px; /* Уменьшена ширина логотипа */
    height: auto;
    margin-bottom: 10px; /* Уменьшен нижний отступ */
`;

const Subtitle = styled.p`
    font-size: 14px; /* Уменьшен размер шрифта */
    color: #b0b0b0;
    margin: 0;
`;

const ReferralInfo = styled.div`
    background-color: #292929;
    margin: 10px 0; /* Уменьшен верхний и нижний отступ */
    padding: 10px; /* Уменьшено внутреннее поле */
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoSection = styled.div`
    display: flex;
    align-items: center;
`;

const InfoIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

const InfoText = styled.div`
    font-size: 18px; /* Уменьшен размер шрифта */
    font-weight: bold;
`;

const ReferralButton = styled.button`
    background-color: #6F4FF8;
    color: #fff;
    padding: 10px 20px; /* Уменьшено внутреннее поле */
    border: none;
    height: 50px; /* Уменьшена высота */
    width: 80%; /* Уменьшена ширина */
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(106, 79, 248, 0.6); /* Уменьшена тень */

    &:hover {
        background-color: #5e0087;
    }
`;

const FriendListContainer = styled.div`
    background-color: #292929;
    padding: 10px; /* Уменьшено внутреннее поле */
    border-radius: 10px;
    margin-top: 10px; /* Уменьшен верхний отступ */
`;

const FriendListTitle = styled.div`
    font-size: 16px; /* Уменьшен размер шрифта */
    margin-bottom: 5px; /* Уменьшен нижний отступ */
`;

const ReferralLink = styled.a`
    color: #6f4ff8;
    cursor: pointer;
`;

const Referrals = ({ user }) => {
    const handleCopyLink = () => {
        if (user && user.referral_code) {
            const referralLink = `https://t.me/TiltedXYZ_bot?startapp=ref_${user.referral_code}`;
            navigator.clipboard.writeText(referralLink);
            alert('Referral link copied to clipboard!');
        } else {
            alert('Referral code not available');
        }
    };

    return (
        <ReferralsContainer>
            <HeaderContainer>
                <Logo src={logo} alt="Tilted Logo" />
                <h1>Invite Your Friend</h1>
                <Subtitle>
                    Share Tilted with your friends and earn bonus Tilted Points for each referral.
                </Subtitle>
            </HeaderContainer>
            <ReferralInfo>
                <InfoSection>
                    <InfoIcon src={points_icon} alt="Points Icon" />
                    <InfoText>Earned from referral</InfoText>
                </InfoSection>
                <InfoText>{user ? user.points : 0}</InfoText>
            </ReferralInfo>
            <ReferralButton onClick={handleCopyLink}>Invite your friend</ReferralButton>
            <FriendListContainer>
                <FriendListTitle>List of your friends</FriendListTitle>
                <Subtitle>
                    Track your referral progress and see how many friends have joined through your link.
                </Subtitle>
                <ReferralLink href="#">{user ? (user.referrals ? user.referrals.length : 0) : 0} Referrals</ReferralLink>
            </FriendListContainer>
        </ReferralsContainer>
    );
};

export default Referrals;
