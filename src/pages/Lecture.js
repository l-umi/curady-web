import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import RecommendItem from '../components/item/RecommendItem';
import Review from '../components/lecturepage/Review';
import WriteReview from '../components/lecturepage/WriteReview';
import upIcon from '../images/upIcon_24.png';
import loadingImg from '../images/spinner_0054fd_150px.gif';
import { userAuthState, userInfoState } from '../data/User';
import positiveIcon from '../images/positiveIcon.png';
import LectureRemocon from '../components/lecturepage/LectureRemocon';

function Lectures() {
    // useEffect(() => {
    //     console.log('lectures컴포넌트 렌더링');
    // });

    // 1. 로그인한 유저냐?
    const userInfo = useRecoilValue(userInfoState);
    const userAuth = useRecoilValue(userAuthState);

    // 2. 강의 데이터 + 통계 리뷰 조회(리모콘에 총 리뷰갯수 확인을 위해 여기서)
    const path = document.location.pathname.slice(9);
    const [lectureData, setLectureData] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);
    const [recommendItems, setRecommendItems] = useState([]);
    const [statistics, setStatistics] = useState('');
    const [register, setRegister] = useState([false, false]);
    useEffect(() => {
        setRegister([false, false]);
        // axios
        //     .get(
        //         `/lecture-service/lecture?lectureId=${path}&userId=${userInfo[1]}`,
        //     )
        //     .then(response => {
        //         setLectureData(response.data.data);
        //         axios
        //             .get(
        //                 `/lecture-service/lectures?category=${response.data.data.categoryId}&sort=views%2Cdesc`,
        //             )
        //             .then(response2 => {
        //                 setRelatedItems(response2.data.data);
        //             })
        //             .catch(() => {
        //                 setRelatedItems([]);
        //             });
        //     })
        //     .catch(() => {
        //         setLectureData([]);
        //     });

        // axios
        //     .get(`/lecture-service/lectures?sort=views&page=1`)
        //     .then(response => {
        //         setRecommendItems(response.data.data);
        //     })
        //     .catch(() => {
        //         setRecommendItems([]);
        //     });
        // axios
        //     .get(`/review-service/review/statistics/${path}`)
        //     .then(response => {
        //         setStatistics(response.data.data);
        //     })
        //     .catch(() => {
        //         setStatistics('');
        //     });
    }, [path]);

    // 4. 리뷰 작성 혹은 삭제 시 통계리뷰 다시 가져오기
    useEffect(() => {
        if (register[0] === true || register[1] === true) {
            // axios
            //     .get(`/review-service/review/statistics/${path}`)
            //     .then(response => {
            //         setStatistics(response.data.data);
            //     });
        }
    }, [register]);
    // 5. 리뷰 작성 모달
    const [modalopen, setModalopen] = useState(false);
    const registerReview = useCallback(bool => {
        if (bool) {
            setRegister([true, false]);
        }
        setModalopen(false);
    });

    // 6. 로딩화면
    if (userAuth[0] === 'loading' || lectureData.length === 0) {
        return (
            <LoadingStyle>
                <div>
                    <img src={loadingImg} alt="Loading" />
                </div>
            </LoadingStyle>
        );
    }

    return (
        <LectureStyle>
            {modalopen ? (
                <WriteReview
                    lectureId={path}
                    userAuth={userAuth}
                    registerReview={registerReview}
                />
            ) : null}
            <div>> {lectureData.categoryName}</div>
            <TopStyle>
                <div>
                    <ImgStyle
                        src={`https://curady-lecture-s3.s3.ap-northeast-2.amazonaws.com/lecture_images/${lectureData.imagePath}`}
                    />
                </div>
                <BriefLectureStyle>
                
                    <ProviderStyle
                        src={`https://curady.kr/logos/${lectureData.vendorName}.png`}
                        alt={lectureData.vendorName}
                    />
                    <LectureNameStyle>{lectureData.name}</LectureNameStyle>
                    <OneLineStyle>
                        <GreyColorStyle>
                            {lectureData.instructorName}
                        </GreyColorStyle>
                    </OneLineStyle>
                    
                    <DeadlineStyle>
                    <OneLineStyle>
                        수강 기한{' '}
                        <GreyColorStyle>
                            {lectureData.deadline
                                ? `${lectureData.deadline}개월`
                                : '무제한'}
                        </GreyColorStyle>
                    </OneLineStyle>
                    </DeadlineStyle>
                    {lectureData.lectureTags.length === 0 ? null : (
                        <OneLineStyle>
                            {lectureData.lectureTags.map(tag => (
                                <LectureTagStyle key={`${tag.tagId}`}>
                                    {tag.tagName}
                                </LectureTagStyle>
                            ))}
                        </OneLineStyle>
                    )}
                    {statistics.positiveKeywordRatio === 0 &&
                    statistics.negativeKeywordRatio === 0 ? null : (
                        <GreenLineStyle>
                            <IconImgStyle src={positiveIcon} alt="like" />
                        <OneLineStyle>
                            <MarginStyle>
                                {' 좋은 리뷰 키워드 비율 '}
                            </MarginStyle>
                    </OneLineStyle>
                            {statistics.positiveKeywordRatio}%
                        </GreenLineStyle>
                    )}
                    
                </BriefLectureStyle>
            </TopStyle>
            <MiddleStyle>
                <DetailLectureStyle>
                    {lectureData.description}
                    <IframeStyle
                        id="iframe"
                        title="iframe"
                        src={`https://curady-lecture-s3.s3.ap-northeast-2.amazonaws.com/lecture_info_htmls/${lectureData.infoPath}`}
                        sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                        seamless="seamless"
                    />
                </DetailLectureStyle>
                <LectureRemocon
                    // goDownIconClick={goDownIconClick}
                    lectureId={path}
                    lectureData={lectureData}
                    totalReview={statistics.totalReview}
                    register={register}
                    setModalopen={setModalopen}
                    userAuth={userAuth}
                />
            </MiddleStyle>
            <div id="reviewOver">
                <TitleStyle>'{lectureData.name}'의 비슷한 강의</TitleStyle>
                <RecommendItem data={relatedItems} />
            </div>
            {/* 로그인 시  보여주는 부분 */}
            <BottomStyle>
                {!userAuth[0] === true ? (
                    <NoReviewStyle>
                        로그인하고 특별한 리뷰를 확인해보세요
                    </NoReviewStyle>
                ) : (
                    <div>
                        {statistics.totalReview ? (
                            <Review
                                statistics={statistics}
                                lectureId={path}
                                register={register}
                                setRegister={setRegister}
                            />
                        ) : (
                            <NoReviewStyle>
                                아직 남겨진 수강평이 없는 강의입니다.
                                <br /> 첫 번째 수강평의 주인공이 되어주세요 : )
                            </NoReviewStyle>
                        )}
                        <div>
                            <TitleStyle>이런 강의는 어떠세요?</TitleStyle>
                            <RecommendItem data={recommendItems} />
                        </div>
                    </div>
                )}
            </BottomStyle>
            <UpImgStyle
                src={upIcon}
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                alt="위로"
            />
        </LectureStyle>
    );
}

