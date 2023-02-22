import styled from 'styled-components';
import checkIcon from '../images/checkIcon16.png';

function RoadmapId10() {
    return (
        <RoadmapDescriptionStyle>
            <TitleStyle>
                이 강의들을 따라 학습하다보면
                <br /> 머신 러닝 초급부터 중급까지의 기술을 익히실수 있습니다.
                <br />
                <BlueStyle>파이썬을 통해 머신 러닝</BlueStyle>을 배워보세요.{' '}
            </TitleStyle>
            <GreyBoxStyle>
                이런 내용을 담고있어요
                <br />
                <img src={checkIcon} alt="" /> 판다스, 넘파이 기본
                <br />
                <img src={checkIcon} alt="" /> SQL 기초
                <br />
                <img src={checkIcon} alt="" /> 탐색적 데이터 분석(EDA) 기초
                <br />
                <img src={checkIcon} alt="" /> 자연어 분석(NLP)
                <br />
                <img src={checkIcon} alt="" /> 캐글 실전 문제풀이
            </GreyBoxStyle>
            <GreyBoxStyle>
                이런 점이 좋았어요
                <br />
                <img src={checkIcon} alt="" /> 개정판(최신 강의)
                <br />
                <img src={checkIcon} alt="" /> 풍부한 실습 코드
                <br />
                <img src={checkIcon} alt="" /> 꼼꼼한 이론 설명
                <br />
                <img src={checkIcon} alt="" /> 실전 구현 능력
            </GreyBoxStyle>
            <img
                src="https://cdn.inflearn.com/public/files/courses/324238/d3e84459-2872-4eb7-9fee-c14fe2cc9573/%EA%B0%9C%EC%A0%95%ED%8C%90_%ED%91%9C%EC%A7%80.png"
                alt=""
                // width="200"
                height="320"
                style={{ display: 'block', margin: '40px auto 20px auto' }}
            />
            <BlueStyle>
                상세한 설명과 풍부한 예제로 매우 많은 사랑을 받고 있는 '파이썬
                머신러닝 완벽 가이드' 이제 동영상 강의로 만나 보세요.
            </BlueStyle>
            <img
                src="https://cdn.inflearn.com/public/files/courses/324238/09cd7c80-1f01-495d-9a81-9ed658d97b1d/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8A%E1%85%A5%E1%86%AB_%E1%84%86%E1%85%A5%E1%84%89%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A5%E1%84%82%E1%85%B5%E1%86%BCimg.png"
                alt=""
                // width="200"
                height="400"
                style={{ display: 'block', margin: '40px auto 20px auto' }}
            />
            <br />
            딥러닝·CNN 핵심 이론부터 다양한 CNN 모델 구현 방법, 실전 문제를 통한
            실무 딥러닝 개발 노하우까지, 딥러닝 CNN 기술 전문가로 거듭나고
            싶다면 이 강의와 함께하세요
            <br />
            <br />
            CNN(Convolutional Neural Networks) 공부를 시작해야하는 이유
            <br />
            딥러닝 기반 컴퓨터 비전 전문가로 성장하기 위해서는 이미지 처리를
            위한 기반 기술을 함께 갖추어야 합니다. 이미지 전처리 방법, 이미지
            배열과 특성, 이미지 라이브러리 활용법, Albumentations와 같은 전용
            툴을 활용한 Augmentation 기법등 딥러닝 이미지 판별 모델 구현을 위한
            이미지 처리 기반 기술을 상세하게 설명 드립니다.
            <img
                src="https://cdn.inflearn.com/public/files/courses/326865/be663783-91f2-430f-bfde-1d87b5207a04/image_aug.png"
                alt=""
                width="100%"
                style={{ display: 'block', margin: '10px auto' }}
            />
            <br />
        </RoadmapDescriptionStyle>
    );
}

export default RoadmapId10;
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
