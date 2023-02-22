import styled from 'styled-components';
import checkIcon from '../images/checkIcon16.png';

function RoadmapId9() {
    return (
        <RoadmapDescriptionStyle>
            <TitleStyle>
                이 강의들을 따라 학습하다보면
                <br /> 프론트엔드 개발, 기초부터 중급까지의 기술을 익히실수
                있습니다.
                <br />
                <BlueStyle>
                    자바스크립트, CSS 기초 문법과 함께 리액트의 기초
                </BlueStyle>
                를 탄탄하게 다질 수 있습니다.
            </TitleStyle>
            <GreyBoxStyle>
                이런 내용을 담고있어요
                <br />
                <img src={checkIcon} alt="" /> 자바스크립트 기본
                <br />
                <img src={checkIcon} alt="" /> 자바스크립트 응용
                <br />
                <img src={checkIcon} alt="" /> 리액트의 개념
                <br />
                <img src={checkIcon} alt="" /> 리액트를 활용한 미니 프로젝트
                <br />
                <img src={checkIcon} alt="" /> 실전형 코딩
            </GreyBoxStyle>
            <GreyBoxStyle>
                이런 점이 좋았어요
                <br />
                <img src={checkIcon} alt="" /> 꼼꼼한 설명
                <br />
                <img src={checkIcon} alt="" /> 쉽게 배우는 리액트
                <br />
                <img src={checkIcon} alt="" /> 최신 버전의 내용
                <br />
                <img src={checkIcon} alt="" /> 선수 지식이 필요없음
            </GreyBoxStyle>
            <img
                src="https://cdn.inflearn.com/public/files/courses/329170/e0793f14-3239-477c-ba23-5a4264be9ed7/react logo (1).png"
                alt=""
                width="200"
                height="93"
                style={{ display: 'block', margin: '40px auto 20px auto' }}
            />
            리액트를 처음 접하는 사람들도 이 강의로 리액트를 위해 필요한
            대부분의 지식을 습득하실수 있습니다. 개념도 익히고 실습도 하며,
            리액트를 위해 필요한 대부분의 지식을 한번에 습득할 수 있습니다.
            <br />
            React가 탄생한 이유부터 왜 React.js를 사용해야하는지를 이해하고
            기본적인 사용법, 실제 프로덕션 개발을 위한 성능 최적화 기법을
            다룹니다.
            <br />
            자바스크립트 프론트엔드 생태계는 주기적으로 큰 변화가 일어나게
            됩니다. 따라서 이전 버전을 배웠다면, 최신 버전의 사용법과 원리를
            다시 파악해야 합니다. 본 강의는 ES6와 React router V6 등 2021년 기준
            가장 최신의 내용을 담고 있습니다.
            <img
                src="https://cdn.inflearn.com/public/files/courses/328340/44ea5ef1-6e95-4ab7-adb0-4a62039fbc2f/blob"
                alt=""
                width="100%"
                style={{ display: 'block', margin: '10px auto' }}
            />
        </RoadmapDescriptionStyle>
    );
}

export default RoadmapId9;
const RoadmapDescriptionStyle = styled.div`
    padding: 20px 20px 20px 20px;
    line-height: 30px;
    font-size: 16px;
    text-align: left;
    min-height: calc(100vh - 460px);
    font-weight: 500;
    position: absolute;
    z-index: 2000;
    top: 0;
    background-color: white;
    width: calc(100vw - 42px);
    /* border: solid 1px #0054fd; */
    border-radius: 8px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
    font-weight: 700;
`;

const BlueStyle = styled.span`
    color: #0054fd;
`;

const GreyBoxStyle = styled.div`
    border: 1px solid #e9ecef;
    padding: 12px 24px 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
`;
