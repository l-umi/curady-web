import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userAuthState, userInfoState, reissueToken } from '../../data/User';

function SignupCheckEmail() {
    const navigator = useNavigate();
    const location = useLocation();
    const targetTime = new Date(location.state.expireDate);
    const calculator = () => Math.floor((targetTime - new Date()) / 1000) - 4;
    const [count, setCount] = useState(600);

    const setUserAuth = useSetRecoilState(userAuthState);
    const setUserInfo = useSetRecoilState(userInfoState);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(calculator());
        }, 300);
        // 타이머 설정 (0.3초마다 setInterval clearInterval실행.. 미쳤지.. Reducer로 수정하기)
        return () => clearInterval(id);
    }, []);

    // 클릭시 인증완료됬는지 판단하고 넘어가는 함수
    const [confirmError, setConfirmError] = useState(false);

    const emailConfirmCheckButtonClick = e => {
        e.preventDefault();
        e.target.disabled = true;
        // axios
        //     .get(`user-service/user/${location.state.id}/emailAuth`)
        //     .then(() => {
        //         // 인증 성공
        //         // 로그인 요청
        //         axios
        //             .post('user-service/login', {
        //                 email: location.state.email,
        //                 password: location.state.password,
        //             })
        //             .then(response => {
        //                 document.cookie = `token=${response.data.data.refreshToken}; path=/; max-age=604800`;
        //                 setUserAuth([true, response.data.data.token]);
        //                 setUserInfo([
        //                     response.data.data.nickname,
        //                     response.data.data.id,
        //                 ]);
        //                 setTimeout(() => {
        //                     reissueToken(
        //                         (login, token) => {
        //                             setUserAuth([login, token]);
        //                         },
        //                         () => {
        //                             setUserInfo([null, 0]);
        //                         },
        //                     );
        //                 }, 1800000 - 60000);
        //                 navigator('/signup/choosetendency', {
        //                     replace: true,
        //                 });
        //             })
        //             .catch(() => {
        //                 // 로그인 실패
        //                 e.target.disabled = false;
        //                 setConfirmError(true);
        //             });
        //     })
        //     .catch(() => {
        //         // 인증 실패
        //         e.target.disabled = false;
        //         setConfirmError(true);
        //     });
    };

    return (
        <SignupCheckEmailStyled>
            <TitleStyle>인증 메일을 확인해주세요</TitleStyle>
            <TextStyle>
                <div>
                    등록해주신 이메일{' '}
                    <HighlightTextStyle>
                        {location.state.email}
                    </HighlightTextStyle>
                    로 인증 메일을 보내드렸습니다.{' '}
                </div>
                <div>이메일 인증이 완료되면 아래의 버튼을 눌러주세요.</div>
            </TextStyle>

            <TimerStyle>
                {count > 0
                    ? count >= 60
                        ? count % 60 >= 10
                            ? `남은 시간 ${Math.floor(count / 60)}분${
                                  count % 60
                              }초`
                            : `남은 시간 ${Math.floor(count / 60)}분0${
                                  count % 60
                              }초`
                        : `남은 시간 ${count % 60}초`
                    : ``}
            </TimerStyle>
            <ErrorStyle>
                {confirmError ? '인증 실패했습니다. 다시 확인해주세요.' : ''}
            </ErrorStyle>

            {count > 0 ? (
                <ButtonStyle
                    color="#0054FD"
                    cursor="pointer"
                    onClick={emailConfirmCheckButtonClick}
                >
                    인증 완료
                </ButtonStyle>
            ) : (
                <ButtonStyle color="#7A7A7A">
                    죄송합니다. 처음부터 다시 시도해주세요
                </ButtonStyle>
            )}
        </SignupCheckEmailStyled>
    );
}

export default SignupCheckEmail;
const SignupCheckEmailStyled = styled.div`
    margin-top: 64px;
    width: 480px;
    position: relative;
    left: 50%;
    margin-left: -240px;
    height: calc(100vh - 304px);
`;

const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 28px;
`;

const TextStyle = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-around;
`;

const HighlightTextStyle = styled.span`
    color: #0054fd;
`;
const TimerStyle = styled.div`
    height: 36px;
    text-align: center;
    font-size: 24px;
    margin-top: 40px;
    font-weight: 500;
    color: #0054fd;
`;

const ErrorStyle = styled.div`
    color: #e5503c;
    font-weight: 400;
    font-size: 12px;
    height: 12px;
    margin-left: 10px;
    text-align: center;
    margin-right: 8px;
`;

const ButtonStyle = styled.button`
    width: 480px;
    height: 48px;
    border-radius: 4px;
    margin-top: 20px;
    border-style: none;
    font-size: 16px;
    color: white;
    background: ${props => props.color};
    cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
