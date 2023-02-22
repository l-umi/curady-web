import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import Loading from '../../components/Loading';
import { userInfoState, userAuthState, reissueToken } from '../../data/User';
import questionIcon from '../../images/questionIcon_777777.png';
import RemembermeModal from '../../components/modal/RemembermeModal';

function Login() {
    // 1. '로그인 상태 유지' 관련 기능과 모달창
    function pleaseAuthLogout() {
        if (!document.querySelector('input[id="auth"]').checked) {
            localStorage.setItem('curadyLogin', 'pleasAutoLogout');
        }
    }
    const [modalopen, setModalopen] = useState(false);

    // 2. 로딩 화면
    const [loading, setLoading] = useState(false);

    // 3. 로그인 입력과 시도
    // 3-1. 로그인 입력 에러 : 이메일 형식이 다른 경우
    const regEmail =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const [validEmailError, setValidEmailError] = useState(false);
    // 3-2. 로그인 입력 에러 : 비밀번호가 짧은 경우
    const [passwordError, setPasswordError] = useState(false);
    // 3-3. 로그인 시도 실패 : 존재하지 않는 이메일이거나 비밀번호가 일치하지 않는 경우
    const [loginError, setLoginError] = useState(false);

    // 4. 로그인 처리 과정
    const navigator = useNavigate();
    const setUserInfo = useSetRecoilState(userInfoState);
    const setUserAuth = useSetRecoilState(userAuthState);
    const loginButtonClick = e => {
        e.preventDefault();
        const email = e.target.email.value;
        if (regEmail.test(email) && e.target.password.value.length >= 7) {
            e.target.disabled = true;
            setLoading(true);
        //     axios
        //         .post('/user-service/login', {
        //             email,
        //             password: e.target.password.value,
        //         })
        //         .then(response => {
        //             setUserInfo([
        //                 response.data.data.nickname,
        //                 response.data.data.id,
        //             ]);
        //             setUserAuth([true, response.data.data.token]);
        //             // 로그인 상태 유지 체크한 경우에만 토큰을 저장한다
        //             if (document.querySelector('input[id="auth"]').checked) {
        //                 document.cookie = `token=${response.data.data.refreshToken}; path=/; max-age=604800`;
        //             }
        //             setTimeout(() => {
        //                 reissueToken(
        //                     (login, token) => {
        //                         setUserAuth([login, token]);
        //                     },
        //                     () => {
        //                         setUserInfo([null, 0]);
        //                     },
        //                 );
        //             }, 1800000 - 60000);
        //             navigator('/', {
        //                 replace: true,
        //             });
        //         })
        //         .catch(error => {
        //             e.target.disabled = false;
        //             // console.log(error);
        //             if (error.response.status === 404) {
        //                 setLoginError(true);
        //             } else if (error.response.data.code === -105) {
        //                 alert('이메일 인증이 필요한 계정입니다');
        //             } else if (error.response.data.code === -102) {
        //                 setLoginError(true);
        //             } else {
        //                 alert('문제가 발생하여 로그인에 실패했습니다.');
        //             }
        //             setLoading(false);
        //         });
        }

        setValidEmailError(!regEmail.test(email));
        setPasswordError(e.target.password.value.length < 7);
        setLoginError(false);
    };

    return (
        <LoginStyle>
            {loading ? <Loading /> : null}
            {modalopen ? <RemembermeModal setModalopen={setModalopen} /> : null}
            <TitleStyle>로그인</TitleStyle>
            <ErrorStyle>
                {loginError
                    ? '존재하지 않는 이메일이거나 비밀번호가 올바르지 않습니다.'
                    : ''}
            </ErrorStyle>
            <form onSubmit={loginButtonClick}>
                <div>
                    <SubTitleStyle>이메일</SubTitleStyle>
                    <InputStyle name="email" placeholder="example@curady.kr" />
                    <ErrorStyle>
                        {validEmailError
                            ? '올바르지 않은 이메일 형식입니다.'
                            : ''}
                    </ErrorStyle>
                </div>
                <div>
                    <SubTitleStyle>비밀번호</SubTitleStyle>
                    <InputStyle
                        type="password"
                        name="password"
                        placeholder="*******"
                    />
                    <ErrorStyle>
                        {!validEmailError && passwordError
                            ? '비밀번호는 7자 이상 입력해주세요.'
                            : ''}
                    </ErrorStyle>
                </div>
                <CheckboxContainerStyle>
                    <CheckboxStyle
                        type="checkbox"
                        id="auth"
                        defaultChecked // 디폴트가 체크
                    />{' '}
                    <LabelStyle htmlFor="auth">로그인 상태 유지</LabelStyle>
                    <QuestionStyle
                        src={questionIcon}
                        onClick={() => {
                            setModalopen(true);
                        }}
                    />
                </CheckboxContainerStyle>
                <MarginStyle>
                    <ButtonStyle
                        type="submit"
                        backgroundColor="#0054FD"
                        color="#FFFFFF"
                    >
                        로그인
                    </ButtonStyle>
                </MarginStyle>
            </form>

            <EntranceStyle>
                <AsideStlye>
                    <FindPasswordStyle to="/findpassword">
                        비밀번호 찾기
                    </FindPasswordStyle>{' '}
                    |<SignupStyle to="/signup"> 회원가입</SignupStyle>
                </AsideStlye>
            </EntranceStyle>

            <MarginStyle>
                <a href="https://kauth.kakao.com/oauth/authorize?client_id=254b82e58533145de909f613785d9999&redirect_uri=https://curady.kr/auth/kakao/callback&response_type=code">
                    <ButtonStyle
                        backgroundColor="#FCE750"
                        color="#000000"
                        onClick={pleaseAuthLogout}
                    >
                        <IconStyle src="logos/kakao.png" alt="KakaoIcon" />
                        카카오로 로그인하기
                    </ButtonStyle>
                </a>
            </MarginStyle>
            <MarginStyle>
                <a href="https://nid.naver.com/oauth2.0/authorize?client_id=D2BLS_XOE7YKWdj7n7VG&response_type=code&state=project&redirect_uri=https://curady.kr/auth/naver/callback">
                    <ButtonStyle
                        backgroundColor="#5AC251"
                        color="#FFFFFF"
                        onClick={pleaseAuthLogout}
                    >
                        <IconStyle src="logos/naver.png" alt="NaverIcon" />
                        네이버로 로그인하기
                    </ButtonStyle>
                </a>
            </MarginStyle>
            <MarginStyle>
                <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=820009626444-fpmpr75ik4d3409e98h3tvj7dhu713ia.apps.googleusercontent.com&response_type=code&scope=email profile&redirect_uri=https://curady.kr/auth/google/callback">
                    <ButtonStyle
                        backgroundColor="#F8F8F8"
                        color="#000000"
                        onClick={pleaseAuthLogout}
                    >
                        <IconStyle src="logos/google.png" alt="GoogleIcon" />
                        구글로 로그인하기
                    </ButtonStyle>
                </a>
            </MarginStyle>
        </LoginStyle>
    );
}

