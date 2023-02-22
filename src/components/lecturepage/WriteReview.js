import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import close from '../../images/close.png';
import checkedIcon from '../../images/radio_button_checked.png';
import uncheckedIcon from '../../images/radio_button_unchecked.png';

function Checkbox({ onClick, id, text }) {
    return (
        <CheckboxStyle>
            <LabelStyle htmlFor={id}>{text}</LabelStyle>
            <InputStyle
                onClick={onClick}
                type="checkbox"
                src={checkedIcon}
                id={id}
                value={id}
            />
        </CheckboxStyle>
    );
}

function WriteReview({ lectureId, userAuth, registerReview }) {
    // 1. body 스크롤 금지, 키워드 목록 조회
    const [checkboxs, setCheckboxs] = useState([]);
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        // axios
        //     .get(`review-service/keywords`)
        //     .then(response => {
        //         setCheckboxs(response.data);
        //     })
        //     .catch(() => {
        //         // 인증 실패
        //     });
        return () => (document.body.style = `overflow: auto`);
    }, []);

    // 2. 키워드 선택
    const [keywordIds, setKeywordIds] = useState([]);
    const clickCheckbox = e => {
        if (e.target.checked) {
            if (keywordIds.length < 5) {
                setKeywordIds([...keywordIds, e.target.id]);
            } else {
                e.target.checked = false;
            }
        } else {
            setKeywordIds(keywordIds.filter(el => el !== e.target.id));
        }
    };
    const Checkboxs = checkboxs.map(el => (
        <Checkbox
            onClick={clickCheckbox}
            key={el.id}
            id={el.id}
            text={el.content}
        />
    ));

    // 3. 텍스트 작성
    const [content, setContent] = useState('');
    const onSubmit = e => {
        e.target.disabled = true;
        // axios
        //     .post(
        //         '/review-service/auth/review',
        //         {
        //             lectureId,
        //             content,
        //             keywordIds,
        //         },
        //         { headers: { 'X-AUTH-TOKEN': userAuth[1] } },
        //     )
        //     .then(() => {
        //         registerReview(true);
        //     })
        //     .catch(() => {
        //         alert('리뷰 작성에 실패했습니다');
        //         e.target.disabled = false;
        //     });
    };

    return (
        <WriteReviewStyle>
            <BackgroundStyle />
            <ModalStyle>
                <TopStyle>
                    <BoldText font="20px">리뷰 작성</BoldText>
                    <XButtonStyle
                        src={close}
                        onClick={() => {
                            registerReview(false);
                        }}
                    />
                </TopStyle>
                <LineStyle />
                <BoldText font="16px">
                    1. 어떤점을 느꼈나요? (최대 5개 선택)
                </BoldText>
                <CheckboxContainerStyle>{Checkboxs}</CheckboxContainerStyle>
                <BoldText font="16px">
                    2. 리뷰를 자유롭게 작성해주세요.
                </BoldText>
                <br />
                <TextInputStyle
                    value={content}
                    onChange={e => {
                        setContent(e.target.value);
                    }}
                    placeholder="강의를 수강하면서 좋았던 점과 아쉬웠던 점을 미래에 이 강의를 수강하실 분들을 위해 자유롭게 남겨주세요."
                />

                {content ? (
                    <ButtonStyle
                        color="#0054FD"
                        cursor="pointer"
                        onClick={onSubmit}
                    >
                        <BoldText font="16px">등록하기</BoldText>
                    </ButtonStyle>
                ) : (
                    <ButtonStyle color="#7A7A7A">
                        <BoldText font="16px">등록하기</BoldText>
                    </ButtonStyle>
                )}
            </ModalStyle>
        </WriteReviewStyle>
    );
}

export default WriteReview;

const WriteReviewStyle = styled.div``;
const BackgroundStyle = styled.div`
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100vw;
    margin-top: -200px;
    padding-bottom: 274px;
    object-fit: none;
    position: fixed;
    z-index: 1003;
`;

const ModalStyle = styled.div`
    overflow: auto;
    padding: 20px 19px 18px 19px;
    width: 312px;
    background: #ffffff;
    border-radius: 8px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1004;
    max-height: 90%;
    overflow-y: auto;
`;

const TopStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 23px;
`;

const BoldText = styled.span`
    font-size: ${props => props.font};
    font-weight: 700;
    text-align: left;
    line-height: 23px;
`;

const XButtonStyle = styled.img`
    width: 20px;
    height: 20px;
    right: 0%;
    border: none;
    cursor: pointer;
    margin: 20px 1px;
`;

const LineStyle = styled.div`
    width: 316px;
    border-bottom: 1px solid #d0d0d0;
    margin: 12px -2px 16px;
`;

const CheckboxContainerStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-bottom: 20px;
`;

const CheckboxStyle = styled.div`
    height: 23px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    align-items: center;
`;

const LabelStyle = styled.label`
    font-size: 16px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const InputStyle = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    background: url(${uncheckedIcon});
    &:checked {
        background: url(${checkedIcon});
    }
    /* reset.css에서 border가 기본값이라서 제거 */
    &:focus {
        border: none;
    }
    cursor: pointer;
`;

const TextInputStyle = styled.textarea`
    resize: none;
    padding: 8px 7px;
    height: 79px;
    width: 300px;
    margin: 12px 0 0 -2px;
    border: solid #b7b7b7 1px;
    border-radius: 4px;

    ::placeholder {
        color: #b7b7b7;
    }
    font-size: 13px;
    line-height: 17px;
`;

const ButtonStyle = styled.button`
    width: 320px;
    height: 48px;
    border: none;
    border-radius: 4px;
    outline: none;
    color: #ffffff;
    margin-top: 20px;
    margin-left: -4px;
    background: ${props => props.color};
    cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
