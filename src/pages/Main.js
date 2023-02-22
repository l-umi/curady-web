import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import Tendency from '../components/Tendency';
import RecommendItem from '../components/item/RecommendItem';
import loadingImg from '../images/spinner_0054fd_150px.gif';
import { userAuthState, userInfoState } from '../data/User';
import Banner from '../components/Banner';

function MainGuest() {
    const [firstData, setFirstData] = useState([]);
    const [secondData, setSecondData] = useState([]);
    const [thirdData, setThirdData] = useState([]);
    const userAuth = useRecoilValue(userAuthState);
    const userInfo = useRecoilValue(userInfoState);

    useEffect(() => {
        // 무료 페이지가 25개
        const random = Math.floor(Math.random() * 25) + 1;
        // axios
        //     .get(`/lecture-service/lectures?price=0,0&page=${random}&sort=name`)
        //     .then(response => {
        //         const suffleData = response.data.data;
        //         suffleData.sort(() => Math.random() - 0.5);
        //         setFirstData(suffleData);
        //     })
        //     .catch(() => {
        //         alert('강의 조회의 문제가 발생했습니다');
        //     });
        // axios
        //     .get(`/lecture-service/lectures?sort=views,desc`)
        //     .then(response => {
        //         setSecondData(response.data.data);
        //     })
        //     .catch(() => {
        //         alert('강의 조회의 문제가 발생했습니다');
        //     });
        // axios
        //     .get(`/lecture-service/lectures?sort=updatedAt,desc`)
        //     .then(response => {
        //         setThirdData(response.data.data);
        //     })
        //     .catch(() => {
        //         alert('강의 조회의 문제가 발생했습니다');
        //     });
    }, []);

    if (userAuth[0] === 'loading') {
        return (
            <MainGuestStyle>
                <img src={loadingImg} alt="Loading" />
            </MainGuestStyle>
        );
    }
    return (
        <MainGuestStyle>
            <Banner />
            <Tendency userAuth={userAuth} nickname={userInfo[0]} />
            <div>
                <TitleStyle>무료부터 시작하는 개발 생활</TitleStyle>
                <RecommendItem data={firstData} />
            </div>

            <div>
                <TitleStyle>요즘 Hot한 인기 강의</TitleStyle>
                <RecommendItem data={secondData} />
            </div>

            <div>
                <TitleStyle>최근 업데이트된 강의</TitleStyle>
                <RecommendItem data={thirdData} />
            </div>
        </MainGuestStyle>
    );
}

export default MainGuest;

const MainGuestStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
    min-height: calc(100vh - 370px);
    min-width: 280px;
`;

const TitleStyle = styled.div`
    font-weight: 700;
    font-size: 24px;
    margin: 40px 3px 20px 3px;
    @media screen and (max-width: 768px) {
        font-size: 16px;
        margin: 20px 20px 10px 20px;
        line-height: 23px;
        width: calc(100vw - 40px);
    }
`;
