import { useRoutes } from 'react-router-dom';
import {
    Main,
    Lectures,
    Lecture,
    Roadmaps,
    Roadmap,
    Login,
    Signup,
    SocialLogin,
    SignupCheckEmail,
    SignupConfirmEmail,
    SignupChooseTendency,
    SignupEnterInformation,
    FindPassword,
    FindPasswordCheckEmail,
    FindPasswordChangePassword,
    SearchResult,
    Mypage,
    ViewAll,
    Editprofile,
    ChangePassword,
    Withdrawal,
    Uncompleted,
    NotFound,
    RoadmapPost,
    PlayList,
    Play,
} from './pages/index';
import RoadmapId9 from './data/RoadmapId9';
import RoadmapId10 from './data/RoadmapId10';

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Main />,
        },
        // 강의
        {
            path: '/lectures',
            element: <Lectures />,
        },
        {
            path: '/lectures/:categoryId',
            element: <Lectures />,
        },
        // 강의 상세페이지
        {
            path: '/lecture/:lectureId',
            element: <Lecture />,
        },
        // 검색 결과
        {
            path: '/search',
            element: <SearchResult />,
        },
        // 로드맵
        {
            path: '/roadmaps',
            element: <Roadmaps />,
        },
        // 로드맵 등록 요청
        {
            path: '/roadmap/registration-request',
            element: <RoadmapPost />,
        },
        // 로드맵 상세페이지
        {
            path: '/roadmap/:roadmapId',
            element: <Roadmap />,
        },
        // 로드맵 더미데이터
        {
            path: '/roadmap/description/9',
            element: <RoadmapId9 />,
        },
        {
            path: '/roadmap/description/10',
            element: <RoadmapId10 />,
        },
        // 플레이
        {
            path: '/playlist',
            element: <PlayList />,
        },
        {
            path: '/play/:playId',
            element: <Play />,
        },
        // account
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/signup',
            element: <Signup />,
        },
        {
            path: '/auth/:provider/callback',
            element: <SocialLogin />,
        },
        {
            path: '/mypage',
            element: <Mypage />,
        },
        {
            path: '/mypage/ViewAll/:type',
            element: <ViewAll />,
        },
        {
            path: '/mypage/editprofile',
            element: <Editprofile />,
        },
        {
            path: '/mypage/changepassword',
            element: <ChangePassword />,
        },
        {
            path: '/mypage/withdrawal',
            element: <Withdrawal />,
        },
        // 회원가입
        {
            path: '/signup/checkemail',
            element: <SignupCheckEmail />,
        },
        {
            path: '/signup/confirmemail',
            element: <SignupConfirmEmail />,
        },
        {
            path: '/signup/choosetendency',
            element: <SignupChooseTendency />,
        },
        {
            path: '/signup/enterinformation',
            element: <SignupEnterInformation />,
        },
        // 비밀번호 찾기
        {
            path: '/findpassword',
            element: <FindPassword />,
        },
        {
            path: '/findpassword/checkemail',
            element: <FindPasswordCheckEmail />,
        },
        {
            path: '/findpassword/changepassword',
            element: <FindPasswordChangePassword />,
        },
        // 개발중
        {
            path: '/404',
            element: <Uncompleted />,
        },
        {
            path: '/*',
            element: <NotFound />,
        },
    ]);
};

export default Routes;
