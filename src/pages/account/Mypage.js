import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loadingImg from '../../images/spinner_0054fd_150px.gif';
import Notfound from '../NotFound';
import { userAuthState } from '../../data/User';
import guest from '../../images/guest.png';
import chartbarIcon from '../../images/chartbarIcon.png';
import MypageLecturesItem from '../../components/item/MypageLecturesItem';
import MyReviews from '../../components/MyReviews';

function Mypage() {
    // 1. 로그인 한 유저인지 확인
    const userAuth = useRecoilValue(userAuthState);
    const [userProfile, setUserProfile] = useState('loading');
    const [likedLectures, setLikedLectures] = useState();
    const [completedCourses, setCompletedCourses] = useState();
    const [wroteReviews, setWroteReviews] = useState();
    useEffect(() => {
        if (userAuth[0] === true) {
            // axios
            //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
            //     .get(`/user-service/auth/user/info`, {
            //         headers: {
            //             'X-AUTH-TOKEN': userAuth[1],
            //         },
            //     })
            //     .then(response => {
            //         setUserProfile(response.data.data);
            //     });
            // axios
            //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
            //     .get(`/lecture-service/auth/lectures/liked`, {
            //         headers: {
            //             'X-AUTH-TOKEN': userAuth[1],
            //         },
            //     })
            //     .then(response => {
            //         setLikedLectures(response.data);
            //     });
            // axios
            //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
            //     .get(`/lecture-service/auth/lectures/coursed`, {
            //         headers: {
            //             'X-AUTH-TOKEN': userAuth[1],
            //         },
            //     })
            //     .then(response => {
            //         setCompletedCourses(response.data);
            //     });
            // axios
            //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
            //     .get(`/review-service/auth/reviews`, {
            //         headers: {
            //             'X-AUTH-TOKEN': userAuth[1],
            //         },
            //     })
            //     .then(response => {
            //         setWroteReviews(response.data);
            //     });
        }
    }, [userAuth[0]]);

    if (userAuth[0] === false) {
        return <Notfound />;
    }
    if (
        userAuth[0] === 'loading' ||
        userProfile === 'loading' ||
        !wroteReviews ||
        !likedLectures ||
        !completedCourses
    ) {
        return (
            <LoadingStyle>
                <img src={loadingImg} alt="화면 로딩중" />
            </LoadingStyle>
        );
    }

    // return <BackgroundStyle />;
    return (
        <MypageStyled>
            <BackgroundStyle />
            <GapStyle />
            <LeftStyle>
                <LeftContentStyle>
                    <div>
                        <ProfileImgStyle
                            src={
                                userProfile.imageUrl
                                    ? userProfile.imageUrl
                                    : guest
                            }
                        />
                        <NicknameStyle>
                            <EmailStyle>{userProfile.email}</EmailStyle>
                            {userProfile.nickname}
                        </NicknameStyle>
                        <DescriptionStyle>
                            {userProfile.description
                                ? userProfile.description
                                      .split('\n')
                                      .map((line, index) => (
                                          <span key={index}>
                                              {line}
                                              <br />
                                          </span>
                                      ))
                                : null}
                        </DescriptionStyle>
                        <div>
                            <GreyStyle>Github: </GreyStyle> {userProfile.gitUrl}
                        </div>
                        <div>
                            <GreyStyle>Blog: </GreyStyle>
                            {userProfile.blogUrl}
                        </div>
                    </div>
                    <LinkStyle to="/mypage/editprofile" state={{ userProfile }}>
                        <EditProfileButtonStyle>
                            프로필 편집
                        </EditProfileButtonStyle>
                    </LinkStyle>
                    <StatisticsStyle>
                        <IconImgStyle src={chartbarIcon} alt="통계" />
                        학습 통계
                        <br />
                        <StatisticsBoxStyle>
                            <StatisticsNumberStyle>
                                {completedCourses.totalLecture}
                            </StatisticsNumberStyle>
                            수강완료 강의
                        </StatisticsBoxStyle>
                        <StatisticsBoxStyle>
                            <StatisticsNumberStyle>
                                {wroteReviews.totalReview}
                            </StatisticsNumberStyle>
                            내가 쓴 리뷰
                        </StatisticsBoxStyle>
                    </StatisticsStyle>
                </LeftContentStyle>
            </LeftStyle>
            <RightStyle>
                <div>
                    좋아요한 강의
                    {likedLectures.totalPage > 1 ? (
                        <LinkAllStyle
                            to={`/mypage/ViewAll/liked?totalpage=${likedLectures.totalPage}&page=2`}
                        >
                            전체보기
                        </LinkAllStyle>
                    ) : null}
                    <GreyBoxStyle>
                        {likedLectures.data.length === 0 ? (
                            <NotyetStlye>
                                아직 좋아요한 강의가 없습니다
                            </NotyetStlye>
                        ) : (
                            <MypageLecturesItem data={likedLectures.data} />
                        )}
                    </GreyBoxStyle>
                </div>
                <div>
                    수강완료 강의
                    {completedCourses.totalPage > 1 ? (
                        <LinkAllStyle
                            to={`/mypage/ViewAll/coursed?totalpage=${completedCourses.totalPage}&page=2`}
                        >
                            전체보기
                        </LinkAllStyle>
                    ) : null}
                    <GreyBoxStyle>
                        {completedCourses.data.length === 0 ? (
                            <NotyetStlye>
                                아직 수강완료한 강의가 없습니다
                            </NotyetStlye>
                        ) : (
                            <MypageLecturesItem data={completedCourses.data} />
                        )}
                    </GreyBoxStyle>
                </div>
                <div>
                    내가 쓴 리뷰
                    {wroteReviews.totalPage > 1 ? (
                        <LinkAllStyle
                            to={`/mypage/ViewAll/reviews?totalpage=${wroteReviews.totalPage}&page=2`}
                        >
                            전체보기
                        </LinkAllStyle>
                    ) : null}
                    <GreyBoxReviewStyle>
                        {wroteReviews.data.length === 0 ? (
                            <NotyetStlye>아직 남긴 리뷰가 없습니다</NotyetStlye>
                        ) : (
                            <MyReviews reviews={wroteReviews.data} />
                        )}
                    </GreyBoxReviewStyle>
                </div>
            </RightStyle>
            <GapStyle />
        </MypageStyled>
    );
}

