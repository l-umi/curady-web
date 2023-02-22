import styled from 'styled-components';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import background from '../images/roadmapsBack.png';
import RoadmapData from '../data/RoadmapData.json';
import logo from '../logo.svg';

function Roadmap() {
    const path = document.location.pathname.slice(9);

    const [data, setData] = useState();
    useEffect(() => {
        RoadmapData.map(e => {
            if (e.id == path) {
                setData(e);
            }
        });
    }, []);

    if (!data) {
        return <RoadmapStyle />;
    }

    const Remocon = (
        <LectureRemoconStyle>
            로드맵에 포함된 강의들
            {data.data.lectures.map(l => (
                <MarginStyle key={l.id}>
                    <a href={l.vendorUrl} target="_blank" rel="noreferrer">
                        <LectureStyle>
                            <ImgStyle src={l.imagePath} />
                            <LectureInfoStyle>
                                <LectureNameStyle>
                                    {l.lectureName}
                                </LectureNameStyle>
                                <ProviderStyle
                                    src={
                                        l.vendorName === 'curady'
                                            ? logo
                                            : `https://curady.kr/logos/${l.vendorName}.png`
                                    }
                                    alt={l.vendorName}
                                    onError={e => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                {l.salePrice === '0'
                                    ? `무료`
                                    : `${l.salePrice}원`}
                            </LectureInfoStyle>
                        </LectureStyle>
                    </a>
                </MarginStyle>
            ))}{' '}
        </LectureRemoconStyle>
    );
    return (
        <RoadmapStyle>
            <SearchInfoStyle>
                <div>
                    {data.data.keyword.map(k => (
                        <KeywordStyle key={k}>#{k}</KeywordStyle>
                    ))}
                </div>
                <RoadmapNameStyle>{data.data.roadmapName}</RoadmapNameStyle>
                {data.data.roadmapInfo}
            </SearchInfoStyle>
            <DetailLectureStyle>
                <IframStyle src={data.data.infoPath}>구구</IframStyle>
            </DetailLectureStyle>
            {Remocon}
        </RoadmapStyle>
    );
}

export default Roadmap;

const RoadmapStyle = styled.div`
    width: 86vw;
    margin: 32px 7% 100px 7%;
    font-size: 24px;
    text-align: center;
    min-height: calc(100vh - 342px);
    @media screen and (min-width: 1440px) {
        margin: 32px auto 100px auto;
        width: 1238.4px;
    }
`;

const SearchInfoStyle = styled.div`
    width: calc(100% = 48px);
    height: 132px;
    /* height: 80px; */
    background-image: url(${background});
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    margin-bottom: 24px;
    text-align: left;
    color: #ffffff;
    font-weight: 500;
    padding: 12px 24px 12px 24px;
`;

const KeywordStyle = styled.span`
    font-size: 18px;
    height: 22px;
    background-color: #e6eeff;
    color: #0054fd;
    border-radius: 100px;
    padding: 8px 12px 6px 12px;
    margin-right: 8px;
    margin-top: 8px;
    display: inline-block;
`;

const RoadmapNameStyle = styled.div`
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
    margin: 6px 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const DetailLectureStyle = styled.div`
    width: calc(100% - 300px);
    font-size: 22px;
    line-height: 1.45;
    display: inline-block;
    min-height: 800px;
`;

const IframStyle = styled.iframe`
    width: 100%;
    height: 200vh;
`;

const LectureRemoconStyle = styled.div`
    position: sticky;
    top: 10px;
    /* top: 285px; */
    vertical-align: top;
    display: inline-block;
    text-align: left;
    left: 100%;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    width: 259px;
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 16px 12px 16px 12px;
`;

const MarginStyle = styled.div`
    margin-top: 12px;
`;

const LectureStyle = styled.div`
    height: 58px;
    display: flex;
    font-size: 14px;
    line-height: 20px;
`;

const ImgStyle = styled.img`
    border-radius: 8px;
    object-fit: fill;
    height: 58px;
    min-width: 100px;
    max-width: 100px;
    margin-right: 7px;
    background-color: #f8f8f9;
    background-size: cover;
`;

const LectureInfoStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3px 0 3px 0;
    max-width: 100%;
    width: 152px;
`;

const LectureNameStyle = styled.div`
    height: 17px;
    overflow: auto;
    scrollbar-width: 0;
    //한줄
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const ProviderStyle = styled.img`
    height: 8px;
    object-fit: contain;
    object-position: left;
    display: block;
    margin: 3px 0 4px 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;
