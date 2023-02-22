import styled from 'styled-components';
// import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// http://localhost:3000/findpassword-changepassword
function FindPasswordCheckEmail() {
    // const [email, setEmail] = useState('');
    const location = useLocation();
    return (
        <FindPasswordCheckEmailStyled>
            <TitleStyle>이메일을 확인해주세요</TitleStyle>
            <TextStyle>
                등록해주신 이메일{' '}
                <HighlightTextStyle>{location.state.email}</HighlightTextStyle>
                로 비밀번호 재설정 메일을 보내드렸습니다.
                <br />
                <br />
                이메일을 확인하여 비밀번호를 재설정 해 주세요.
                <br />
                <br />
                감사합니다.
            </TextStyle>

            <Link to="/">
                <ButtonStyle>홈으로</ButtonStyle>
            </Link>
        </FindPasswordCheckEmailStyled>
    );
}

export default FindPasswordCheckEmail;

const FindPasswordCheckEmailStyled = styled.div`
    margin-top: 64px;
    width: 480px;
    height: calc(100vh - 304px);
    position: relative;
    left: 50%;
    margin-left: -240px;
    min-height: 320px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 26px;
`;

const TextStyle = styled.div`
    font-size: 14px;
`;

const HighlightTextStyle = styled.span`
    color: #0054fd;
`;

const ButtonStyle = styled.button`
    width: 480px;
    height: 48px;
    border-radius: 4px;
    border-style: none;
    font-size: 16px;
    color: #ffffff;
    background: #0054fd;
    cursor: pointer;
    margin-top: 80px;
`;
