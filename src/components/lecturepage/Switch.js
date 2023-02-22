import { useEffect, useState } from 'react';
import styled from 'styled-components';

// 버튼
function SwitchButton({ name, id, text, object }) {
    // URL 쿼리스트링 추가삭제하고 Link 이동시키는 함수
    const queryOfName = object.params.get(name);

    function offButtonClick() {
        // 1개만 선택 가능 : 정렬, 가격
        if (name === 'sort' || name === 'price') {
            object.params.set(name, id);
        }
        // 중복 선택 가능 : 난이도, 키워드
        else if (queryOfName === null) {
            // 1. 첫번째 값 추가하기 => null인 경우
            object.params.set(name, id);
        } else {
            // 2. 중복으로 값 추가하기 => 콤마 넣기
            object.params.set(name, `${queryOfName},${id}`);
        }
        object.params.delete('page');
        object.navigator(`${object.url.pathname}?${object.params.toString()}`, {
            replace: true,
        });
    }

    function onButtonClick() {
        // 1개만 선택 가능 : 정렬, 가격
        if (name === 'sort' || name === 'price') {
            object.params.delete(name);
            // 중복 선택 가능 : 난이도, 키워드
        } else if (queryOfName === id) {
            // 1. 마지막 값 제거하기
            object.params.delete(name);
        } else {
            // 콤마 지우기 까다로워서 문자열 변환후 파싱할게요~
            const queryOfArray = queryOfName.split(',');
            // 2. 중복선택된 값 제거하기 => 콤마 빼기
            object.params.set(
                name,
                queryOfArray.filter(element => element !== id).join(),
            );
        }
        object.params.delete('page');
        object.navigator(`${object.url.pathname}?${object.params.toString()}`, {
            replace: true,
        });
    }

    const onButton = (
        <SwitchButtonStyle
            borderColor="#0054FD"
            textColor="#0054FD"
            backgroundColor="#E6EEFF"
            onClick={onButtonClick}
        >
            {text}
        </SwitchButtonStyle>
    );

    const offButton = (
        <SwitchButtonStyle
            borderColor="#7A7A7A"
            textColor="#000000"
            backgroundColor="#FFFFFF"
            back
            onClick={offButtonClick}
        >
            {text}
        </SwitchButtonStyle>
    );

    return (
        <div>
            {queryOfName
                ? name === 'sort' || name === 'price'
                    ? queryOfName === id
                        ? onButton
                        : offButton
                    : queryOfName.includes(id)
                    ? onButton
                    : offButton
                : offButton}
        </div>
    );
}

