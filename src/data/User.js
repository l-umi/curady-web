import { atom } from 'recoil';
import axios from 'axios';
import { recoilPersist } from 'recoil-persist';

/* 1. 로그인 상태와 액세스 토큰을 담고 있는 변수(페이지 리로드시 재발급)
    userAuth[0] 로그인(login) 상태 : 'loading', true, false
    userAuth[1] 토큰(token) 정보 : '', '어쩌구저쩌구'
    가능한 값 : ['loading', ''], [true, '어쩌구저쩌구'], [false, '']
*/
const userAuthState = atom({
    key: 'userAuthState',
    default: ['loading', ''],
});

/* 2. 닉네임과 아이디를 담고 있는 변수(로컬스토리지에 저장, 페이지 리로드해도 유지)
    userInfo[0] 닉네임(nickname) 정보 : undefined, '어쩌구저쩌구'
    userInfo[1] 아이디(id) 정보 : 0, 숫자
    가능한 값 : [undefined,0], ['어쩌구저쩌구', 숫자]
 */
const { persistAtom } = recoilPersist();
const userInfoState = atom({
    key: 'userInfoState',
    default: [null, 0],
    effects_UNSTABLE: [persistAtom],
});

// 3. getCookie 함수 : 쿠키에서 token(리프레쉬토큰) 파싱해서 가져오는 함수
function getCookie(name) {
    const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return value ? unescape(value[2]) : false; // 존재하지 않으면 false반환
}

/* 4. reissueToken 함수 : IsLogined컴포넌트(헤더)에서 사용 
    페이지 리로드시 토큰 재발급하고, 액세스토큰 만료 전에 연장하는 함수
*/
function reissueToken(setUserAuth, setUserInfo) {
    const refreshToken = getCookie('token');
    // console.log('재발급');
    if (refreshToken) {
        // loading : 가지고 있는 리프레쉬 토큰으로 로그인 시도 중이야
        // setUserAuth('loading', '');
        // axios
        //     .post('/user-service/reissue', {
        //         refreshToken,
        //     })
        //     .then(response => {
        //         document.cookie = `token=${response.data.data.refreshToken}; path=/; max-age=604800`; // 1주
        //         setUserAuth(true, response.data.data.accessToken);
        //         setTimeout(() => {
        //             reissueToken(setUserAuth, setUserInfo);
        //             // }, 3000); // 테스트용
        //         }, 1800000 - 60000); // 29분
        //     })
        //     .catch(() => {
        //         // console.log('failed!');
        //         setUserAuth(false, '');
        //     });
    } else {
        setUserAuth(false, '');
        // 쿠키에 리프레쉬토큰이 없으면(만료됬거나 쿠키를 지움) 로그아웃처리(닉네임 아이디 지우기)
        setUserInfo();
    }
}

export { userAuthState, userInfoState, reissueToken };
export default getCookie;
