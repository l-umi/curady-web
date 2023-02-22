import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import logo from '../logo.svg';
import searchIcon from '../images/search_24.png';
import IsLogined from './IsLogined';
import playIcon from '../images/playIcon_48.png';
import menuIcon from '../images/menu_24.png';
import closeIcon from '../images/close_24.png';

// 추천검색어 후보들
const keywords = [
    '프론트엔드',
    '백엔드',
    '파이썬',
    'Python',
    '자바',
    'Java',
    '자바스크립트',
    'JavaScript',
    '게임',
    'Swift',
    '유니티',
    'Go',
    '타입스크립트',
    'TypeScript',
    '엔진',
    'SQL',
    '안드로이드',
    'android',
    '아이폰',
    'ios',
    'App',
    '해킹',
    'C++',
    'C#',
    '알고리즘',
    'OS',
    '데이터 분석',
    'UI',
    '머신러닝',
    'AI',
    '시스템',
    'Node',
    '라이브러리',
    'Vue',
    'React',
    'express',
    '프레임워크',
    'Spring',
    'Django',
];

// 불필요한 리렌더링 방지를 위해 useNavigate를 사용하는 부분만 분리
function SearchBar({ clickBar, setClickBar }) {
    // URL바뀔때마다 리렌더링됨.. 어쩔 수 없음
    const nav = useNavigate();

    // 최근검색어와 추천검색어 6개씩 (페이지 리로드시 날라감)
    const [latestList, setLatestList] = useState([]);
    const [keywordList, setKeywordList] = useState([]);

    useEffect(() => {
        let newKeywordList = [];
        while (newKeywordList.length < 6) {
            const random =
                keywords[Math.floor(Math.random() * keywords.length)];
            if (newKeywordList) {
                if (!newKeywordList.includes(random)) {
                    newKeywordList = [...newKeywordList, random];
                }
            }
        }
        setKeywordList(newKeywordList);
    }, []);

    // 검색창 엔터 혹은 아이콘 클릭
    const goSearch = useCallback(e => {
        const inputText = document.querySelector(
            'input[id="#headerSearchBox"]',
        ).value;
        e.preventDefault();
        if (
            // 공백만 포함되면 X
            !(inputText === null || inputText.replace(/\s/g, '').length === 0)
        ) {
            setLatestList([inputText, ...latestList].slice(0, 6));
            nav(`/search?word=${encodeURIComponent(inputText)}`);
            setClickBar([false, false]);
            // 검색창 비우기, 검색창 포커스해제하기
            document.querySelector('input[id="#headerSearchBox"]').value = '';
            document.activeElement.blur();
        }
    });

    // 최신 검색어랑 추천 검색어 버튼 클릭 (히스토리 저장 X)
    const listButtonClick = useCallback(e => {
        e.preventDefault();
        nav(`/search?word=${encodeURIComponent(e.target.innerText)}`);
        setClickBar([false, false]);
        document.querySelector('input[id="#headerSearchBox"]').value = '';
        document.activeElement.blur();
    });

    return (
        <SearchBarStyle open={clickBar[0]}>
            <BoxStyle>
                <SearchBoxStyle
                    id="#headerSearchBox"
                    placeholder="궁금한 강의를 검색해보세요"
                    maxLength="256"
                    onKeyUp={e => {
                        if (window.event.keyCode === 13) {
                            goSearch(e);
                        }
                    }}
                />
                <DropBoxStyle>
                    <div>최근검색어</div>

                    {latestList.length ? (
                        <ListStyle>
                            {latestList.map((text, index) => (
                                <ListButtonStyle
                                    key={index}
                                    onClick={listButtonClick}
                                >
                                    {text}
                                </ListButtonStyle>
                            ))}
                        </ListStyle>
                    ) : (
                        <ListStyle center>
                            최근 검색한 내용이 없습니다
                        </ListStyle>
                    )}
                    <div>추천검색어</div>
                    <ListStyle>
                        {keywordList.map((text, index) => (
                            <ListButtonStyle
                                key={index}
                                onClick={listButtonClick}
                            >
                                {text}
                            </ListButtonStyle>
                        ))}
                    </ListStyle>
                </DropBoxStyle>
            </BoxStyle>
            <SearchIconStyle
                move={clickBar[0]}
                src={searchIcon}
                onClick={goSearch}
            />
        </SearchBarStyle>
    );
}

