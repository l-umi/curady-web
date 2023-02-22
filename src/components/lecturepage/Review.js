import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import guest from '../../images/guest.png';
import positiveIcon from '../../images/positiveIcon.png';
import negativeIcon from '../../images/negativeIcon.png';
import thumbUpIcon from '../../images/thumb_up.png';
import thumbUpIconFull from '../../images/thumb_up_full.png';
import { userInfoState, userAuthState } from '../../data/User';
import YesNoModal from '../modal/YesNoModal';

// 1. 통계 리뷰
// 1-1. 그래프 한 줄
function Graph({ text, count, fraction, blueColor }) {
    return (
        <GraphStyle>
            <GraphTextStyle>
                <TextLeftStyle>
                    <BoldText font="16px">{text}</BoldText>
                </TextLeftStyle>
                <div>
                    <BoldText font="16px">
                        <DarkblueStyle>{count}</DarkblueStyle>
                    </BoldText>
                </div>
            </GraphTextStyle>
            <BlueGraphStyle
                color={blueColor}
                persent={(count / fraction) * 100}
            />
        </GraphStyle>
    );
}
// 1-2. 통계 리뷰
function StatisticsReview({ statistics }) {
    const positiveGraphs = [null, null, null];
    const negativeGraphs = [null, null, null];
    if (statistics) {
        const colorName = ['#99BBFE', '#CCDDFF', '#E6EEFF'];
        if (statistics.positiveKeywordList) {
            for (let i = 0; i < statistics.positiveKeywordList.length; i += 1) {
                positiveGraphs[i] = (
                    <Graph
                        text={Object.keys(statistics.positiveKeywordList[i])[0]}
                        count={
                            Object.values(statistics.positiveKeywordList[i])[0]
                        }
                        fraction={statistics.positiveKeywordCount}
                        blueColor={colorName[i]}
                    />
                );
            }
        }
        if (statistics.negativeKeywordList) {
            for (let i = 0; i < statistics.negativeKeywordList.length; i += 1) {
                negativeGraphs[i] = (
                    <Graph
                        text={Object.keys(statistics.negativeKeywordList[i])[0]}
                        count={
                            Object.values(statistics.negativeKeywordList[i])[0]
                        }
                        fraction={statistics.negativeKeywordCount}
                        blueColor={colorName[i]}
                    />
                );
            }
        }
    }

    return (
        <div>
            {statistics.positiveKeywordList ||
            statistics.negativeKeywordList ? (
                <AnalysisContainerStyle>
                    <AnalsisContainersStyle>
                        <AnalysisTitleStyle>
                            <IconImgStyle size="24px" src={positiveIcon} />
                            <BoldText font="20px">
                                <ColorText color="#0EA441">
                                    {statistics.positiveKeywordRatio}%
                                </ColorText>
                            </BoldText>
                            <BoldText font="20px"> 이런 점이 좋았어요</BoldText>
                        </AnalysisTitleStyle>
                        <AnalysisStyle>
                            {positiveGraphs[0]}
                            {positiveGraphs[1]}
                            {positiveGraphs[2]}
                        </AnalysisStyle>
                    </AnalsisContainersStyle>
                    <AnalsisContainersStyle>
                        <AnalysisTitleStyle>
                            <IconImgStyle size="24px" src={negativeIcon} />
                            <BoldText font="20px">
                                <ColorText color="#A80000">
                                    {statistics.negativeKeywordRatio}%
                                </ColorText>
                            </BoldText>
                            <BoldText font="20px">이런 점이 아쉬워요</BoldText>
                        </AnalysisTitleStyle>
                        <AnalysisStyle>
                            {negativeGraphs[0]}
                            {negativeGraphs[1]}
                            {negativeGraphs[2]}
                        </AnalysisStyle>
                    </AnalsisContainersStyle>
                </AnalysisContainerStyle>
            ) : (
                <div>
                    <br />
                </div>
            )}
        </div>
    );
}

