import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// 로그인인지 아닌지 판단하는 컴포넌트
function Tendency({ userAuth, nickname }) {
    // console.log(loginState);
    return (
        <TendencyStyle>
            {userAuth[0] ? (
                <User userAuth={userAuth} name={nickname} />
            ) : (
                <Guest />
            )}
        </TendencyStyle>
    );
}

// 로그인시 나타낼 화면 컴포넌트
function User({ userAuth, name }) {
    const [tendencyList, setTendencyList] = useState();
    useEffect(() => {
        // axios
        //     // params가 아닌 word로 주면 C%23이아니라 C#(디코딩된 채)로 가서 특수문자 인식못함, 인코딩해줘야함
        //     .get(`/user-service/auth/user/info`, {
        //         headers: {
        //             'X-AUTH-TOKEN': userAuth[1],
        //         },
        //     })
        //     .then(response => {
        //         setTendencyList(response.data.data.tendencyList);
        //     });
    }, []);
    return (
        <div>
            {tendencyList ? (
                tendencyList.length ? (
                    <div>
                        <div>{name}님만을 위한 추천 검색 키워드</div>
                        <CenterStyle>
                            {tendencyList.map(a => (
                                <KeywordButtonStyle key={a}>
                                    {a}
                                </KeywordButtonStyle>
                            ))}
                        </CenterStyle>
                    </div>
                ) : (
                    <div>
                        <div>{name}님에 대해 알려주세요</div>

                        <CenterStyle>
                            <Link
                                to={`/signup/choosetendency?nickname=${name}`}
                            >
                                <WhiteButtonStyle>
                                    취향 선택하러 가기
                                </WhiteButtonStyle>
                            </Link>
                        </CenterStyle>
                    </div>
                )
            ) : null}
        </div>
    );
}

// 비로그인시 나타낼 화면 컴포넌트
function Guest() {
    return (
        <div>
            <div>
                <div>로그인하고 특별한 강의 추천을 받아보세요</div>
            </div>
            <CenterStyle>
                <Link to="/login">
                    <WhiteButtonStyle>로그인</WhiteButtonStyle>
                </Link>
                <Link to="/signup">
                    <BlueButtonStyle>회원가입</BlueButtonStyle>
                </Link>
            </CenterStyle>
        </div>
    );
}

export default Tendency;

const TendencyStyle = styled.div`
    background-color: #f5f5f5;
    padding: 20px 10px 15px 10px;
    max-width: 1218.4px; /* calc(1440px * 0.86); */
    width: calc(86% - 20px);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    text-align: center;
    @media screen and (max-width: 768px) {
        width: calc(100% - 40px);
        margin: 0 20px 0 20px;
        font-size: 16px;
        line-height: 20px;
        min-width: 240px;
        overflow-x: auto;
    }
`;

const CenterStyle = styled.div`
    margin-top: 10px;
    max-width: 100%;
`;

const KeywordButtonStyle = styled.button`
    position: static;
    border-radius: 36px;
    font-size: 80%;
    line-height: 1.6em;
    background: #ffffff;
    color: #0054fd;
    border: solid 2px #0054fd;
    margin: 0px 2px 5px 2px;
    padding: 0px 9px 0px 9px;
`;

const WhiteButtonStyle = styled.button`
    background-color: white;
    color: #0054fd;
    height: 40px;
    padding: 0 18px 3px 18px;
    border: 1px #0054fd solid;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
`;

const BlueButtonStyle = styled.button`
    background-color: #0054fd;
    margin-left: 10px;
    color: white;
    height: 40px;
    border: 1px #0054fd solid;
    padding: 0 18px 3px 18px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
`;