function Header() {
    const [clickBar, setClickBar] = useState([false, false]);
    return (
        <div>
            <HeaderStyle click={clickBar[0] || clickBar[1]}>
                <LeftHeaderStyle>
                    <Link to="/">
                        <LogoStyle
                            src={logo}
                            alt="logo"
                            onClick={() => {
                                setClickBar([false, false]);
                            }}
                        />
                    </Link>
                    <MenuStyle move={clickBar[1]}>
                        <TextLinkStyle
                            to="/lectures"
                            onClick={() => {
                                setClickBar([false, false]);
                            }}
                        >
                            강의
                        </TextLinkStyle>
                        <TextLinkStyle
                            to="/roadmaps"
                            onClick={() => {
                                setClickBar([false, false]);
                            }}
                        >
                            로드맵
                        </TextLinkStyle>
                        <TextLinkStyle
                            to="/playlist"
                            onClick={() => {
                                setClickBar([false, false]);
                            }}
                        >
                            <PlayImgStyle src={playIcon} />
                        </TextLinkStyle>
                    </MenuStyle>
                </LeftHeaderStyle>
                <RightHeaderStyle>
                    <MobileBarStyle>
                        {clickBar[0] || clickBar[1] ? (
                            <span>
                                <SearchIconStyle
                                    src={closeIcon}
                                    onClick={() => {
                                        setClickBar([false, false]);
                                    }}
                                />
                            </span>
                        ) : (
                            <span>
                                <SearchIconStyle
                                    src={searchIcon}
                                    onClick={() => {
                                        setClickBar([true, false]);
                                    }}
                                />
                                <SearchIconStyle
                                    src={menuIcon}
                                    onClick={() => {
                                        setClickBar([false, true]);
                                    }}
                                />
                            </span>
                        )}
                    </MobileBarStyle>
                    <SearchBar clickBar={clickBar} setClickBar={setClickBar} />
                    <IsLogined clickBar={clickBar} setClickBar={setClickBar} />
                </RightHeaderStyle>
            </HeaderStyle>
            <MobileMarginStyle />
        </div>
    );
}

export default Header;

const MobileMarginStyle = styled.div`
    @media screen and (max-width: 768px) {
        height: 65px;
    }
`;
const HeaderStyle = styled.div`
    box-shadow: 0px 4px 8px 0px #0000001a;
    background-color: #fbfbfb;
    display: flex;
    width: 90%;
    max-width: 1296px; /* calc(1440px * 0.9); */
    height: 65px;
    padding: 0px 5% 0px 5%;
    margin: auto;
    @media screen and (min-width: 1440px) {
        padding: 0 calc(50% - 648px);
    }
    @media screen and (max-width: 768px) {
        box-shadow: 0px 4px 8px 0px #0000001a;
        background-color: #fbfbfb;
        position: fixed;
        width: calc(100% - 30px);
        padding: 0px 20px 0px 10px;
        min-width: 230px;
        padding-bottom: ${props => (props.click ? '100vh' : '0')};
        z-index: 2;
        /* z-index: ${props => (props.click ? '10000' : '')}; */
    }
`;

const LeftHeaderStyle = styled.div`
    display: flex;
    min-width: 290px;
    /* '플레이'면 330px */
    z-index: 1;
`;

const LogoStyle = styled.img`
    margin-top: 15px;
    flex-direction: right;
    padding: 10px 10px 7px 10px;
`;

const MenuStyle = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        display: ${props => (props.move ? '' : 'none')};
        margin-top: 130px;
        position: absolute;
        left: 20px;
        flex-direction: column;
        align-items: flex-start;
        font-weight: 500;
        font-size: 20px;
    }