// 2. 텍스트 리뷰
// 2-1. 리뷰 옆 '좋아요' '삭제하기'버튼 기능
function ReviewSideButton({ reviewId, nickname, setRegister, likes }) {
    const userInfo = useRecoilValue(userInfoState);
    const userAuth = useRecoilValue(userAuthState);
    const [modalopen, setModalopen] = useState(false);
    const [likedReview, setLikedReview] = useState(false);

    useEffect(() => {
        // axios
        //     .get(`review-service/auth/${reviewId}/likes`, {
        //         headers: {
        //             'X-AUTH-TOKEN': userAuth[1],
        //         },
        //     })
        //     .then(response => {
        //         setLikedReview(response.data.data);
        //     });
    }, []);

    const deleteReview = useCallback(e => {
        e.target.disabled = true;
        // axios
        //     .delete(`review-service/auth/review/${reviewId}`, {
        //         headers: {
        //             'X-AUTH-TOKEN': userAuth[1],
        //         },
        //     })
        //     .then(() => {
        //         setModalopen(false);
        //         setRegister([false, true]);
        //         e.target.disabled = false;
        //     })
        //     .catch(() => {
        //         e.target.disabled = false;
        //     });
    });

    const likeReview = useCallback(e => {
        e.target.disabled = true;

        if (likedReview) {
            // axios
            //     .delete(`review-service/auth/${reviewId}/likes`, {
            //         headers: {
            //             'X-AUTH-TOKEN': userAuth[1],
            //         },
            //     })
            //     .then(() => {
            //         setLikedReview(false);
            //         e.target.disabled = false;
            //     })
            //     .catch(() => {
            //         e.target.disabled = false;
            //     });
        } else {
            // axios
            //     .post(
            //         `review-service/auth/${reviewId}/likes`,
            //         {},
            //         {
            //             headers: {
            //                 'X-AUTH-TOKEN': userAuth[1],
            //             },
            //         },
            //     )
            //     .then(() => {
            //         setLikedReview(true);
            //         e.target.disabled = false;
            //     })
            //     .catch(() => {
            //         e.target.disabled = false;
            //     });
        }
    });
    return (
        <span>
            {userInfo[0] === nickname ? (
                <span>
                    <ReviewSideButtonStyle
                        onClick={() => {
                            setModalopen(true);
                        }}
                        color="#E5503C"
                    >
                        삭제하기
                    </ReviewSideButtonStyle>
                    {modalopen ? (
                        <YesNoModal
                            setModalopen={setModalopen}
                            titleText="리뷰 삭제"
                            innerText="작성한 리뷰를 삭제하시겠습니까?"
                            yesFunction={deleteReview}
                        />
                    ) : null}
                </span>
            ) : (
                <ReviewSideButtonStyle color="#0ea441" onClick={likeReview}>
                    <IconImgStyle
                        size="20px"
                        src={likedReview ? thumbUpIconFull : thumbUpIcon}
                        alt=""
                    />
                    좋아요 {likes}
                </ReviewSideButtonStyle>
            )}
        </span>
    );
}
// 2-2. 텍스트리뷰
function TextReview({ lectureId, statistics, register, setRegister }) {
    const [textReviewArray, setTextReviewArray] = useState([]);
    const [textReviewPage, setTextReviewPage] = useState(1);

    // 강의 바뀌면 1페이지 받아오기
    useEffect(() => {
        setTextReviewPage(1);
        setTextReviewArray([]);
        // axios.get(`review-service/reviews/${lectureId}`).then(response => {
        //     setTextReviewArray([...response.data.data]);
            // setTextReviewArray([
            //     {
            //         content:
            //             '군더더기 없이 실무에 사용할 것들 위주로 쉽게 설명해주시는 게 좋았습니다.\n 특히 미니 프로젝트로 배우던 문법들을 사용할 기회를 주니 좋았습니다.\n 이제 이분 강의 찾아서 들어야겠네요.ㅎㅎㅁ',
            //         id: 1,
            //         imageUrl: null,
            //         nickname: 'curady',
            //         keywordContent: [
            //             '수업 자료가 꼼꼼해요.',
            //             '실무에 도움돼요.',
            //         ],
            //     },
            //     {
            //         content: '이해하기 쉽게 설명해주십니다',
            //         id: 1,
            //         imageUrl: null,
            //         nickname: '큐레디',
            //         keywordContent: ['이해가 어려워요.'],
            //     },
            // ]);
        // });
    }, [lectureId, register]);

    // 플러스 누르면 받아오기
    useEffect(() => {
        if (textReviewPage > 1) {
            // axios
            //     .get(
            //         `review-service/reviews/${lectureId}?page=${textReviewPage}`,
            //     )
            //     .then(response => {
            //         setTextReviewArray([
            //             ...textReviewArray,
            //             ...response.data.data,
            //         ]);
            //     });
        }
    }, [textReviewPage]);

    // 새 리뷰 작성시
    // useEffect(() => {
    //     if (register === true) {
    //         // 아직 statistics.totalReview + 1이 적용 되기전
    //         // 0->1개
    //         if (statistics.totalReview === 0) {
    //             axios
    //                 .get(`review-service/reviews/${lectureId}`)
    //                 .then(response => {
    //                     setTextReviewArray([...response.data.data]);
    //                 });
    //         } else if (
    //             // 마지막 페이지까지 받아왔느냐? 그럼 그 뒤에 붙이기
    //             textReviewPage ===
    //             parseInt((statistics.totalReview - 1) / 6, 10) + 1
    //         ) {
    //             // 6->7개
    //             if (textReviewArray.length % 6 === 0) {
    //                 axios
    //                     .get(
    //                         `review-service/reviews/${lectureId}?page=${
    //                             textReviewPage + 1
    //                         }`,
    //                     )
    //                     .then(response => {
    //                         setTextReviewArray([
    //                             ...textReviewArray,
    //                             ...response.data.data,
    //                         ]);
    //                     });
    //             } else {
    //                 // 10->11개
    //                 axios
    //                     .get(
    //                         `review-service/reviews/${lectureId}?page=${textReviewPage}`,
    //                     )
    //                     .then(response => {
    //                         setTextReviewArray([
    //                             ...textReviewArray.slice(
    //                                 (textReviewPage - 1) * 6,
    //                             ),
    //                             ...response.data.data,
    //                         ]);
    //                     });
    //             }
    //         }
    //     }
    // }, [register]);

    return (
        <div>
            {textReviewArray.map((el, index) => (
                <TextReviewComponentStyle key={el.id}>
                    <ProfileImgStyle src={el.imageUrl ? el.imageUrl : guest} />
                    <ProfileNicknameStyle>{el.nickname}</ProfileNicknameStyle>
                    <ReviewSideButton
                        reviewId={el.id}
                        nickname={el.nickname}
                        setRegister={setRegister}
                        likes={el.likes}
                    />
                    <ReviewContentStyle>
                        {el.content.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </ReviewContentStyle>
                    {el.keywordContent.map((keyword, index) => {
                        return (
                            <ReviewKeywordStyle key={index}>
                                {keyword}
                            </ReviewKeywordStyle>
                        );
                    })}
                </TextReviewComponentStyle>
            ))}
            {textReviewPage <
            parseInt((statistics.totalReview - 1) / 6, 10) + 1 ? (
                <PlusButtonStyle
                    onClick={() => {
                        setTextReviewPage(textReviewPage + 1);
                    }}
                >
                    +
                </PlusButtonStyle>
            ) : (
                <NonPlusButtonStyle />
            )}
        </div>
    );
}

function Review({ lectureId, statistics, register, setRegister }) {
    return (
        <ReviewStyle>
            <div>
                <TopStyle>
                    <BoldText font="24px">
                        수강평{' '}
                        <DarkblueStyle>{statistics.totalReview}</DarkblueStyle>
                    </BoldText>
                    <StatisticsReview statistics={statistics} />
                </TopStyle>
                {/* <MiddleStyle>
                    <div>
                        <BoldText font="20px">기술</BoldText>
                    </div>
                    <div>
                        <BoldText font="20px">특징</BoldText>
                    </div>
                </MiddleStyle> */}
                <BottomStyle>
                    <TextReview
                        lectureId={lectureId}
                        statistics={statistics}
                        register={register}
                        setRegister={setRegister}
                    />
                </BottomStyle>
            </div>
        </ReviewStyle>
    );
}

export default Review;

const ProfileImgStyle = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 100px;
`;

const ProfileNicknameStyle = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    position: absolute;
    margin: 8px 0 3px 12px;
`;

const ReviewSideButtonStyle = styled.button`
    border: 1px solid ${props => props.color};
    padding: 6px 18px 6px 18px;
    border-radius: 100px;
    height: 36px;
    background-color: white;
    color: ${props => props.color};
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    float: right;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: row;
    &:hover {
        transition: all 0.01s;
        transform: scale(1.02);
    }
`;
const ReviewContentStyle = styled.div`
    font-size: 16px;
    line-height: 23px;
    margin: 8px 0 16px 0;
`;

const ReviewKeywordStyle = styled.button`
    height: 40px;
    background-color: #e6eeff;
    border: none;
    border-radius: 8px;
    margin-right: 8px;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 4px;
    padding: 8px 15px;
`;

const TextReviewComponentStyle = styled.div`
    width: 100%;
    margin-top: 22px;
    margin-bottom: 2px;
    padding-bottom: 16px;
    border-bottom: 1px solid #d0d0d0;
`;

const ReviewStyle = styled.div`
    margin-top: 48px;
    min-height: 580px;
    margin-bottom: 40px;
`;
const TopStyle = styled.div`
    /* margin-top: 48px; */
`;

const BoldText = styled.span`
    font-size: ${props => props.font};
    font-weight: 700;
`;

const DarkblueStyle = styled.span`
    color: #2d6ea0;
`;

const AnalysisContainerStyle = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const AnalsisContainersStyle = styled.div`
    width: calc(50% - 20px);
    margin-top: 25px;
    margin-bottom: 12px;
    @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: 12px;
        margin-bottom: 0px;
    }
`;

const AnalysisTitleStyle = styled.div`
    margin-bottom: 17px;
    display: flex;
    align-items: center;
`;

const IconImgStyle = styled.img`
    width: ${props => props.size};
    height: ${props => props.size};
    /* margin-top: 5px; */
    padding: 0 0 0 0;
    margin: 0 4px 0 0;
`;

const ColorText = styled.div`
    color: ${props => props.color};
    margin: 0 16px 0 2px;
    @media screen and (max-width: 768px) {
        margin: 0 8px 0 1px;
    }
`;

const AnalysisStyle = styled.div`
    border: 1px solid #dddddd;
    border-radius: 8px;
    height: 184px;
    padding: 8px 0px;
`;

const TextLeftStyle = styled.div`
    text-align: left;
`;
const GraphStyle = styled.div`
    background: #eeeeee;
    width: 92%;
    height: 40px;
    border-radius: 8px;
    text-align: right;
    position: relative;
    z-index: -2;
    margin: 16px auto;
`;

const GraphTextStyle = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 1;
`;

const BlueGraphStyle = styled.div`
    background: ${props => props.color};
    height: 40px;
    border-radius: 8px;
    /* %만하면 깨지니까 기본으로 10px주기 */
    width: calc(10px + ${props => props.persent}%);
    max-width: 100%;
    position: relative;
    top: -40px;
    z-index: -1;
`;

const MiddleStyle = styled.div`
    height: 130px;
    background: #fbfbfb;
    border-color: #e7e7e7;
    border-style: solid;
    border-width: 1px 0px;
    width: 100%;
    transform: translateX(-7vw);
    padding: 0 7vw;
    @media screen and (min-width: 1440px) {
        transform: translateX(calc((1238.4px - 100vw) / 2));
        padding: 0 calc((100vw - 1238.4px) / 2);
    }
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const BottomStyle = styled.div``;

const NothingReviewStyle = styled.div`
    text-align: center;
    background: #fbfbfb;
    height: 400px;
    border-radius: 8px;
`;

const PlusButtonStyle = styled.button`
    width: 46px;
    height: 46px;
    border: solid 1px #d0d0d0;
    border-radius: 1000px;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    color: #343434;
    font-size: 25px;
    margin-top: 20px;
    margin-left: calc(50% - 23px);
`;

const NonPlusButtonStyle = styled.div`
    height: 66px;
`;