// 직접입력 버튼
function CustomButton({ text, object }) {
    // URL 쿼리스트링 추가삭제하고 Link 이동시키는 함수
    const queryOfName = object.params.get('price');
    const notCustomIds = [
        null,
        '0,0',
        '1,50000',
        '50001,100000',
        '100001,150000',
        '150001,10000000',
    ];
    const isCustom = !notCustomIds.includes(queryOfName);
    const [open, setOpen] = useState(isCustom);
    const [customPrice, setCustomPrice] = useState(
        queryOfName === null
            ? [0, 0]
            : [queryOfName.split(',')[0], queryOfName.split(',')[1]],
    );
    useEffect(() => {
        // console.log('커스텀 버튼 리렌더링');
        setOpen(isCustom);
        setCustomPrice(
            queryOfName === null
                ? [0, 0]
                : [queryOfName.split(',')[0], queryOfName.split(',')[1]],
        );

        if (isCustom) {
            document.querySelector('input[id="minPrice"]').value = '';
            document.querySelector('input[id="maxPrice"]').value = '';
        }
    }, [queryOfName]);

    const customButton = (
        <SwitchButtonStyle
            borderColor={isCustom ? '#0054FD' : '#7A7A7A'}
            textColor={isCustom ? '#0054FD' : '#000000'}
            backgroundColor={isCustom ? '#E6EEFF' : '#FFFFFF'}
            back={!isCustom}
            onClick={() => {
                if (isCustom && open) {
                    object.params.delete('price');
                    object.params.delete('page');
                    object.navigator(
                        `${object.url.pathname}?${object.params.toString()}`,
                        {
                            replace: true,
                        },
                    );
                }
                setOpen(!open);
            }}
        >
            {text}
        </SwitchButtonStyle>
    );

    function applyButtonClick() {
        const minPrice = Number(
            // 가격 입력을 안하면 기존에 있던 값(placeholder)으로
            document.querySelector('input[id="minPrice"]').value === ''
                ? document.querySelector('input[id="minPrice"]').placeholder
                : document.querySelector('input[id="minPrice"]').value,
        );
        const maxPrice = Number(
            document.querySelector('input[id="maxPrice"]').value === ''
                ? document.querySelector('input[id="maxPrice"]').placeholder
                : document.querySelector('input[id="maxPrice"]').value,
        );
        // input의 min max로는 완벽하게 막지를 못하니 직접 체크
        // 예외처리
        if (
            minPrice >= 0 &&
            maxPrice >= 0 &&
            minPrice <= maxPrice &&
            minPrice <= 10000000 &&
            maxPrice <= 10000000
        ) {
            // console.log('범위안이네요!!');
            if (queryOfName === `${minPrice},${maxPrice}`) {
                alert('가격 범위를 변경해주세요');
            } else {
                object.params.set('price', `${minPrice},${maxPrice}`);

                object.params.delete('page');
                object.navigator(
                    `${object.url.pathname}?${object.params.toString()}`,
                    {
                        replace: true,
                    },
                );
            }
        } else {
            alert('가격 범위를 다시 확인해주세요');
        }
    }

    return (
        <div>
            {customButton}
            {open ? (
                <span>
                    <CustomInputBoxStyle
                        id="minPrice"
                        type="number"
                        min="0"
                        max="10000000"
                        step="5000"
                        placeholder={customPrice[0]}
                    />{' '}
                    부터{' '}
                    <CustomInputBoxStyle
                        id="maxPrice"
                        type="number"
                        min="0"
                        max="10000000"
                        step="5000"
                        placeholder={customPrice[1]}
                    />{' '}
                    <ApplyButtonStyle
                        borderColor="#0054FD"
                        textColor="#0054FD"
                        backgroundColor="#E6EEFF"
                        onClick={applyButtonClick}
                    >
                        적용
                    </ApplyButtonStyle>
                </span>
            ) : null}
        </div>
    );
}

function Switch({ name, text, icon, elements, object }) {
    const buttons = elements.map(element => (
        <div key={element.id}>
            <SwitchButton
                id={element.id}
                name={name}
                text={element.text}
                object={object}
            />
        </div>
    ));

    return (
        <SwitchStyle>
            <LeftStyle>
                <IconImgStyle src={icon} />{' '}
                <SwitchNameStyle>{text}</SwitchNameStyle>
            </LeftStyle>
            <ButtonsStyle>
                {buttons}{' '}
                {name === 'price' ? (
                    <CustomButton text="직접입력" object={object} />
                ) : null}
            </ButtonsStyle>
        </SwitchStyle>
    );
}





export default Switch;

const SwitchButtonStyle = styled.button`
    border: 1.5px solid ${props => props.borderColor};
    background: ${props => props.backgroundColor};
    border-radius: 100px;
    width: 100px;
    height: 36px;
    padding: 2px 0 6px;
    margin-right: 6px;
    margin-bottom: 3px;
    cursor: pointer;
    color: ${props => props.textColor};
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    &:hover {
        background-color: ${props => (props.back ? '#f5f5f5' : null)};
    }
`;

const SwitchStyle = styled.div`
    display: flex;
`;

const LeftStyle = styled.span`
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    /* width: 110px; */
    margin-right: 20px;
    min-width: 100px;
`;

const ButtonsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const IconImgStyle = styled.img`
    height: 24px;
    width: 24px;
    left: 5px;
    margin-right: 4px;
    padding-left: 17px;
`;

const SwitchNameStyle = styled.span`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
`;

const CustomInputBoxStyle = styled.input`
    border-radius: 0px;
    width: 77px;
    border-radius: 8px;
    padding: 2px 10px 6px;
    height: 24px;
    /* z-index: 1; */
    border: 1.5px solid #7a7a7a;
    &:focus {
        border: solid 1.5px #0054fd;
        outline: none;
    }
    position: relative;
    top: -1px;
    z-index: 0;
`;

const ApplyButtonStyle = styled.button`
    border: none;
    background-color: #e7e7e7;
    &:hover {
        background-color: #d0d0d0;
    }
    border-radius: 8px;
    width: 52px;
    height: 34px;
    position: relative;
    top: 1px;
    margin-left: 3px;
    padding: 0px 0px 3px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
`;