export default Mypage;

const LoadingStyle = styled.div`
    text-align: center;
    padding-top: 30px;
    min-height: calc(100vh - 270px);
`;

const MypageStyled = styled.div`
    width: 100%;
    min-height: calc(100vh - 242px);
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    /* overflow: hidden; */
    @media screen and (max-width: 769px) {
        flex-direction: column;
        align-items: center;
    }
`;

const BackgroundStyle = styled.div`
    position: absolute;
    min-height: 100%;
    z-index: -40;
    width: calc(7vw + 303px);
    border-right: 1px solid #d0d0d0;
    background: #fafafa;
    @media screen and (min-width: 1441px) {
        width: calc((100vw - 1238.4px) / 2 + 303px);
    }
    @media screen and (max-width: 769px) {
        display: none;
    }
`;

const GapStyle = styled.div`
    width: 7vw;
    height: 10px;
    @media screen and (min-width: 1441px) {
        width: calc((100vw - 1238.4px) / 2);
    }
    @media screen and (max-width: 769px) {
        display: none;
    }
    vertical-align: top;
`;

const LeftStyle = styled.div`
    padding: 32px 20px 32px 0;
    width: 283px;
    height: 100%;
    vertical-align: top;
    @media screen and (max-width: 769px) {
        padding: 32px 0 32px 0;
        width: 100%;
        background: #fafafa;
    }
`;

