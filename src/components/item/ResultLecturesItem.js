import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import favorite from '../../images/favorite.png';
import viewsIcon from '../../images/viewsIcon.png';

// css수정하기
function ResultLecturesItem({ data }) {
    return (
        <ResultLecturesItemStyle>
            {data.map(d => (
                <LinkStyle key={d.id} to={`/lecture/${d.id}`}>
                    <ItemWrapStyle>
                        <BoxContainerStyle>
                            <LikeStyle>
                                <LikeImgStyle src={viewsIcon} alt="like" />
                                {d.views}
                                <LikeImgStyle src={favorite} alt="view" />
                                {d.likes}
                            </LikeStyle>
                        </BoxContainerStyle>
                        <ImgWrapStyle
                            src={`https://curady-lecture-s3.s3.ap-northeast-2.amazonaws.com/lecture_images/${d.imagePath}`}
                            alt="강의 이미지"
                        />
                        <ContentStyle>
                            <div>
                                <MidContentsStyle>
                                    <ProviderStyle
                                        src={`https://curady.kr/logos/${d.vendorName}.png`}
                                        alt={d.vendorName}
                                    />
                                    <LectureNameStyle>
                                        {d.name}
                                    </LectureNameStyle>
                                    <LectureInstructorStyle>
                                        {d.instructorName}
                                    </LectureInstructorStyle>
                                </MidContentsStyle>
                            </div>

                            <BottomContentsStyle>
                                {d.salePrice
                                    ? `₩ ${d.salePrice
                                          .toString()
                                          .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ',',
                                          )}`
                                    : `무료`}
                            </BottomContentsStyle>
                        </ContentStyle>
                    </ItemWrapStyle>
                </LinkStyle>
            ))}
        </ResultLecturesItemStyle>
    );
}

export default React.memo(ResultLecturesItem);

const ResultLecturesItemStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: black;
    /* 아이템 간의 거리 10px */
    @media screen and (min-width: 1441px) {
        width: 300px;
        height: 384px;
        margin: 0 0 0 6px;
        margin-bottom: 24px;
    }
    @media screen and (max-width: 1440px) {
        /* Lectures의 width는 81.7vw - 120px */
        /* 가로세로비율 100:128 */
        /* 아이템 간의 거리 20px */
        width: calc((100% - 39px) / 3);
        height: calc((86vw - 39px) / 3 * 1.28);
        margin: 0 6.5px;
        margin-bottom: 32px;
    }
    @media screen and (max-width: 1024px) {
        width: calc((100% - 20px) / 2);
        height: calc((86vw - 20px) / 2 * 1.28);
        margin: 0 5px;
        margin-bottom: 32px;
    }
    @media screen and (max-width: 768px) {
        width: calc((100% - 20px) / 2);
        height: calc((86vw - 30px) / 2 * 1.28);
        margin: 0 5px;
        margin-bottom: 32px;
    }
`;

// 아이템 하나를 감싸는 테두리
const ItemWrapStyle = styled.div`
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    /* LinkStyls꺼 상속 */
    /* display: inline-block; */
    width: 100%;
    height: 100%;
    /* margin-right: 8px; */
    overflow: hidden;
`;

const ImgWrapStyle = styled.img`
    display: inline-block;
    width: 100%;
    height: 45.3125%;
    background-size: cover;
    border-radius: 8px 8px 0px 0px;
    /* margin-bottom: 4px; */
`;

const ContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(54.6875% - 25px);
    margin: 4px 0 10px 0;
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
`;

const LikeImgStyle = styled.img`
    height: 14px;
    margin-left: 6px;
    margin-right: 3px;
`;

const MidContentsStyle = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 110px; */
    margin: 12px 3% 0 3%;
`;

const ProviderStyle = styled.img`
    height: 13px;
    object-fit: contain;
    object-position: left;
    margin-bottom: 6px;
`;

const LectureNameStyle = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2em;
    /* 3줄 넘으면 ...로 표시 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const LectureInstructorStyle = styled.div`
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #7a7a7a;
`;

const BottomContentsStyle = styled.div`
    font-size: 24px;
    font-weight: 500;
    text-align: right;
    margin-right: 4%;
`;
