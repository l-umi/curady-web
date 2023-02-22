import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import guest from '../../images/guest.png';
import NotFound from '../NotFound';
import { userInfoState, userAuthState } from '../../data/User';

function EditProfile() {
    const location = useLocation();
    const { userProfile } = location.state;
    const [duplicationError, setDuplicationError] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [userAuth, setUserAuth] = useRecoilState(userAuthState);
    const finishButtonClick = e => {
        e.preventDefault();
        e.target.disabled = true;
        const nickname = e.target.nickname.value
            ? e.target.nickname.value
            : userProfile.nickname;
        // axios
        //     .patch(
        //         'user-service/auth/user/info',
        //         {
        //             nickname,
        //             gitUrl: e.target.gitUrl.value,
        //             blogUrl: e.target.blogUrl.value,
        //             description: e.target.description.value,
        //         },
        //         { headers: { 'X-AUTH-TOKEN': userAuth[1] } },
        //     )
        //     .then(() => {
        //         setUserInfo([nickname, userInfo[1]]);
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

        setDuplicationError(false);
    };

    const [image, setImage] = useState(userProfile.imageUrl);
    if (userAuth[0] === false) {
        return <NotFound />;
    }

    // 이미지 업로드

    const fileUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        // 파일 읽기
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onloadend = () => {
            const resultImage = reader.result;
            setImage(resultImage);
        };
        // 여기는 axios용
        const formData = new FormData();
        formData.append('image', e.target.files);
    };

    return (
        <EditProfileStyle>
            <TitleStyle>프로필 편집</TitleStyle>
            <form onSubmit={finishButtonClick}>
                <div>프로필 사진</div>
                <ProfileImgStyle src={image || guest} />
                <NoneInputStyle
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={fileUpload}
                />
                <LabelStyle htmlFor="image">변경</LabelStyle>

                <RoundButtonStyle
                    type="button"
                    color="white"
                    onClick={() => {
                        document.querySelector('#image').value = '';
                        setImage('');
                    }}
                >
                    제거
                </RoundButtonStyle>
                <div>닉네임</div>
                <InputStyle
                    placeholder={userProfile.nickname}
                    name="nickname"
                />
                <div>Git 주소</div>
                <InputStyle placeholder={userProfile.gitUrl} name="gitUrl" />
                <div>블로그 주소</div>
                <InputStyle placeholder={userProfile.blogUrl} name="blogUrl" />
                <div>한줄 소개</div>
                <LongInputStyle
                    placeholder={userProfile.description}
                    name="description"
                />
                <ErrorStyle>
                    {duplicationError ? '중복된 닉네임입니다.' : ' '}
                </ErrorStyle>
                <ButtonStyle type="submit" color="blue">
                    수정 완료
                </ButtonStyle>
            </form>
            <AsideStlye>
                <LinkStyle to="/mypage/changepassword">비밀번호 변경</LinkStyle>{' '}
                | <LinkStyle to="/mypage/withdrawal">회원 탈퇴</LinkStyle>
            </AsideStlye>
        </EditProfileStyle>
    );
}

export default EditProfile;

const EditProfileStyle = styled.div`
    width: 86vw;
    margin: 64px auto 96px auto;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    min-height: calc(100vh - 327px);
    width: 480px;
    font-size: 16px;
    line-height: 23px;
`;

const TitleStyle = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    margin-bottom: 24px;
`;

const ProfileImgStyle = styled.img`
    margin: 13px 10px 16px 0;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    vertical-align: bottom;
    object-fit: cover;
`;

const RegisterImgStyle = styled.input``;

const RoundButtonStyle = styled.button`
    display: inline-block;
    height: 40px;
    color: ${props => (props.color === 'blue' ? '#FFFFFF' : '#0054FD')};
    background-color: ${props =>
        props.color === 'blue' ? '#0054FD' : '#FFFFFF'};
    border: solid 1px #0054fd;
    border-radius: 100px;
    padding: 6px 19px 8px 19px;
    font-weight: 500;
    line-height: 23px;
    margin-bottom: 16px;
    cursor: pointer;
    font-size: 14px;
`;

const LabelStyle = styled.label`
    display: inline-block;
    color: white;
    background-color: #0054fd;
    border: solid 1px #0054fd;
    border-radius: 100px;
    vertical-align: bottom;
    margin-bottom: 16px;
    margin-right: 2px;
    padding: 7px 19px 8px 19px;
    font-weight: 500;
    line-height: 23px;
    cursor: pointer;
    font-size: 14px;
`;
const NoneInputStyle = styled.input`
    display: none;
`;
const InputStyle = styled.input`
    margin: 4px 0 16px 0;
    border-radius: 4px;
    width: 464px;
    height: 44px;
    font-size: 14px;
    border-color: #d0d0d0;
    border-style: solid;
    border-width: 1px;
    padding-left: 12px;
`;

const LongInputStyle = styled.textarea`
    margin: 4px 0 32px 0;
    height: 96px;
    width: 454px;
    padding: 12px 12px 12px 12px;
    border: solid #d0d0d0 1px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
    resize: none;
`;

const ErrorStyle = styled.div`
    color: #e5503c;
    font-size: 12px;
    text-align: center;
    height: 12px;
    margin-top: -24px;
`;

const ButtonStyle = styled.button`
    text-align: center;
    width: 100%;
    height: 48px;
    color: ${props => (props.color === 'blue' ? '#FFFFFF' : '#0054FD')};
    background-color: ${props =>
        props.color === 'blue' ? '#0054FD' : '#FFFFFF'};
    border: solid 1px #0054fd;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    padding-bottom: 4px;
    margin-top: 20px;
    margin-bottom: 16px;
    cursor: pointer;
`;

const AsideStlye = styled.div`
    text-align: center;
    font-size: 12px;
    line-height: 17px;
`;

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: #0054fd;
`;
