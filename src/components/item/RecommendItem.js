import styled from 'styled-components';
// Swiper 라이브러리 사용하려면 해야함
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import favorite from '../../images/favorite.png';
import viewsIcon from '../../images/viewsIcon.png';
import 'swiper/css';
import 'swiper/css/navigation';

function RecommendItem({ data }) {
    const nav = useNavigate();
    const swiper = data.map(d => (
        <div key={`${d.id}`}>
            <SwiperSlide
                onClick={() => {
                    nav(`/lecture/${d.id}`);
                }}
                key={`LR${d.id}`}
            >
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

                    <ContentsStyle>
                        <div>
                            <ProviderStyle
                                src={`https://curady.kr/logos/${d.vendorName}.png`}
                                alt={d.providers}
                            />
                            <LectureNameStyle>{d.name}</LectureNameStyle>
                            <LectureInstructorStyle>
                                {d.instructorName}
                            </LectureInstructorStyle>
                        </div>
                        <PriceStyle>
                            {d.salePrice
                                ? `₩ ${d.salePrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                : `무료`}
                        </PriceStyle>
                    </ContentsStyle>
                </ItemWrapStyle>
            </SwiperSlide>
        </div>
    ));

    return (
        <MainItemStyle>
            {/* 나중에 버튼 커스텀하기 */}
            <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                navigation
                modules={[Navigation]}
                breakpoints={{
                    281: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    769: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    1025: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                }}
            >
                {swiper}
            </Swiper>
        </MainItemStyle>
    );
}

export default RecommendItem;

const MainItemStyle = styled.div`
    /* 6px은 양 옆의 공백 (배너랑 크기 86vw맞춰주기 위함)*/
    width: calc(86vw + 6px);
    max-width: 1244.4px; /* calc(1440px * 0.86); + 6px */
    @media screen and (max-width: 768px) {
        margin-left: 20px;
        width: calc(100vw - 40px);
        margin-bottom: 4px;
        min-width: 240px;
    }
`;

// 계산한 공식
// a 는 Item하나의 width
// ~300 : 1개 가변 -> a = 86vw
// ~768 : 2개 가변 -> a = (86vw - 6px) / 2
// ~1024 : 3개 가변 -> a = (86vw - 12px) / 3
// ~1440 : 4개 가변 -> a = (86vw - 18px) / 4
// 1440~ : 4개 고정 -> a = ((1440px * 0.86) - 18px) / 4

// 사이즈
//
//
//

// 아이템 하나를 감싸는 테두리
const ItemWrapStyle = styled.div`
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 3px;

    @media screen and (min-width: 1441px) {
        width: 305.1px;
        height: 390.528px;
    }
    @media screen and (max-width: 1440px) {
        width: calc(21.5vw - 4.5px);
        height: calc(27.52vw - 5.76px);
    }
    @media screen and (max-width: 1024px) {
        width: calc((86vw - 12px) / 3);
        height: calc((110.08vw - 15.36px) / 3);
    }
    @media screen and (max-width: 768px) {
        width: calc(50vw - 26px);
        height: calc(64vw - 33.28px);
    }
    @media screen and (max-width: 280px) {
        width: calc(100% - 6px);
        height: calc(128vw - 58.88px);
    }
`;

const ImgWrapStyle = styled.img`
    display: inline-block;
    width: 100%;
    height: 45.3125%; /* 위: 아래 = 58 : 70이여야 함, 그러므로 전체높이의 45.3125(58/(58+70))%임 */
    background-size: cover; /* 이미지 확대, 인프런은 세로대비 가로길이의 비율이 65%이고 16:8사이즈는 50%이므로 중간인 58%로 정해서 통일 */
    border-radius: 8px 8px 0px 0px;
    margin-bottom: 4px;
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

const ContentsStyle = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 110px; */
    margin: 6px 3% 12px 3%;
    height: calc(100% - 45.3125% - 24px);
    justify-content: space-between;
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
const PriceStyle = styled.div`
    font-size: 24px;
    font-weight: 500;
    text-align: right;
    margin-right: 4%;
`;
