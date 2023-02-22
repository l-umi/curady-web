import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import ResultLecturesItem from '../components/item/ResultLecturesItem';
import loadingImg from '../images/spinner_0054fd_150px.gif';
import upIcon from '../images/upIcon_24.png';

const recommendKeywords = [
    '초보',
    '시작',
    '개발자',
    '핵심',
    '개념',
    '프로그래밍',
    '활용',
    '따라하며',
    '만들기',
    '실전',
    '쿠버네티스',
    '클라우드',
    '코딩',
    '프로젝트',
    '실무',
    '코딩테스트',
    '면접',
    '기본',
    'Git',
    '필수',
];

const KeywordButtons = React.memo(function KeywordButtons() {
    return (
        <div>
            {recommendKeywords.map(text => (
                <MarginStyle key={text}>
                    <Link to={`/search?word=${encodeURIComponent(text)}`}>
                        <ButtonStyle color="#7A7A7A">{text}</ButtonStyle>
                    </Link>
                </MarginStyle>
            ))}
        </div>
    );
});

function SearchResult() {
    // 1. 로딩 화면, 무한 스크롤
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView();

    // 2. 현재 URL확인
    const url = new URL(window.location);
    const query = url.search;
    const params = new URLSearchParams(query);
    const word = params.get('word');

    // 3. 강의 데이터 받아오기
    const [totalPage, setTotalPage] = useState(0);
    const [totalLecture, setTotalLecture] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const arr = Array.from({ length: 58 }, (v, i) => i + 1); // [1,2,3,4, ..., 58]
    const [data, setData] = useState([]); // 이중배열

    // 3-1. ?word=APP의 쿼리스트링이 바꿘 경우에 데이터를 다시 받아옴
    useEffect(() => {
        // URL이 변경될 때를 대비한 예외처리
        if (word === null || word.replace(/\s/g, '').length === 0) {
            setLoading(false);
        } else {
            setLoading(true);
            // axios
            //     // 인코딩조심
            //     .get(`/lecture-service/lectures${query}`)
            //     .then(response => {
            //         setData([response.data.data]);
            //         setTotalLecture(response.data.totalLecture);
            //         setCurrentPage(1);
            //         setTotalPage(response.data.totalPage);
            //         setLoading(false);
            //     })
            //     .catch(() => {
            //         alert('강의를 불러오는데 실패했습니다');
            //         setLoading(false);
            //     });
        }
    }, [query]);

    // 3-2. 바닥에 닿으면 다음 페이지의 데이터를 받아와서 더해줌 (최적화)
    useEffect(() => {
        if (inView) {
            // axios
            //     .get(
            //         `/lecture-service/lectures${query}&page=${currentPage + 1}`,
            //     )
            //     .then(response => {
            //         setData([...data, response.data.data]);
            //         setCurrentPage(currentPage + 1);
            //     })
            //     .catch(error => {
            //         // console.log(error);
            //         alert('강의를 불러오는데 실패했습니다');
            //     });
        }
    }, [inView]);

    if (loading) {
        return (
            <SearchResultStyle>
                <img src={loadingImg} alt="loading" />
            </SearchResultStyle>
        );
    }

    const sortText = [
        { id: 'updatedAt,desc', text: '최신순' },
        { id: 'views,desc', text: '인기순' },
        { id: 'name', text: '가나다순' },
        // { id: '4', text: '조회수' },
        // { id: '5', text: '최신' },
    ];

    return (
        <SearchResultStyle>
            {totalLecture === 0 ? (
                word === null || word.replace(/\s/g, '').length === 0 ? (
                    <NoResultsStyle>
                        주소가 잘못 입력되었거나, 변경 혹은 삭제되어 요청하신
                        페이지를 찾을 수 없습니다. <br />
                        검색어를 다시 입력해주세요
                    </NoResultsStyle>
                ) : (
                    <NoResultsStyle>
                        <DarkblueStyle>{word}</DarkblueStyle>에 관한 검색 결과가
                        없습니다.
                        <br /> 이런 검색어는 어떠세요?
                        <br />
                        <KeywordBoxStyle>
                            <KeywordButtons />
                        </KeywordBoxStyle>
                    </NoResultsStyle>
                )
            ) : (
                <ResultsStyle>
                    <WordTitleStyle>
                        <DarkblueStyle>{word}</DarkblueStyle>에 관한{' '}
                        {/* 전체 갯수로 바꾸기 */}
                        <DarkblueStyle>{totalLecture}개</DarkblueStyle>의
                        검색결과{' '}
                    </WordTitleStyle>
                    <DropBoxStyle>
                        <BoxStyle title="true">정렬 방식</BoxStyle>
                        <SortStyle>
                            {sortText.map(e => (
                                <Link
                                    to={`/search?word=${encodeURIComponent(
                                        word,
                                    )}&sort=${e.id}`}
                                    key={e.id}
                                >
                                    <BoxStyle>{e.text}</BoxStyle>
                                </Link>
                            ))}
                        </SortStyle>
                    </DropBoxStyle>
                    <ItemContainerStyle id="container">
                        {arr.map(e =>
                            currentPage >= e ? (
                                <ResultLecturesItem
                                    key={e}
                                    data={data[e - 1]}
                                    page={e}
                                />
                            ) : null,
                        )}
                        <UpImgStyle
                            src={upIcon}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            alt="위로"
                        />
                    </ItemContainerStyle>
                    <div />
                    {totalPage === currentPage ? null : (
                        <img ref={ref} src={loadingImg} alt="" />
                    )}
                </ResultsStyle>
            )}
        </SearchResultStyle>
    );
}

