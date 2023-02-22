import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import AccesstermsModal from '../../components/modal/AccesstermsModal';

function Signup() {
    // 1. '이용약관 어쩌구' 관련 모달창
    const [modalopen, setModalopen] = useState(false);

    // 2. 로딩 화면
    const [loading, setLoading] = useState(false);
    // 3. 로그인 입력과 시도
    const regEmail =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const [feedError, setFeedError] = useState({
        validEmailError: false,
        conflictEmailError: false,
        passwordError: false,
        passwordCheckError: false,
    });

    // 4. 로그인 처리 과정
    const navigator = useNavigate();
    const [feed, setFeed] = useState({
        email: '',
        password: '',
        passwordCheck: '',
    });
    const onChangeFeed = useCallback(
        e => {
            setFeed({ ...feed, [e.target.name]: e.target.value });
        },
        [feed],
    );

    const signupButtonClick = e => {
        e.preventDefault();

        if (
            regEmail.test(feed.email) &&
            !(feed.password.length < 7) &&
            feed.password === feed.passwordCheck
        ) {
            e.target.disabled = true;
            setLoading(true);
            // axios
            //     .post('/user-service/signup', {
            //         email: feed.email,
            //         password: feed.password,
            //     })
            //     .then(response => {
            //         navigator('/signup/checkemail', {
            //             state: {
            //                 email: feed.email,
            //                 password: feed.password,
            //                 expireDate: response.data.data.expireDate,
            //                 id: response.data.data.id,
            //             },
            //         });
            //     })
            //     .catch(error => {
            //         if (error.response.status === 409) {
            //             setFeedError({
            //                 ...feedError,
            //                 conflictEmailError: true,
            //             });
            //         } else {
            //             alert('오류가 발생하여 회원가입에 실패했습니다.');
            //         }
            //         e.target.disabled = false;
            //         setLoading(false);
            //     });
        }

        setFeedError({
            validEmailError: !regEmail.test(feed.email),
            conflictEmailError: false,
            passwordError: feed.password.length < 7,
            passwordCheckError: !(feed.password === feed.passwordCheck),
        });
    };

    return (
        <SignupStyle>
            {loading ? <Loading /> : null}
            {modalopen ? (
                <AccesstermsModal setModalopen={setModalopen} />
            ) : null}
            <TitleStyle>회원가입</TitleStyle>

            <form>
                <div>
                    <SubTitleStyle>이메일</SubTitleStyle>
                    <InputStyle
                        type="text"
                        name="email"
                        value={feed.email}
                        onChange={onChangeFeed}
                        placeholder="example@curady.kr"
                    />
                    <ErrorStyle>
                        {feedError.validEmailError
                            ? '올바르지 않은 이메일 형식입니다.'
                            : feedError.conflictEmailError
                            ? '이미 가입되어있는 이메일입니다'
                            : ''}
                    </ErrorStyle>
                </div>

                <div>
                    <SubTitleStyle> 비밀번호</SubTitleStyle>
                    <InputStyle
                        type="password"
                        name="password"
                        value={feed.password}
                        onChange={onChangeFeed}
                        placeholder="*******"
                    />

                    <ErrorStyle>
                        {!feedError.validEmailError &&
                        !feedError.conflictEmailError &&
                        feedError.passwordError
                            ? '비밀번호는 7자 이상 입력해주세요.'
                            : ''}
                    </ErrorStyle>
                </div>

                <div>
                    <SubTitleStyle> 비밀번호 확인</SubTitleStyle>
                    <InputStyle
                        type="password"
                        name="passwordCheck"
                        value={feed.passwordCheck}
                        onChange={onChangeFeed}
                        placeholder="*******"
                    />
                    <ErrorStyle>
                        {!feedError.validEmailError &&
                        !feedError.conflictEmailError &&
                        !feedError.passwordError &&
                        feedError.passwordCheckError
                            ? '비밀번호가 일치하지 않습니다.'
                            : ''}
                    </ErrorStyle>
                </div>

                <ButtonStyle
                    onClick={signupButtonClick}
                    backgroundColor="#0054FD"
                    color="#FFFFFF"
                >
                    가입하기
                </ButtonStyle>
            </form>

            <BottomTextStyle>
                <ClickTextStyle
                    onClick={() => {
                        setModalopen(true);
                    }}
                >
                    이용약관, 개인정보 수집 및 이용, 개인정보 제공 내용
                </ClickTextStyle>
                을 확인하였고 이에 모두 동의합니다.
            </BottomTextStyle>

            <MarginStyle>
                <a href="https://kauth.kakao.com/oauth/authorize?client_id=254b82e58533145de909f613785d9999&redirect_uri=https://curady.kr/auth/kakao/callback&response_type=code">
                    <ButtonStyle backgroundColor="#FCE750" color="#000000">
                        <IconStyle src="logos/kakao.png" alt="KakaoIcon" />
                        카카오로 시작하기
                    </ButtonStyle>
                </a>
            </MarginStyle>

            <MarginStyle>
                <a href="https://nid.naver.com/oauth2.0/authorize?client_id=D2BLS_XOE7YKWdj7n7VG&response_type=code&state=project&redirect_uri=https://curady.kr/auth/naver/callback">
                    <ButtonStyle backgroundColor="#5AC251" color="#FFFFFF">
                        <IconStyle src="logos/naver.png" alt="NaverIcon" />
                        네이버로 시작하기
                    </ButtonStyle>
                </a>
            </MarginStyle>

            <MarginStyle>
                <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=820009626444-fpmpr75ik4d3409e98h3tvj7dhu713ia.apps.googleusercontent.com&response_type=code&scope=email profile&redirect_uri=https://curady.kr/auth/google/callback">
                    <ButtonStyle backgroundColor="#F8F8F8" color="#000000">
                        <IconStyle src="logos/google.png" alt="GoogleIcon" />
                        구글로 시작하기
                    </ButtonStyle>
                </a>
            </MarginStyle>
        </SignupStyle>
    );
}

export default Signup;

const SignupStyle = styled.div`
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
    margin-bottom: 28px;
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

const BottomTextStyle = styled.div`
    padding-top: 12px;
    width: 320px;
    border-bottom: solid 1px #d0d0d0;
    padding-bottom: 20px;
    color: #575757;
    line-height: 17px;
    font-size: 12px;
`;

const ClickTextStyle = styled.span`
    color: #0054fd;
    cursor: pointer;
`;

const IconStyle = styled.img`
    width: 20px;
    height: 20px;
    position: relative;
    top: 4px;
    margin-right: 6px;
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
    cursor: pointer;
`;
