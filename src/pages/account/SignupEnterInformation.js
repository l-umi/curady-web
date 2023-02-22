import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userAuthState, userInfoState } from '../../data/User';

function SignupEnterInformation() {
    const location = useLocation();
    const navigator = useNavigate();
    const userAuth = useRecoilValue(userAuthState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [info, setInfo] = useState({
        nickname: '',
        gitUrl: '',
        blogUrl: '',
        description: '',
    });
    const [duplicationError, setDuplicationError] = useState(false);

    useEffect(() => {
        const nickname = new URL(window.location).searchParams.get('nickname');
        if (nickname) {
            setInfo({ ...info, nickname });
        }
    }, []);

    const inputText = e => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const finishButtonClick = e => {
        // console.log('가입완료 버튼 클릭');
        e.preventDefault();
        if (info.nickname) {
            e.target.disabled = true;
            // axios
            //     .patch(
            //         'user-service/auth/user/info',
            //         {
            //             ...location.state.info,
            //             nickname: info.nickname,
            //             gitUrl: info.gitUrl,
            //             blogUrl: info.blogUrl,
            //             description: info.description,
            //         },
            //         { headers: { 'X-AUTH-TOKEN': userAuth[1] } },
            //     )
            //     .then(() => {
            //         setUserInfo([info.nickname, userInfo[1]]);
            //         navigator('/', { replace: true });
            //     })
            //     .catch(err => {
            //         e.target.disabled = false;
            //         // console.log(err);
            //         if (err.response.status === 409) {
            //             setDuplicationError(true);
            //         } else {
            //             alert('문제가 발생했습니다. 죄송합니다.');
            //         }
            //     });
        }
        setDuplicationError(false);
    };

    return (
        <SignupEnterInformationStyled>
            <TitleStyle>거의 다 왔어요!</TitleStyle>
            <TextStyle>조금 더 알려주세요.</TextStyle>
            <div>
                <SubTitleStyle>닉네임</SubTitleStyle>
                <InputStyle
                    placeholder={info.nickname}
                    name="nickname"
                    onChange={inputText}
                    maxLength="10" // 글자수 제한...
                />

                <SubTitleStyle>Git 주소</SubTitleStyle>
                <InputStyle
                    // placeholder="curady.github.io"
                    name="gitUrl"
                    onChange={inputText}
                />

                <SubTitleStyle>블로그 주소</SubTitleStyle>
                <InputStyle
                    // placeholder="curady.tistory.com"
                    name="blogUrl"
                    onChange={inputText}
                />

                <SubTitleStyle>한줄 소개</SubTitleStyle>
                <LongInputStyle
                    // placeholder="안녕하세요. 1년차 개발자 큐레디입니다"
                    name="description"
                    onChange={inputText}
                />

                <ErrorStyle>
                    {duplicationError ? '중복된 닉네임입니다.' : ''}
                </ErrorStyle>

                {info.nickname ? (
                    <ButtonStyle
                        color="#0054FD"
                        cursor="pointer"
                        onClick={finishButtonClick}
                    >
                        가입 완료
                    </ButtonStyle>
                ) : (
                    <ButtonStyle color="#7A7A7A">가입 완료</ButtonStyle>
                )}
            </div>
        </SignupEnterInformationStyled>
    );
}

export default SignupEnterInformation;

const SignupEnterInformationStyled = styled.div`
    margin-top: 64px;
    font-size: 24px;

    width: 480px;
    height: 773px;

    position: relative;
    left: 50%;
    margin-left: -240px;
`;
const TitleStyle = styled.div`
    font-size: 24px;

    font-weight: 700;
    text-align: left;
    margin-bottom: 8px;
    line-height: 35px;
`;

const TextStyle = styled.div`
    font-size: 14px;
    height: 40px;
    line-height: 20px;
    margin-bottom: 28px;
`;

const SubTitleStyle = styled.div`
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 8px;
`;
const InputStyle = styled.input`
    border-radius: 4px;
    width: 480px;
    height: 48px;
    font-size: 14px;
    border-color: #d0d0d0;
    border-style: solid;
    border-width: 1px;
    padding-left: 12px;
    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const LongInputStyle = styled.textarea`
    height: 96px;
    width: 480px;
    padding-left: 12px;
    padding-top: 14px;
    border: solid #d0d0d0 1px;
    border-radius: 4px;
    font-size: 14px;

    line-height: 20px;
    resize: none;
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
    text-align: center;
    margin-right: 8px;
    margin-top: 10px;
`;

const ButtonStyle = styled.button`
    width: 496px;
    height: 48px;
    border-radius: 4px;
    margin-top: 22px;
    border-style: none;
    font-size: 16px;
    color: white;
    background: ${props => props.color};
    cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
