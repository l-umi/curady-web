import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { reissueToken, userAuthState, userInfoState } from '../../data/User';

function SocialLogin() {
    // URL 파라미터 ( useParam 사용)
    const { provider } = useParams();

    // 쿼리스트링 (URL 객체 선언)
    const urlQuery = new URL(window.location).searchParams;

    const setUserAuth = useSetRecoilState(userAuthState);
    const setUserInfo = useSetRecoilState(userInfoState);
    // code 보내주고 리다이렉션시키기
    const navigator = useNavigate();

    useEffect(() => {
        // axios
        //     .post(`/user-service/login/${provider}`, {
        //         code: urlQuery.get('code'),
        //     })
        //     .then(response => {
        //         const { data } = response.data;
        //         // 자동로그아웃 확인하기
        //         if (localStorage.getItem('curadyLogin') === 'pleasAutoLogout') {
        //             localStorage.removeItem('curadyLogin');
        //         } else {
        //             document.cookie = `token=${data.refreshToken}; path=/; max-age=604800`;
        //         }
        //         // 30분 후 재발급
        //         setTimeout(() => {
        //             reissueToken(
        //                 (login, token) => {
        //                     setUserAuth([login, token]);
        //                 },
        //                 () => {
        //                     setUserInfo([null, 0]);
        //                 },
        //             );
        //         }, 1800000 - 60000);
        //         setUserAuth([true, data.token]);

        //         if (data.isFirst) {
        //             setUserInfo([data.tempNickname, data.id]);
        //             navigator(
        //                 `/signup/choosetendency?nickname=${data.nickname}`,
        //                 {
        //                     replace: true,
        //                 },
        //             );
        //         } else {
        //             setUserInfo([data.nickname, data.id]);
        //             navigator(`/`, {
        //                 replace: true,
        //             });
        //         }
        //     })
        //     .catch(error => {
        //         alert(`${provider} 로그인에 실패했습니다`);
        //         navigator('/', {
        //             replace: true,
        //         });
        //     });
    }, []);
    return <SocialLoginStyle />;
}

export default SocialLogin;

const SocialLoginStyle = styled.div`
    z-index: 10000;
    position: fixed;
    height: 100vh;
    width: 100vw;
    margin-top: -92px;
    background-color: white;
    text-align: center;
    size: 36px;
`;