export default Login;

const LoginStyle = styled.div`
    display: flex;
    min-height: 700px;
    height: calc(100vh - 240px);
    flex-direction: column;
    padding-top: calc(9vh);
    align-items: center;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 16px;
`;

const SubTitleStyle = styled.div`
    font-size: 16px;
    margin-top: 10px;
`;

const InputStyle = styled.input`
    border-radius: 4px;
    width: 300px;
    height: 48px;
    font-size: 14px;
    border-color: #dddddd;
    border-style: solid;
    border-width: 1px;
    padding: 0px 7.5px 0px 7.5px;
    margin: 5px 5px 5px 5px;
    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const ErrorStyle = styled.div`
    color: #e5503c;
    font-weight: 400;
    font-size: 12px;
    height: 12px;
    margin-left: 10px;
`;

const EntranceStyle = styled.div`
    border-bottom: solid 1px #d0d0d0;
    padding-bottom: 31px;
    width: 315px;
`;

const IconStyle = styled.img`
    width: 20px;
    height: 20px;
    position: relative;
    top: 4px;
    margin-right: 6px;
`;

const CheckboxContainerStyle = styled.div`
    display: flex;
    margin-left: 5px;
    align-items: center;
    line-height: 17px;
`;

const CheckboxStyle = styled.input`
    cursor: pointer;
`;

const LabelStyle = styled.label`
    cursor: pointer;
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 2px;
    color: #777;
`;

const QuestionStyle = styled.img`
    width: 13px;
    height: 13px;
    cursor: pointer;
    margin-left: 3px;
`;

const MarginStyle = styled.span`
    display: inline-block;
    margin-top: 10px;
`;

const ButtonStyle = styled.button`
    width: 320px;
    height: 48px;
    border-radius: 4px;
    border-style: none;
    font-size: 16px;
    color: ${props => props.color};
    background: ${props => props.backgroundColor};
    border: none;
    cursor: pointer;
    // display:flex;
    // justify-content: center;
    // align-items: center;
`;
const AsideStlye = styled.div`
    margin-top: 12px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
`;

const FindPasswordStyle = styled(Link)`
    text-decoration: none;
    color: #0054fd;
`;

const SignupStyle = styled(Link)`
    text-decoration: none;
    color: #0054fd;
`;
