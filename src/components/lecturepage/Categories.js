import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 파일 분리했습니당
function Categories({ id, totalLecture }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // axios
        //     .get('/lecture-service/categories/0')
        //     .then(response => {
        //         setCategories([{ id: 0, name: '전체' }, ...response.data.data]);
        //     })
        //     .catch(() => {
        //         alert('카테고리 조회의 문제가 발생했습니다');
        //     });
    }, []);
    // 카테고리 바꿀 때마다 전체강의수 데이터 받아올때까지 기다리는 함수(안하면 순간 숫자 바뀌는거 보임)
    const [wait, setWait] = useState('');
    useEffect(() => {
        setWait(false);
    }, [totalLecture]);

    return (
        <CategoriesStyle>
            {categories.map(c => (
                <div key={c.id}>
                    {id === `${c.id}` ? (
                        <div>
                            <CategoryStyle cursor="default" color="#0054fd">
                                {c.name}
                            </CategoryStyle>
                            <NumberStyle>
                                {wait ? '' : totalLecture}
                            </NumberStyle>
                        </div>
                    ) : (
                        <LinkStyle
                            to={c.id === 0 ? '/lectures' : `/lectures/${c.id}`}
                            onClick={() => {
                                setWait(true);
                            }}
                        >
                            <CategoryStyle cursor="pointer" color="black">
                                {c.name}
                            </CategoryStyle>
                        </LinkStyle>
                    )}
                </div>
            ))}
        </CategoriesStyle>
    );
}

export default React.memo(Categories);

const CategoriesStyle = styled.div`
    padding-top: 20px;
    width: 140px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const LinkStyle = styled(Link)`
    text-decoration: none;
    font-style: normal;
`;

const CategoryStyle = styled.div`
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 20px;
    color: ${props => props.color};
    cursor: ${props => props.cursor};
`;

const NumberStyle = styled.div`
    position: absolute;
    transform: translate(142px, -32px);
    color: #0054fd;
    font-weight: 600;
    font-size: 20px;
`;
