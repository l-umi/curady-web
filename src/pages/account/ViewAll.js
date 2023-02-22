import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';
import { userAuthState } from '../../data/User';
import PageButtons from '../../components/lecturepage/PageButtons';
import MyReviews from '../../components/MyReviews';

function ViewAllItem({ data }) {
    if (data === undefined || data.length === 0) {
        return null;
    }
    return (
        <ViewAllItemStyle>
            {data.map(d => (
                <LinkStyle key={d.id} to={`/lecture/${d.id}`}>
                    <ItemWrapStyle>
                        <BoxContainerStyle />
                        <ImgWrapStyle
                            src={`https://curady-lecture-s3.s3.ap-northeast-2.amazonaws.com/lecture_images/${d.imagePath}`}
                            alt="강의 이미지"
                        />
                        <ContentStyle>
                            <div>
                                <ProviderStyle
                                    src={`https://curady.kr/logos/${d.vendorName}.png`}
                                    alt={d.vendorName}
                                />
                                <LectureNameStyle>{d.name}</LectureNameStyle>
                            </div>
                            <LectureInstructorStyle>
                                {d.instructorName}
                            </LectureInstructorStyle>
                        </ContentStyle>
                    </ItemWrapStyle>
                </LinkStyle>
            ))}
        </ViewAllItemStyle>
    );
}

function ViewAll() {
    const url = new URL(window.location);
    const type = url.pathname.slice(16);
    const params = new URLSearchParams(url.search);
    const currentPage = params.get('page');
    const [data, setData] = useState([]);
    const userAuth = useRecoilValue(userAuthState);
    const [title, setTitle] = useState('');
    const navigator = useNavigate();
    useEffect(() => {
        if (userAuth[0] === true) {
            if (type === 'liked') {
                setTitle('좋아요한 강의');
                // axios
                //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
                //     .get(
                //         `/lecture-service/auth/lectures/liked?page=${currentPage}`,
                //         {
                //             headers: {
                //                 'X-AUTH-TOKEN': userAuth[1],
                //             },
                //         },
                //     )
                //     .then(response => {
                //         setData(response.data.data);
                //     });
            } else if (type === 'coursed') {
                setTitle('수강완료 강의');
                // axios
                //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
                //     .get(
                //         `/lecture-service/auth/lectures/coursed?page=${currentPage}`,
                //         {
                //             headers: {
                //                 'X-AUTH-TOKEN': userAuth[1],
                //             },
                //         },
                //     )
                //     .then(response => {
                //         setData(response.data.data);
                //     });
            } else if (type === 'reviews') {
                setTitle('내가 쓴 리뷰');
                // axios
                //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
                //     .get(`/review-service/auth/reviews?page=${currentPage}`, {
                //         headers: {
                //             'X-AUTH-TOKEN': userAuth[1],
                //         },
                //     })
                //     .then(response => {
                //         setData(response.data.data);
                //     });
            }
        }
    }, [type, currentPage, userAuth]);

    return (
        <ViewAllStyle>
            <TitleStyle>{title}</TitleStyle>
            {type === 'reviews' ? (
                <MarginStyle>
                    <MyReviews reviews={data} />
                </MarginStyle>
            ) : (
                <ViewAllItem data={data} />
            )}

            <PageButtons
                current={currentPage || '1'}
                total={params.get('totalpage')}
                object={{
                    url,
                    params,
                    navigator,
                }}
            />
        </ViewAllStyle>
    );
}

export default ViewAll;

const ViewAllItemStyle = styled.div`
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
        height: 300px;
        margin: 0 0 0 6px;
        margin-bottom: 24px;
    }
    @media screen and (max-width: 1440px) {
        /* Lectures의 width는 81.7vw - 120px */
        /* 가로세로비율 100:128 */
        /* 아이템 간의 거리 20px */
        width: calc((100% - 39px) / 3);
        height: calc((86vw - 39px) / 3);
        margin: 0 6.5px;
        margin-bottom: 32px;
    }
    @media screen and (max-width: 1024px) {
        width: calc((100% - 20px) / 2);
        height: calc((86vw - 20px) / 2);
        margin: 0 5px;
        margin-bottom: 32px;
    }
    @media screen and (max-width: 768px) {
        width: calc((100% - 20px) / 2);
        height: calc((86vw - 30px) / 2);
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
    width: 100%;
    height: 58%;
    background-size: cover;
    border-radius: 8px 8px 0px 0px;
    /* margin-bottom: 4px; */
`;

const ContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
    padding: 0 8px 0 8px;
`;

const BoxContainerStyle = styled.div`
    display: flex;
    justify-content: flex-end;
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

const ViewAllStyle = styled.div`
    width: 86vw;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    margin: 64px auto 64px auto;
    min-height: calc(100vh - 368px);
    font-size: 16px;
    line-height: 23px;
`;

const TitleStyle = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    margin-bottom: 15px;
`;

const MarginStyle = styled.div`
    margin-bottom: 32px;
`;