export default Lectures;

const LoadingStyle = styled.div`
    text-align: center;
    padding-top: 30px;
    min-height: calc(100vh - 270px);
`;

const LectureStyle = styled.div`
    margin: 40px auto 80px auto;
    width: 86vw;
    font-size: 20px;
    line-height: 29px;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    min-height: calc(100vh - 367px);
`;

const TopStyle = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
    min-height: 300px;
`;

const ImgStyle = styled.img`
    border-radius: 8px;
    width: 500px;
    height: 290px;
    @media screen and (max-width: 768px) {
        width: 250px;
        height: 145px;
    }
`;

const BriefLectureStyle = styled.div`
    width: calc(100vw);
    padding-left: calc(10px + 1vw);
    font-size: 24px;
    line-height: 35px;
    max-height: 300px;
`;

const ProviderStyle = styled.img`
    height: 20px;
    margin-right: 12px;
    display: block;
    object-fit: contain;
    margin-bottom: 4px;
    object-position: left;
`;

const OneLineStyle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`

const GreyColorStyle = styled.span`
    display: inline-block;
    text-align: end;
    color: #7a7a7a;
`;

const DeadlineStyle = styled.div`
    margin-top:12px;
    margin-bottom: 6px;
`

const LectureNameStyle = styled.div`
    margin-bottom: 8px;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const GreenLineStyle = styled.div`
margin-top: 20px;
    font-size: 20px;
    line-height: 29px;
    color: #0ea441;
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const IconImgStyle = styled.img`
    width: 25px;
    height: 25px;
`;

const MarginStyle = styled.div`
    margin-left: 7.83px;
    margin-right: 14px;
    font-weight: 400;
`;

const LectureTagStyle = styled.span`
    display: inline-block;
    /* height: 21px; */
    color: #0054fd;
    background: #e6eeff;
    border: 1px solid #0054fd;
    border-radius: 100px;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    padding: 7px 13px 10px 13px;
    margin-right: 8px;
`;

const MiddleStyle = styled.div`
    padding-top: 20px;
    width: 100%;
`;

const DetailLectureStyle = styled.div`
    width: calc(100% - 300px);
    font-size: 22px;
    line-height: 1.45;
    display: inline-block;
`;

const IframeStyle = styled.iframe`
    width: 100%;
    height: 150vh;
    margin-top: 24px;
    min-height: 500px;
    overflow: auto;
    margin-bottom: 0;
    display: block;
`;

const NoReviewStyle = styled.div`
    margin-top: 48px;
    margin-bottom: 106px;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    //리뷰 1줄 작성시 높이가 580
    height: 300px;
    padding-top: 214px;
    background: #fbfbfb;
    border-radius: 8px;
    text-align: center;
    color: #777;
`;

const TitleStyle = styled.div`
    font-weight: 700;
    font-size: 24px;
    margin: 40px 3px 20px 3px;
`;

const BottomStyle = styled.div`
    /* border: solid gray 1px; */
    border-radius: 15px;
`;

const UpImgStyle = styled.img`
    width: 46px;
    height: 46px;
    margin-top: 12px;
    /* background-size: cover; */
    margin-left: calc(100% - 46px);
    border: #e7e7e7 solid 1px;
    /* border-radius: 100px; */
    cursor: pointer;
`;
