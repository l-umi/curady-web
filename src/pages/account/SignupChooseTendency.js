import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import tendencyField from '../../data/tendencyField.json';
import tendencyLanguage from '../../data/tendencyLanguage.json';
import tendencyFeature from '../../data/tendencyFeature.json';

// 회색 박스
function ChooseBox({ selectTendency, deleteTendency, question, answer }) {
    // 박스 렌더링 왜 3번씩 되냐.. useMemo로 최적화하기
    const buttons = answer.map(a => (
        <GreyButton
            tendency={a.tendency}
            text={a.text}
            selectTendency={selectTendency}
            deleteTendency={deleteTendency}
        />
    ));
    return (
        <ChooseBoxStyle>
            <QuestionStyle>{question}</QuestionStyle>
            {buttons}
        </ChooseBoxStyle>
    );
}

// 회색 버튼
function GreyButton({ tendency, text, selectTendency, deleteTendency }) {
    const [color, setColor] = useState('#7A7A7A');

    function keywordButtonClick() {
        if (color === '#0054FD') {
            deleteTendency(tendency);
            setColor('#7A7A7A');
        } else if (selectTendency(tendency)) {
            setColor('#0054FD');
        }
    }

    return (
        <GreybuttonStyle color={color} onClick={keywordButtonClick}>
            {text}
        </GreybuttonStyle>
    );
}

function SignupChooseTendency() {
    const [info, setInfo] = useState({
        field: [],
        language: [],
        feature: [],
    });
    const nickname = new URL(window.location).searchParams.get('nickname');

    const selectTendency = tendency => {
        if (info[tendency.tendencyType].length >= 5) {
            return false;
        }
        setInfo({
            ...info,
            [tendency.tendencyType]: [...info[tendency.tendencyType], tendency],
        });
        return true;
    };
    const deleteTendency = tendency => {
        const newArray = info[tendency.tendencyType].filter(
            t => t !== tendency,
        );
        setInfo({ ...info, [tendency.tendencyType]: newArray });
    };
    const handleEnter = e => {
        if (e.key === 'Enter') {
            alert('소중한 의견 감사합니다!');
            e.target.value = '';
        }
    };

    return (
        <SignupChooseTendencyStyle>
            <TitleStyle>
                {nickname === null ? '' : `${nickname}님`} 환영해요!
                <div />
                어떤 것을 배우고 싶으신가요?
            </TitleStyle>
            <TextStyle>
                당신에 대해 더 알고 싶어요.
                <div />세 가지 모두 대답해 주셔야 CURADY를 이용하실 수 있습니다.
            </TextStyle>
            <ChooseBox
                selectTendency={selectTendency}
                deleteTendency={deleteTendency}
                question="어떤 분야에 관심이 있으신가요? (최대 5개 선택)"
                answer={tendencyField}
            />
            <ChooseBox
                selectTendency={selectTendency}
                deleteTendency={deleteTendency}
                question="선호하는 프로그래밍 언어는 무엇인가요? (최대 5개 선택)"
                answer={tendencyLanguage}
            />
            <ChooseBox
                selectTendency={selectTendency}
                deleteTendency={deleteTendency}
                question="강의에서 어떤 성향을 우선으로 생각하나요? (최대 5개 선택)"
                answer={tendencyFeature}
            />

            <SuggestionBox
                type="text"
                onKeyPress={handleEnter}
                placeholder="본인의 취향이 없다면 의견을 남겨주세요"
            />
            <Link
                to={
                    nickname === null
                        ? `/signup/enterinformation`
                        : `/signup/enterinformation?nickname=${nickname}`
                }
                state={{
                    info: {
                        requestTendencies: [
                            ...info.field,
                            ...info.language,
                            ...info.feature,
                        ],
                    },
                }}
            >
                <ButtonStyle>다음 (1/2)</ButtonStyle>
            </Link>
        </SignupChooseTendencyStyle>
    );
}

export default SignupChooseTendency;

const SignupChooseTendencyStyle = styled.div`
    margin-bottom: 64px;
    width: 480px;
    height: 773px;
    position: relative;
    margin-top: 50px;
    left: 50%;
    margin-left: -240px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 8px;
    line-height: 35px;
`;

const TextStyle = styled.div`
    font-size: 14px;
    height: 40px;
    line-height: 20px;
    margin-bottom: 28px;
`;

const ChooseBoxStyle = styled.div`
    width: 480px;
    background: #f5f5f5;
    margin-bottom: 12px;
    padding: 10px 10px 10px 10px;
    border-radius: 5px;
`;

const QuestionStyle = styled.div`
    padding: 2px 0px 2px 6px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
`;
const GreybuttonStyle = styled.button`
    height: 32px;
    border-radius: 36px;
    border: solid 1px;
    border-color: ${props => props.color};
    color: ${props => props.color};
    background-color: white;
    padding: 0px 13px 0px 13px;
    margin: 5px 3px 2px 2px;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
`;

const SuggestionBox = styled.input`
    width: 480px;
    height: 40px;
    position: relative;
    left: 50%;
    margin-left: -240px;
    padding: 10px 0px 10px 20px;
    border-radius: 8px;
    height: 15px;
    border-color: #dddddd;
    border-style: solid;
    border-width: 1px;
    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const ButtonStyle = styled.button`
    width: 502px;
    height: 48px;
    border-radius: 4px;
    margin-top: 32px;
    border-style: none;
    font-size: 16px;
    color: #ffffff;
    background: #0054fd;
    cursor: pointer;
`;
