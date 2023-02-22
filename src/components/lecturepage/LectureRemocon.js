import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import starIcon from '../../images/starIcon.png';
import nonfavorite from '../../images/nonfavorite.png';
import favorite from '../../images/favorite.png';

function LectureRemocon({
    lectureId,
    lectureData,
    totalReview,
    register,
    setModalopen,
    userAuth,
}) {
    // 1. 강의 좋아요 갯수, 강의 좋아요 여부, 강의 수강 여부, 리뷰 등록 여부 조회하기
    const [likesCount, setlikesCount] = useState(0);
    const [likedLecture, setLikedLecture] = useState(false);
    const [completedCourse, setCompletedCourse] = useState(false);
    const [wroteReview, setWroteReview] = useState(false);

    // useEffect(() => {
    //     console.log('리모콘 렌더링');
    // });
    useEffect(() => {
        if (userAuth[0]) {
            setlikesCount(lectureData.likes);
            // axios
            //     .get(
            //         `lecture-service/auth/${lectureId}/likes`,

            //         { headers: { 'X-AUTH-TOKEN': userAuth[1] } },
            //     )
            //     .then(response => {
            //         setLikedLecture(response.data.data);
            //     });
            // axios
            //     .get(
            //         `lecture-service/auth/${lectureId}/course`,

            //         { headers: { 'X-AUTH-TOKEN': userAuth[1] } },
            //     )
            //     .then(response => {
            //         setCompletedCourse(response.data.data);
            //     });
            // axios
            //     .get(
            //         `review-service/auth/review/${lectureId}`,

            //         { headers: { 'X-AUTH-TOKEN': userAuth[1] } },
            //     )
            //     .then(response => {
            //         setWroteReview(response.data.data);
            //     });
        }
    }, [lectureId, userAuth[0]]);

    // 2. 강의 수강, 리뷰 남기기 버튼 설정하기
    const text = ['이 강의를 듣고 있어요', '리뷰 남기기', '수강 완료'];
    const WriteReviewButtonClick = useCallback(e => {
        if (e.target.innerText === text[0]) {
            e.target.disabled = true;
            // axios
            //     .post(
            //         `lecture-service/auth/${lectureId}/course`,
            //         {},
            //         {
            //             headers: { 'X-AUTH-TOKEN': userAuth[1] },
            //         },
            //     )
            //     .then(() => {
            //         setCompletedCourse(true);
            //         e.target.disabled = false;
            //     })
            //     .catch(() => {
            //         e.target.disabled = false;
            //     });
        } else if (e.target.innerText === text[1]) {
            setModalopen(true);
        }
    });

    const WriteReviewButton = !(userAuth[0] === true) ? (
        <div />
    ) : (
        <ButtonStyle
            textColor="#0054FD"
            backColor="#FFFFFF"
            onClick={WriteReviewButtonClick}
            cursor={!wroteReview ? 'pointer' : ''}
        >
            {wroteReview ? text[2] : completedCourse ? text[1] : text[0]}
        </ButtonStyle>
    );

    // 3. 리뷰 등록하면(WriteReview컴포넌트에서 register변수가 false->true로 바뀌면) 상태바꾸기
    useEffect(() => {
        if (register[0]) {
            setWroteReview(true);
        }
        if (register[1]) {
            setWroteReview(false);
        }
    }, [register]);

    // 4. 강의 좋아요 버튼
    const likeLectureButtonClick = useCallback((e, like) => {
        if (userAuth[0]) {
            e.target.disabled = true;
            if (like) {
                // axios
                //     .post(
                //         `lecture-service/auth/${lectureId}/likes`,
                //         {},
                //         {
                //             headers: { 'X-AUTH-TOKEN': userAuth[1] },
                //         },
                //     )
                //     .then(() => {
                //         setLikedLecture(true);
                //         setlikesCount(likesCount + 1);
                //         e.target.disabled = false;
                //     })
                //     .catch(error => {
                //         e.target.disabled = false;
                //     });
            } else {
                // axios
                //     .delete(`lecture-service/auth/${lectureId}/likes`, {
                //         headers: { 'X-AUTH-TOKEN': userAuth[1] },
                //     })
                //     .then(() => {
                //         setLikedLecture(false);
                //         setlikesCount(likesCount - 1);
                //         e.target.disabled = false;
                //     })
                //     .catch(() => {
                //         e.target.disabled = false;
                //     });
            }
        }
    });

    const likeLectureButton = likedLecture ? (
        <RemoconImgStyle
            src={favorite}
            onClick={e => {
                likeLectureButtonClick(e, false); // 좋아요 취소
            }}
        /> // 강의 좋아요 취소 api로 수정하기
    ) : (
        <RemoconImgStyle
            src={nonfavorite}
            onClick={e => {
                likeLectureButtonClick(e, true); // 좋아요 누르기
            }}
        />
    );

    // 5. 리뷰버튼 누르면 아래로
    const goDownIconClick = useCallback(() => {
        const location = document.querySelector('#reviewOver').offsetTop;
        window.scrollTo({ top: location - 20, behavior: 'smooth' });
    });

    return (
        <LectureRemoconStyle>
            <RemoconTopStyle>
                {lectureData.salePrice
                    ? `₩ ${lectureData.salePrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                    : `무료`}
                {userAuth[0] ? (
                    <RemoconTopRightStyle>
                        <RemoconImgStyle
                            onClick={goDownIconClick}
                            src={starIcon}
                        />
                        {totalReview}
                        {likeLectureButton}
                        {likesCount}
                    </RemoconTopRightStyle>
                ) : null}
            </RemoconTopStyle>
            {WriteReviewButton}
            <a href={lectureData.vendorUrl} target="_blank" rel="noreferrer">
                <ButtonStyle textColor="#FFFFFF" backColor="#0054FD" cursor>
                    강의 링크로 이동하기
                </ButtonStyle>
            </a>
        </LectureRemoconStyle>
    );
}

export default React.memo(LectureRemocon);

const LectureRemoconStyle = styled.div`
    position: sticky;
    top: 530px;
    vertical-align: top;
    display: inline-block;
    left: 100%;
    width: 259px;
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 16px 12px 8px 12px;
`;

const RemoconTopStyle = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 35px;
    padding-bottom: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RemoconImgStyle = styled.img`
    height: 20px;
    width: 24px;
    cursor: pointer;
    object-fit: contain;
    margin: 0 3px 0 6px;
    &:active {
        transition: all 0.01s;
        transform: scale(1.2);
    }
`;

const RemoconTopRightStyle = styled.div`
    font-weight: 400;
    font-size: 16px;
    /* line-height: 23px; */
    display: flex;
    align-items: center;
`;

const ButtonStyle = styled.button`
    width: 259px;
    height: 48px;
    font-size: 16px;
    font-weight: 700;
    background-color: ${props => props.backColor};
    border: solid 1px #0054fd;
    color: ${props => props.textColor};
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