const LeftContentStyle = styled.div`
    width: 283px;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    @media screen and (max-width: 769px) {
        width: calc(100% - 40px);
        margin: 0 20px;
    }
`;

const ProfileImgStyle = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100px;
`;

const EmailStyle = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
`;

const NicknameStyle = styled.div`
    font-weight: 500;
    font-size: 20px;
    position: absolute;
    height: 78px;
    line-height: 29px;
    width: 183px;
    @media screen and (max-width: 769px) {
        width: calc(100% - 136px);
    }
    display: inline;
    word-break: break-all; //단어로 줄바꿈말고(영어) 글자로 줄바꿈
    margin-left: 16px;
    overflow-y: auto;
`;

const DescriptionStyle = styled.div`
    margin: 13px 0 20px 0;
    min-height: 46px;
    overflow-y: auto;
    max-height: 115px;
`;

const GreyStyle = styled.span`
    color: #7a7a7a;
    display: inline-block;
    margin-bottom: 8px;
`;

const LinkStyle = styled(Link)`
    display: inline-block;
    margin: 20px 0 32px 0;
`;

const EditProfileButtonStyle = styled.button`
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    border: solid 1px #0054fd;
    border-radius: 100px;
    background: #ffffff;
    color: #0054fd;
    width: 283px;
    height: 48px;
    cursor: pointer;
    @media screen and (max-width: 769px) {
        width: calc(100vw - 40px);
    }
`;

const StatisticsStyle = styled.div`
    padding: 12px 14px;
    height: 142px;
    width: 253px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    @media screen and (max-width: 769px) {
        width: calc(100vw - 70px);
        text-align: center;
    }
`;

const StatisticsNumberStyle = styled.div`
    font-size: 40px;
    line-height: 58px;
    font-weight: 500;
    color: #7a7a7a;
    margin-bottom: 9px;
`;

const StatisticsBoxStyle = styled.div`
    margin: 16px 7px 0px 7px;
    width: 112px;
    text-align: center;
    display: inline-block;
    font-weight: 400;
`;

const RightStyle = styled.div`
    width: calc(86vw - 310px - 32px);
    max-width: 896.4px;
    height: 100%;
    margin: 32px 0 44px 32px;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    vertical-align: top;
    @media screen and (max-width: 769px) {
        width: calc(100vw - 40px);
        margin: 20px 20px 0 20px;
    }
`;

const LinkAllStyle = styled(Link)`
    float: right;
    color: #7a7a7a;
    font-weight: 400;
    font-size: 14px;
    margin-top: 15px;
    cursor: pointer;
    line-height: 14px;
`;

const GreyBoxStyle = styled.div`
    width: 100%;
    /* height: calc((86vw - 296px)); */
    background: #fafafa;
    border: 1px solid #dddddd;
    border-radius: 8px;
    margin: 15px 0 32px 0;
    @media screen and (max-width: 769px) {
        background-color: white;
        border: none;
        width: 100%;
        margin-bottom: 20px;
    }
    /* @media screen and (min-width: 768px) {
        height: calc((86vw - 314px));
        margin-bottom: 12px;
    }
    @media screen and (min-width: 1024px) {
        height: calc(((86vw / 3 * 2) - 184px));
        margin-bottom: 16px;
    }
    @media screen and (min-width: 1440px) {
        height: 500.2px;
    } */
`;

const NotyetStlye = styled.div`
    font-size: 14px;
    line-height: 20px;
    color: #7a7a7a;
    text-align: center;
    font-weight: 400;
    margin: 24px 0 24px 0;
`;

const IconImgStyle = styled.img`
    width: 24px;
    height: 24px;
    padding: 0 0 0 0;
    margin: 0 4px 0 0;
    vertical-align: bottom;
`;

const GreyBoxReviewStyle = styled.div`
    width: 100%;
    background: #fafafa;
    border: 1px solid #dddddd;
    border-radius: 8px;
    margin: 15px 0 32px 0;
`;
