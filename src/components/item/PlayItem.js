import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import favorite from '../../images/favorite.png';
// import viewsIcon from '../../images/viewsIcon.png';

// css수정하기
function PlayItem({ data }) {
    return (
        <ResultLecturesItemStyle>
            {data.map(d => (
                <LinkStyle key={d.id} to={`/play/${d.id}`}>
                    <ItemWrapStyle>
                        <ImgWrapStyle src={d.imagePath} alt="강의 이미지" />
                        {/* <BoxContainerStyle>
                            <LikeStyle>
                                <LikeImgStyle src={viewsIcon} alt="like" />
                                {d.views}
                                <LikeImgStyle src={favorite} alt="view" />
                                {d.likes}
                            </LikeStyle>
                        </BoxContainerStyle> */}
                        <ContentStyle>
                            <div>
                                {d.keywords.map((k, index) => (
                                    <KeywordStyle key={index}>
                                        #{k}
                                    </KeywordStyle>
                                ))}
                            </div>
                            <LectureNameStyle>{d.name}</LectureNameStyle>
                            <LectureInstructorStyle>
                                {d.instructorName}
                            </LectureInstructorStyle>
                            <CountProviderStyle>
                                • {d.number}개 영상
                            </CountProviderStyle>
                            <CountProviderStyle>
                                •{' '}
                                {Math.floor(d.time / 60) === 0
                                    ? null
                                    : `${Math.floor(d.time / 60)}시간 `}
                                {d.time === 0 ? null : `${d.time % 60}분`}
                            </CountProviderStyle>
                        </ContentStyle>
                    </ItemWrapStyle>
                </LinkStyle>
            ))}
        </ResultLecturesItemStyle>
    );
}

export default React.memo(PlayItem);

const ResultLecturesItemStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: column;
`;

// 비율 9:16
const LinkStyle = styled(Link)`
    /* 아이템 간의 거리 10px */
    /* @media screen and (min-width: 1441px) {
        width: 300px;
        height: 384px;
        margin: 0 0 0 6px;
        margin-bottom: 24px;
    } */
    height: 225px;
    margin-top: 16px;
`;

// 아이템 하나를 감싸는 테두리
const ItemWrapStyle = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    /* LinkStyls꺼 상속 */
    /* display: inline-block; */
    /* margin-right: 8px; */
    max-width: 1238.4px; /* 1440px * 0.86 */
`;

const ImgWrapStyle = styled.img`
    display: inline-block;
    width: 400px;
    height: 100%;
    background-size: cover;
    border-radius: 8px 0px 0px 8px;
    /* margin-bottom: 4px; */
`;

const ContentStyle = styled.div`
    margin-left: 32px;
    height: calc(100% - 24px);
    width: calc(86vw - 448px);
    margin: 12px 24px 12px 24px;
`;

const BoxContainerStyle = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const LikeStyle = styled.div`
    background: rgba(255, 255, 255, 0.76);
    backdrop-filter: blur(2px);
    border-radius: 4px;
    position: absolute;
    margin: 10px 10px 0 0;
    padding: 2px 6px 2px 0;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    height: 24px;
`;

const LikeImgStyle = styled.img`
    height: 14px;
    margin-left: 6px;
    margin-right: 3px;
`;

const CountProviderStyle = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
`;

const LectureNameStyle = styled.div`
    margin-top: 4px;
    font-size: 21px;
    font-weight: 600;
    line-height: 28px;
    max-height: 84px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
`;

const LectureInstructorStyle = styled.div`
    /* margin-top: 10px; */
    line-height: 36px;
    font-size: 14px;
    font-weight: 400;
    color: #7a7a7a;
`;

const KeywordStyle = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    display: inline-block;
    margin-bottom: 4px;
    background-color: #e6eeff;
    border-radius: 8px;
    height: 20px;
    padding: 6px 8px 6px 8px;
    margin-right: 8px;
`;
