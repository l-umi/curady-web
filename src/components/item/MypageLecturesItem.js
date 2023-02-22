import styled from 'styled-components';
// Swiper 라이브러리 사용하려면 해야함
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

function MypageLecturesItem({ data }) {
    const twoD = [];
    if (data === undefined) {
        return null;
    }
    for (let i = 0; i < data.length; i += 2) twoD.push(data.slice(i, i + 2));

    const swiper = twoD.map(value => (
        <SwiperSlide key={value[0].id}>
            <LinkStyle to={`/lecture/${value[0].id}`}>
                <ItemWrapStyle>
                    <ImgWrapStyle
                        src={`https://curady-lecture-s3.s3.ap-northeast-2.amazonaws.com/lecture_images/${value[0].imagePath}`}
                        alt="강의 이미지"
                    />

                    <ContentsStyle>
                        <div>
                            <ProviderStyle
                                src={`https://curady.kr/logos/${value[0].vendorName}.png`}
                                alt={value[0].providers}
                            />
                            <LectureNameStyle>{value[0].name}</LectureNameStyle>
                        </div>
                        <LectureInstructorStyle>
                            {value[0].instructorName}
                        </LectureInstructorStyle>
                    </ContentsStyle>
                </ItemWrapStyle>
            </LinkStyle>
            {value[1] ? (
                <LinkStyle to={`/lecture/${value[1].id}`}>
                    <ItemWrapStyle>
                        <ImgWrapStyle
                            src={`https://curady-lecture-s3.s3.ap-northeast-2.amazonaws.com/lecture_images/${value[1].imagePath}`}
                            alt="강의 이미지"
                        />
                        <ContentsStyle>
                            <div>
                                <ProviderStyle
                                    src={`https://curady.kr/logos/${value[1].vendorName}.png`}
                                    alt={value[1].providers}
                                />
                                <LectureNameStyle>
                                    {value[1].name}
                                </LectureNameStyle>
                            </div>
                            <LectureInstructorStyle>
                                {value[1].instructorName}
                            </LectureInstructorStyle>
                        </ContentsStyle>
                    </ItemWrapStyle>
                </LinkStyle>
            ) : null}
            <MarginStyle />
        </SwiperSlide>
    ));

    return (
        <MainItemStyle>
            <DesktopStyle>
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 6,
                        },
                        769: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 12,
                        },
                        1025: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                            spaceBetween: 16,
                        },
                        1441: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 16,
                        },
                    }}
                >
                    {swiper}
                </Swiper>
            </DesktopStyle>
            <MobileStyle>{swiper}</MobileStyle>
        </MainItemStyle>
    );
}

export default MypageLecturesItem;

const MainItemStyle = styled.div`
    /* 6px은 양 옆의 공백 (배너랑 크기 86vw맞춰주기 위함)*/
    width: calc(100% - 32px);
    position: relative;
    z-index: 0;
    margin: 16px 16px 0px 16px;
    @media screen and (max-width: 1024px) {
        margin: 12px 12px 0 12px;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0 0 0 0;
    }
`;

const DesktopStyle = styled.div`
    width: 100%;
    height: 100%;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const MobileStyle = styled.div`
    height: 100%;
    @media screen and (min-width: 769px) {
        display: none;
    }
`;
// 계산한 공식
// 그레이박스 넓이는 86vw - 342px
// ~768: 2개 가변 -> a = (86vw - 342px - 6px) / 2
// ~1024 : 2개 가변 -> a = (86vw - 342px - 12px - 12px - 12px ) / 2
// ~1440 : 3개 가변 -> a = (86vw - 342px - 16px - 16px - 16px ) / 3
// 1440~ : 4개 고정 -> a = (896.4px - 16px - 16px - 16px) / 4

// 아이템 하나를 감싸는 테두리 1:1 비율

const LinkStyle = styled(Link)`
    cursor: pointer;
`;
const ItemWrapStyle = styled.div`
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    margin-bottom: 12px;
    @media screen and (max-width: 768px) {
        display: inline-block;
        width: calc(50vw - 25px);
        height: calc(50vw - 25px);
        margin-right: 3px;
        margin-bottom: 5px;
    }
    @media screen and (min-width: 769px) {
        height: calc((86vw - 378px) / 2);
        margin-bottom: 12px;
    }
    @media screen and (min-width: 1024px) {
        height: calc((86vw - 390px) / 3);
        margin-bottom: 16px;
    }
    @media screen and (min-width: 1440px) {
        height: 212.1px;
    }
`;

const ImgWrapStyle = styled.img`
    height: 58%;
    width: 100%;
    background-size: cover;
    border-radius: 8px 8px 0px 0px;
    display: block;
`;

const ContentsStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px 8px 4px 8px;
    height: calc(42% - 10px);
    overflow: hidden;
`;

const ProviderStyle = styled.img`
    height: 13px;
    display: block;
    object-fit: contain;
    object-position: left;
`;

const LectureNameStyle = styled.div`
    margin-top: 4px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2; /* 라인수 */
    -webkit-box-orient: vertical;
`;

const LectureInstructorStyle = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #7a7a7a;
    height: 21px;
`;

const MarginStyle = styled.div`
    height: 24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
