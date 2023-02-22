import styled from 'styled-components';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import background from '../images/roadmapsBack.png';
import RoadmapsItem from '../components/item/RoadmapsItem';
import RoadmapsList from '../data/RoadmapsList.json';

function Roadmaps() {
    return (
        <RoadmapsStyled>
            <div>
                <SearchInfoStyle>
                    <SearchTextStyle>
                        로그인하고 새로운 로드맵을 만들어보세요!
                        {/* <div> <SearchBox placeholder="로드맵을 검색하세요" /> </div> */}
                        <ButtonContainerStyle>
                            <Link to="/roadmap/registration-request">
                                <ButtonStyle>로드맵 등록하기</ButtonStyle>
                            </Link>
                        </ButtonContainerStyle>
                    </SearchTextStyle>
                </SearchInfoStyle>
            </div>
            {/* {dummyData[0].name} */}
            <RoadmapsItem data={RoadmapsList} />
        </RoadmapsStyled>
    );
}

export default Roadmaps;

const RoadmapsStyled = styled.div`
    margin: 32px 7% 100px 7%;
    text-align: center;
    align-items: center;
    @media screen and (min-width: 1440px) {
        margin: 32px auto 100px auto;
        width: 1238.4px;
    }
`;

const SearchInfoStyle = styled.div`
    width: 100%;
    height: 156px;
    /* height: 80px; */
    background-image: url(${background});
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
`;

const SearchTextStyle = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    // 여기 다시 조정
    line-height: 35px;
    padding-top: 21px;
    text-align: center;
    color: #ffffff;
`;

const SearchBox = styled.input`
    height: 48px;
    border: none;
    border-radius: 100px;
    width: 55%;
    padding-left: 27px;
    font-size: 16px;
    margin-top: 22px;
    border: solid 2px #0054fd;
`;

const ButtonStyle = styled.button`
    background-color: white;
    height: 48px;
    border: none;
    border-radius: 100px;
    width: 300px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
    &:active {
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25) inset;
    }
`;
const ButtonContainerStyle = styled.div`
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: 300px;
    height: 48px;
    border-radius: 100px;
    margin: 22px auto 0 auto;
`;
