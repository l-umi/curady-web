import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import plusIcoan from '../images/plusIcon30.png';
import Modal from '../components/modal/YesNoModal';
import { userAuthState } from '../data/User';

function RoadmapPost() {
    const [plusCount, setPlusCount] = useState([]);
    const [modalopen, setModalopen] = useState(false);
    const userAuth = useRecoilValue(userAuthState);
    const nav = useNavigate();
    if (userAuth[0] === false) {
        return <NotFound />;
    }
    return (
        <EditProfileStyle>
            {modalopen ? (
                <Modal
                    setModalopen={setModalopen}
                    titleText="로드맵 등록"
                    innerText="로드맵을 등록하시겠습니까?"
                    yesFunction={() => {
                        nav('/roadmaps');
                    }}
                />
            ) : null}
            <TitleStyle>
                <BoldStyle>나만의 로드맵</BoldStyle>을 알려주세요
            </TitleStyle>
            <MarginStyle margin="0 0 24px 0">
                ‘로드맵 등록’을 요청하시면, 확인 후 1~3일 내 업로드됩니다.
            </MarginStyle>
            <MarginStyle margin="0 0 10px 0">
                <div>제목</div>
                <InputStyle
                    placeholder="큐레디님이 추천하는 <CS전공지식 노트>"
                    name="roadmapName"
                />
            </MarginStyle>
            <div>강의 URL</div>
            {plusCount.length ? (
                <div>
                    {plusCount.map(e => (
                        <InputStyle
                            placeholder="yotube.com/watch?v=curady"
                            name="roadmapName"
                        />
                    ))}
                </div>
            ) : null}
            <ShortInputStyle
                placeholder="yotube.com/watch?v=curady"
                name="roadmapName"
            />
            <PlusButtonStyle onClick={() => setPlusCount([...plusCount, 0])}>
                <img src={plusIcoan} alt="" />
            </PlusButtonStyle>
            <div>사진</div>
            <RoundButtonStyle color="white" name="image">
                <input type="file" />
            </RoundButtonStyle>
            <MarginStyle margin="0 0 10px 0">
                <div>추천 키워드</div>
                <InputStyle
                    placeholder="#운영체제 #네트워크 #CS지식 #면접"
                    name="keyword"
                />
            </MarginStyle>
            <MarginStyle margin="0 0 10px 0">
                <div>한줄 소개</div>
                <InputStyle
                    placeholder="필요한 CS지식을 하나로 : 디자인 패턴, 네트워크, 운영체제, 데이터베이스, 자료 구조"
                    name="roadmapInfo"
                />
            </MarginStyle>
            <div>설명</div>
            <LongInputStyle
                placeholder="기술 면접을 준비하는 사람들에게 매우 추천하는 강의들입니다.&#13;&#10;좋았던 점&#13;&#10;- 면접에 필요한 Computer Science 지식을 쉽고 빠르게 공부할 수 있어 시간을 절약할 수 있습니다&#13;&#10;- 최신 기출 문제 또한 포함되어 있어 유용합니다"
                name="description"
            />
            {/* <ErrorStyle>요청핫긴</ErrorStyle> */}
            <AsideStlye>
                로드맵의 제목과 강의 URL은 필수 정보이며, 나머지는 선택
                사항입니다.
                <br />
                요청하신 내용은 일부 수정되어 업로드 될 수 있으며 요청이 거절될
                수 있습니다.
                <br />
                기타 문의 사항은 이메일 curady13@gmail.com로 보내주시길
                바랍니다. 감사합니다.
            </AsideStlye>
            <ButtonStyle color="blue" onClick={() => setModalopen(true)}>
                등록 요청
            </ButtonStyle>
        </EditProfileStyle>
    );
}

export default RoadmapPost;

const EditProfileStyle = styled.div`
    width: 86vw;
    margin: 64px auto 96px auto;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    min-height: calc(100vh - 327px);
    width: 520px;
    font-size: 16px;
    line-height: 23px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    line-height: 35px;
    margin-bottom: 12px;
`;

const BoldStyle = styled.span`
    font-weight: 700;
`;

const MarginStyle = styled.div`
    margin: ${props => props.margin};
`;

const RoundButtonStyle = styled.button`
    display: inline-block;
    width: 260px;
    height: 48px;
    color: black;
    background-color: #ffffff;
    border: solid 1px #0054fd;
    border-radius: 100px;
    padding: 6px 19px 8px 19px;
    font-weight: 500;
    line-height: 23px;
    margin-bottom: 16px;
    margin-top: 4px;
    cursor: pointer;
`;

const InputStyle = styled.input`
    margin: 4px 0 2px 0;
    border-radius: 4px;
    width: 494px;
    height: 44px;
    font-size: 14px;
    border-color: #d0d0d0;
    border-style: solid;
    border-width: 1px;
    padding-left: 12px;
    padding: 1px 12px 1px 12px;
    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const ShortInputStyle = styled.input`
    margin: 4px 0 16px 0;
    border-radius: 4px;
    width: 438px;
    height: 44px;
    font-size: 14px;
    border-color: #d0d0d0;
    border-style: solid;
    border-width: 1px;
    padding-left: 12px;
    padding: 1px 12px 1px 12px;
    margin-right: 8px;
    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const PlusButtonStyle = styled.span`
    border: solid 1px #d0d0d0;
    border-radius: 8px;
    height: 39px;
    width: 46px;
    padding: 9px 0 0px 0;
    display: inline-block;
    text-align: center;
    /* margin-top: 4px; */
    vertical-align: middle;
    cursor: pointer;
    margin-bottom: 3px;
`;
const LongInputStyle = styled.textarea`
    margin: 4px 0 12px 0;
    height: 128px;
    width: 494px;
    padding: 12px 12px 12px 12px;
    border: solid #d0d0d0 1px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
    resize: none;
    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const ButtonStyle = styled.button`
    text-align: center;
    width: 100%;
    height: 48px;
    color: white;
    background-color: #0054fd;
    border: solid 1px #ffffff;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
`;

const AsideStlye = styled.div`
    text-align: left;
    font-size: 12px;
    line-height: 17px;
    color: #0054fd;
`;
