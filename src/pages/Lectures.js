import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from '../components/lecturepage/Categories';
import sortIcon from '../images/sortIcon.png';
import priceIcon from '../images/priceIcon.png';
import levelIcon from '../images/levelIcon.png';
import keywordIcon from '../images/keywordIcon.png';
import Switch from '../components/lecturepage/Switch';
import LecturesItem from '../components/item/LecturesItem';
import PageButtons from '../components/lecturepage/PageButtons';

function Lectures() {
    const url = new URL(window.location);
    const path = url.pathname.slice(10); // 앞의 lectures/ 뺴고
    const query = url.search;
    const params = new URLSearchParams(query);
    // console.log('url is ', url);
    const navigator = useNavigate();

    // 정렬 및 필터, id를 문자열에서 다른 자료형으로 바꾸면 filter 컴포넌트도 수정해주어야함
    const sortText = [
        { id: 'updatedAt,desc', text: '최신순' },
        { id: 'views,desc', text: '인기순' },
        { id: 'name', text: '가나다순' },
        // { id: '4', text: '조회수' },
        // { id: '5', text: '최신' },
    ];
    const priceText = [
        { id: '0,0', text: '무료' },
        { id: '1,50000', text: '~5만원' },
        { id: '50001,100000', text: '5~10만원' },
        { id: '100001,150000', text: '10~15만원' },
        { id: '150001,10000000', text: '15만원~' },
    ];
    const levelText = [
        { id: '0', text: '입문' },
        { id: '1', text: '초급' },
        { id: '2', text: '중급' },
        { id: '3', text: '상급' },
    ];
    const keywordText = [
        { id: '1', text: '키워드1' },
        { id: '2', text: '키워드2' },
        { id: '3', text: '키워드3' },
        { id: '4', text: '키워드4' },
    ];

    // 강의 목록 조회 하기~~ 페이징이랑 필터 적용해서~
    const [data, setData] = useState();
    const [totalLecture, setTotalLecture] = useState('');

    // console.log('페이지 리렌더링');
    useEffect(() => {
        window.scrollTo(0, 0);

        // 1. 전체 강의 목록 조회 (/lectures 혹은 /lectures/)
        if (path === '') {
            // axios
            //     .get(`/lecture-service/lectures${url.search}`)
            //     .then(response => {
            //         setData(response.data);
            //     })
            //     .catch(error => {
            //         alert('강의 조회의 문제가 발생했습니다');
            //     });
        } else {
            // 2. 카테고리 별 강의 목록 조회
            // axios
            //     .get(
            //         `/lecture-service/lectures?category=${path}${
            //             url.search === '' ? '' : `&${url.search.slice(1)}`
            //         }`,
            //     )
            //     .then(response => {
            //         setData(response.data);
            //     })
            //     .catch(() => {
            //         // /lectures/ff처럼 categoryId가 틀리면 /lectures로 보내버리기
            //         navigator('/lectures');
            //     });
        }
    }, [path, query]);

    return (
        <LecturesStyle>
            {/* 왼쪽 */}
            <CategoriesContainer>
                <Categories
                    id={path === '' ? '0' : path}
                    totalLecture={data ? data.totalLecture : ''}
                />
            </CategoriesContainer>
            {/* 오른쪽 */}
            <RightStyle>
                <FiltersStyle>
                    <Switch
                        name="sort"
                        text="정렬"
                        icon={sortIcon}
                        elements={sortText}
                        // 객체 중복 선언 방지(안하면 버튼 18개에서 모두 선언됨)
                        object={{
                            url,
                            params,
                            navigator,
                        }}
                    />
                    <LineStyle />
                    <Switch
                        name="price"
                        text="가격"
                        icon={priceIcon}
                        elements={priceText}
                        object={{
                            url,
                            params,
                            navigator,
                        }}
                    />
                    <LineStyle />
                    <Switch
                        name="level"
                        text="난이도"
                        icon={levelIcon}
                        elements={levelText}
                        object={{
                            url,
                            params,
                            navigator,
                        }}
                    />
                    {/* <LineStyle />
                    <Switch
                        name="keyword"
                        text="키워드"
                        icon={keywordIcon}
                        elements={keywordText}
                        object={{
                            url,
                            params,
                            navigator,
                        }}
                    /> */}
                </FiltersStyle>
                <LecturesItem data={data ? data.data : []} />
                <PageButtons
                    current={params.get('page') ? params.get('page') : '1'}
                    // 요기 total 수정하기
                    total={data ? data.totalPage.toString() : ''}
                    object={{
                        url,
                        params,
                        navigator,
                    }}
                />
            </RightStyle>
        </LecturesStyle>
    );
}

export default Lectures;

const LecturesStyle = styled.div`
    padding-top: 36px;
    display: flex;
    justify-content: space-between;
    min-height: calc(100vh - 277px);
    margin: auto;
    width: 86%;
    max-width: 1238.4px; /* 1440px * 0.86 */
    padding-bottom: 100px; /* 메인, 강의, 로드맵 동일 */
`;

const CategoriesContainer = styled.div`
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
const RightStyle = styled.div`
    /* 실험해보니 이게 13~42px범위로 제일 보기 좋았음 */
    /* width의 %는 lectures's width를 기준으로 정해짐 */
    /* 계산해보니 max-width:1056.48px */
    width: calc(95% - 135px);
    margin-left: calc(5% - 20px);
    margin-left: 0px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
const FiltersStyle = styled.div`
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 12px 0px 13px 0px;
    margin-left: 4px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const LineStyle = styled.div`
    border-bottom: 1px solid #d0d0d0;
    margin: 9px 0px 12px 0px;
`;
