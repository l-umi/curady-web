import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { reissueToken, userAuthState, userInfoState } from '../data/User';
// 헤더의 오른쪽 버튼

function IsLogined({ clickBar, setClickBar }) {
    const [userAuth, setUserAuth] = useRecoilState(userAuthState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    useEffect(() => {
        // 페이지 로드시 토큰 재발급
        reissueToken(
            (login, token) => {
                setUserAuth([login, token]);
            },
            () => {
                setUserInfo([null, 0]);
            },
        );
    }, []);

    // useEffect(() => {
    //     console.log('IsLogined 리덴더링');
    //     console.log(userAuth);
    //     console.log(userInfo);
    // });
    const guestButton = (
        <GuestButtonContainerStyle open={clickBar[1]}>
            <LoginMarginStyle>
                <Link to="/login">
                    <ButtonStyle
                        color="#0054fd"
                        backcolor="#FFFFFF"
                        width="84px"
                        onClick={() => {
                            setClickBar([false, false]);
                        }}
                    >
                        로그인
                    </ButtonStyle>
                </Link>
            </LoginMarginStyle>
            <Link to="/signup">
                <ButtonStyle
                    color="#FFFFFF"
                    backcolor="#0054fd"
                    width="98px"
                    onClick={() => {
                        setClickBar([false, false]);
                    }}
                >
                    회원가입
                </ButtonStyle>
            </Link>
        </GuestButtonContainerStyle>
    );

    return (
        <div>
            {/* <button
                onClick={() => {
                    console.log(userAuth);
                    console.log(userInfo);
                }}
            >
                변수값 확인
            </button> */}
            {userAuth[0] === true ? (
                <DropDownStyle
                    open={clickBar[1]}
                    color="#FFFFFF"
                    backcolor="#0054fd"
                >
                    <NicknameButtonStyle>{userInfo[0]} 님</NicknameButtonStyle>

                    <MypageMarginStyle>
                        <Link to="/mypage">
                            <DropButtonStyle
                                onClick={() => {
                                    setClickBar([false, false]);
                                }}
                            >
                                마이페이지
                            </DropButtonStyle>
                        </Link>
                    </MypageMarginStyle>
                    <DropButtonStyle
                        onClick={() => {
                            document.cookie =
                                'token=; expires=Sat, 01 Jan 1972 00:00:00 GMT; max-age=-10000000000;';
                            setUserAuth([false, '']);
                            setUserInfo([null, 0]);
                            setClickBar([false, false]);
                        }}
                    >
                        로그아웃
                    </DropButtonStyle>
                </DropDownStyle>
            ) : (
                guestButton
            )}
        </div>
    );
}

export default IsLogined;

const DropDownStyle = styled.div`
    @media screen and (min-width: 769px) {
        display: flex;
        flex-direction: column;
        height: 40px;
        &:hover {
            top: 46px;
            position: relative;
            height: 132px;
        }
        border-radius: 20px;
        /* 이거안하면 마이페이지에서 호버시 바로사라짐 */
        z-index: 1;
    }
    display: ${props => (props.open ? 'block' : 'none')};
`;

const NicknameButtonStyle = styled.button`
    background-color: #0054fd;
    color: #ffffff;
    height: 40px;
    padding: 0 18px 3px 18px;
    border: solid 1px;
    border-color: #0054fd;
    border-radius: 100px;
    font-weight: 700;
    font-size: 14px;
    min-width: 103px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const MypageMarginStyle = styled.div`
    @media screen and (min-width: 769px) {
        margin: 7px 0 4px 0;
        width: 100%;
        display: none;
        ${DropDownStyle}:hover & {
            display: block;
        }
    }
    @media screen and (max-width: 768px) {
        display: inline-block;
    }
`;

const DropButtonStyle = styled.button`
    background-color: #ffffff;
    color: #0054fd;
    height: 40px;
    height: 40px;
    padding: 0 18px 3px 18px;
    border: solid 1px;
    border-color: #0054fd;
    border-radius: 100px;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    @media screen and (min-width: 769px) {
        display: none;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        transform-origin: top center;
        width: 100%;
        @keyframes menuAni {
            0% {
                /* transform-origin: 30px; */
                transform: translateY(-10px);
                opacity: 0;
            }
            100% {
                transform: translateY(0px);
                opacity: 1;
            }
        }
        animation: menuAni 0.5s;
        ${DropDownStyle}:hover & {
            display: inline-block;
        }
    }
    @media screen and (max-width: 768px) {
        display: inline-block;
        margin-right: 8px;
    }
`;

const GuestButtonContainerStyle = styled.div`
    display: flex;
    @media screen and (max-width: 768px) {
        display: ${props => (props.open ? 'inline-flex' : 'none')};
    }
`;

const LoginMarginStyle = styled.div`
    margin: 0 8px 0 0;
    width: 100%;
`;

const ButtonStyle = styled.button`
    background-color: ${props => props.backcolor};
    color: ${props => props.color};
    width: ${props => props.width};
    height: 40px;
    padding: 0 18px 3px 18px;
    border: solid 1px;
    border-color: #0054fd;
    border-radius: 100px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
`;