export default SearchResult;

const MarginStyle = styled.span`
    margin: 5px 3px 2px 2px; //가로만 적용됨(span이라)
    // 높이지정을 위해
    display: inline-block;
`;

const ButtonStyle = styled.button`
    height: 32px;
    border-radius: 36px;
    /* border: solid 1px; */
    border: none;
    background-color: #f5f5f5;
    &:hover {
        background-color: #e7e7e7;
    }
    padding: 0px 13px 0px 13px;
    cursor: pointer;
`;

const SearchResultStyle = styled.div`
    padding-bottom: 100px;
    padding-top: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 410px);
    /* min-height: 400px; */
    font-size: 24px;
    font-weight: 500;
`;

const NoResultsStyle = styled.div`
    padding-bottom: 100px;
    padding-top: 50px;
    width: 86%;
    max-width: 1238.4px;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
`;

const KeywordBoxStyle = styled.div`
    margin: 50px 0 0 0;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    display: inline-block;
`;

const ResultsStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 86%;
    max-width: 1238.4px;
    align-items: center;
`;

const WordTitleStyle = styled.div`
    max-width: 1238.4px;
    /* text-align: center; */
    padding-bottom: 50px;
`;

const DarkblueStyle = styled.span`
    color: #2d6ea0;
`;

const ItemContainerStyle = styled.div`
    width: 100%;
    @media screen and (max-width: 768px) {
        width: calc(100% - 10px);
        margin: 0 10px;
    }
`;

const UpImgStyle = styled.img`
    width: 46px;
    left: 100%;
    height: 46px;
    background-color: white;
    position: sticky;
    bottom: 50px;
    border: #e7e7e7 solid 1px;
    cursor: pointer;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
`;

const DropBoxStyle = styled.div`
    border: 1px solid #dddddd;
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
    width: 80px;
    text-align: center;
    position: absolute;
    background-color: white;
    align-self: start;
    transform: translateY(30px);
    margin-left: 6.5px;
`;

const SortStyle = styled.div`
    display: none;
    /* &:focus, */
    ${DropBoxStyle}:hover & {
        display: flex;
        flex-direction: column;
    }
`;

const BoxStyle = styled.div`
    padding: 6px 0 6px 0;
    margin: 2px 0 2px 0;
    cursor: ${props => (props.title === 'true' ? 'default' : 'pointer')};
    &:hover {
        color: ${props => (props.title === 'true' ? 'black' : '#777')};
    }
`;