`;

const TextLinkStyle = styled(Link)`
    padding: 10px 10px;
    @media screen and (max-width: 768px) {
        margin-top: 10px;
    }
`;

const PlayImgStyle = styled.img`
    height: 24px;
    width: 38.4px;
    margin-top: 3px;
    padding: 0px;
`;

const RightHeaderStyle = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
    width: calc(100% - 232px);
    justify-content: flex-end;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        right: 20px;
        width: calc(100% - 40px);
        height: 62px;
    }
`;

const MobileBarStyle = styled.div`
    @media screen and (min-width: 769px) {
        display: none;
    }
    margin-top: 15px;
    /* margin-bottom: 10px; */
    text-align: right;
    margin-bottom: 25px;
`;

const SearchBarStyle = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 10px);
    justify-content: flex-end;
    position: relative;
    @media screen and (max-width: 768px) {
        position: absolute;
        left: 0px;
        width: 100vw;
        display: ${prop => (prop.open ? '' : 'none')};
    }
`;

const BoxStyle = styled.div`
    max-width: 362px;
    width: calc(100% - 20px);
    position: absolute;
    top: -7px;
    border-radius: 8px;
    margin-right: 18px;

    &:focus-within {
        border: #0054fd solid 1px;
        box-shadow: 0px 4px 8px 0px #0000001a;
        background-color: white;
    }
    @media screen and (max-width: 768px) {
        border: #0054fd solid 1px;
        left: 0px;
        min-width: 220px;
        width: calc(100% - 40px);
        max-width: 100vw;
        box-shadow: 0px 4px 8px 0px #0000001a;
        background-color: white;
    }
    z-index: 1001;
`;

const SearchBoxStyle = styled.input`
    max-width: 302px;
    width: calc(100% - 62px);
    padding: 10px 40px 11px 20px;
    border-radius: 8px;
    height: 15px;
    border: #dddddd solid 1px;

    &:focus,
    ${BoxStyle}:focus-within & {
        padding: 10px 42px 11px 22px;
        border-radius: 8px;
        width: calc(100% - 66px);
        border: none;
        outline: none;
        box-shadow: 1px #0054fd;
    }

    @media screen and (max-width: 768px) {
        padding: 10px 42px 11px 22px;
        border-radius: 8px;
        border: none;
        outline: none;
        width: calc(100% - 66px);
        max-width: 100%;
        box-shadow: 1px #0054fd;
    }
`;

const DropBoxStyle = styled.div`
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    border-top: solid 1px #d0d0d0;
    width: calc(100% - 32px);
    margin: 0px 16px 0px 16px;
    padding-top: 11px;
    top: 38px;
    display: none;
    align-items: flex-start;
    ${BoxStyle}:focus-within & {
        display: block;
    }
    @media screen and (max-width: 768px) {
        display: block;
    }

    /* 세로깨짐방지 */
    max-height: 90vh;
    overflow-y: auto;
`;

const ListStyle = styled.div`
    font-size: 14px;
    line-height: 20px;
    color: #7a7a7a;
    text-align: ${props => (props.center ? 'center' : 'left')};
    font-weight: 400;
    padding: 8px 0 13px 0;
`;

const ListButtonStyle = styled.button`
    background: #e7e7e7;
    border-radius: 20px;
    padding: 6px 10px;
    border: none;
    /* height: 28px; */
    font-size: 12px;
    line-height: 17px;
    margin: 0 8px 3px 0;
    cursor: pointer;
    &:hover {
        background-color: #d0d0d0;
    }
`;

const SearchIconStyle = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
    position: relative;
    right: 30px;
    cursor: pointer;
    z-index: 1002;
    vertical-align: middle;
    ${SearchBoxStyle}:focus & {
        border: #dddddd solid 1px;
        display: none;
    }
    @media screen and (max-width: 768px) {
        display: inline-block;
        right: 0px;
        margin-left: 8px;
        padding: 3px;
        transform: ${props => (props.move ? 'translate(-50px, -3px)' : '')};
    }
`;
