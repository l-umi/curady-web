import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAuthState } from '../../data/User';
import NotFound from '../NotFound';
import YesNoModal from '../../components/modal/YesNoModal';

function ChangePassword() {
    const nav = useNavigate();
    const [modalopen, setModalopen] = useState(false);
    const [userAuth, setUserAuth] = useRecoilState(userAuthState);
    const [check, setCheck] = useState([false, false]);
    const buttonClick = useCallback(e => {
        e.target.disabled = true;
        // axios
        //     .delete(`user-service/auth/user`, {
        //         headers: { 'X-AUTH-TOKEN': userAuth[1] },
        //     })
        //     .then(() => {
        //         setUserAuth([false, '']);
        //         localStorage.removeItem('recoil-persist');
        //         document.cookie =
        //             'token=; expires=Sat, 01 Jan 1972 00:00:00 GMT; max-age=-10000000000;';
        //         e.target.disabled = false;

        //         nav(`/`);
        //     })
        //     .catch(() => {
        //         e.target.disabled = false;
        //     });
    });

    if (userAuth[0] === false) {
        return <NotFound />;
    }

    return (
        <ChangePasswordStyle>
            {modalopen ? (
                <YesNoModal
                    setModalopen={setModalopen}
                    titleText="회원 탈퇴"
                    innerText="정말로 회원을 탈퇴하시겠습니까?"
                    yesFunction={buttonClick}
                />
            ) : null}
            <TitleStyle>
                정말<BordStyle> 회원 탈퇴</BordStyle>를 원하시나요?
            </TitleStyle>
            <ToggleWrapper
                onClick={() => {
                    if (!check[1]) {
                        setCheck([!check[0], check[1]]);
                    }
                }}
                isActive={check[0]}
            >
                <YesStyle> {check[0] ? 'YES' : ''}</YesStyle>
                <Notch isActive={check[0]} />
                <NoStyle> {check[0] ? '' : 'NO'}</NoStyle>
            </ToggleWrapper>
            {check[0] ? (
                <ToggleWrapper
                    onClick={() => {
                        setCheck([check[0], !check[1]]);
                    }}
                    isActive={check[1]}
                >
                    <YesStyle> {check[1] ? 'YES' : ''}</YesStyle>
                    <Notch isActive={check[1]} />
                    <NoStyle> {check[1] ? '' : 'NO'}</NoStyle>
                </ToggleWrapper>
            ) : null}
            {check[0] && check[1] ? (
                <ButtonStyle
                    onClick={() => {
                        setModalopen(true);
                    }}
                    color="#0054FD"
                    cursor="pointer"
                >
                    회원 탈퇴
                </ButtonStyle>
            ) : (
                <ButtonStyle color="#7A7A7A" cursor="">
                    회원 탈퇴
                </ButtonStyle>
            )}
        </ChangePasswordStyle>
    );
}

export default ChangePassword;

const ChangePasswordStyle = styled.div`
    width: 86vw;
    margin: 64px auto 96px auto;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    min-height: calc(100vh - 400px);
    width: 480px;
    font-size: 16px;
    line-height: 23px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    text-align: left;
    margin-bottom: 69px;
`;

const BordStyle = styled.span`
    font-weight: 700;
`;

const YesStyle = styled.span`
    margin-left: 10px;
    color: #0054fd;
`;

const NoStyle = styled.span`
    margin-left: 20px;
    color: #777;
`;

const ToggleWrapper = styled.div`
    width: 60px;
    min-width: 60px;
    height: 25px;
    border-radius: 25px;
    border: 2px solid;
    border-color: ${props => (props.isActive ? '#0054fd' : '#777')};
    background: ${props => (props.isActive ? '#E6EEFF' : '#FFFFFF')};
    margin: auto;
    display: flex;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 66px;
    animation: fadein 1s;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    &:hover {
        /* opacity: 0.8; */
        background: ${props => (props.isActive ? '#E6EEFF' : '#efefef')};
    }
`;

const Notch = styled.div`
    position: absolute;
    z-index: 1;
    height: 21px;
    width: 21px;
    background-color: ${props => (props.isActive ? '#0054fd' : '#777')};
    margin: 2px 2px 2px 2px;
    border-radius: 50%;
    transform: ${props =>
        props.isActive ? 'translate(35px)' : 'translate(0px)'};
    transition: transform 0.2s linear;
`;

const ButtonStyle = styled.button`
    position: absolute;
    top: 419px;
    width: 480px;
    height: 48px;
    border-radius: 4px;
    border-style: none;
    font-size: 16px;
    color: #ffffff;
    background: #0054fd;
    margin-top: 16px;
    background: ${props => props.color};
    cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
