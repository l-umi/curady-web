import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from '../../logo.svg';
import loadingImg from '../../images/spinner_0054fd_150px.gif';

function SignupConfirmEmail() {
    const [confirm, setConfirm] = useState(null);
    useEffect(() => {
        // axios
        //     .get(`/user-service/confirmEmail${window.location.search}`)
        //     .then(() => {
        //         setConfirm(true);
        //     })
        //     .catch(() => {
        //         setConfirm(false);
        //     });
    }, []);

    if (confirm === null) {
        return (
            <LoadingStyle>
                <img src={loadingImg} alt="" />
            </LoadingStyle>
        );
    }

    return (
        <SignupConfirmEmailStyle>
            <ImgStyle src={logo} alt="logo" /> <br />
            {confirm ? (
                <TitleTextStyle>
                    이메일 인증이 <BlueStyle>완료</BlueStyle>되었습니다.{' '}
                </TitleTextStyle>
            ) : (
                <TitleTextStyle>
                    이메일 인증이 <BlueStyle>실패</BlueStyle>되었습니다.{' '}
                </TitleTextStyle>
            )}
            {confirm ? (
                <ContentTextStyle>
                    회원가입 페이지로 돌아가서
                    <br />
                    <BlueStyle>인증 완료</BlueStyle> 버튼을 클릭하여 회원가입을
                    완료해주세요.
                    <br /> 감사합니다.
                </ContentTextStyle>
            ) : (
                <ContentTextStyle>
                    인증 기간이 만료되었거나 주소가 잘못되었습니다.
                    <br />
                    <BlueStyle>curady13@gmail.com</BlueStyle>으로 문의 메일을
                    보내주세요.
                    <br /> 죄송합니다.
                </ContentTextStyle>
            )}
        </SignupConfirmEmailStyle>
    );
}

export default SignupConfirmEmail;

const LoadingStyle = styled.div`
    text-align: center;
    padding-top: 30px;
    min-height: calc(100vh - 270px);
`;

const SignupConfirmEmailStyle = styled.div`
    width: 420px;
    margin-top: 122px;
    margin-bottom: calc(100vh - 705px);
    margin-left: calc(50% - 200px);
    border-top: 4px solid #0054fd;
    min-height: calc(100vh - 807px);
    border-bottom: 4px solid #0054fd;
    padding-top: 50px;
    padding-bottom: 100px;
`;

const TitleTextStyle = styled.div`
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 50px;
`;

const ImgStyle = styled.img`
    height: 33px;
`;

const BlueStyle = styled.span`
    color: #0054fd;
    font-weight: 700;
`;

const ContentTextStyle = styled.div`
    font-size: 18px;
    line-height: 24px;
`;
