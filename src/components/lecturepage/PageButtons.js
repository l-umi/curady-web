import styled from 'styled-components';
import MyReviews from '../MyReviews';

function PageButtons({ current, total, object }) {
    const buttonStartNumber = 1 + 6 * Math.floor((current - 1) / 6);
    // 공식! array안에 1이 없으면 1 < 버튼 생성, total이 없으면 > 끝 버튼 생성
    const array = [];
    for (
        let i = buttonStartNumber;
        i <= total && i < buttonStartNumber + 6;
        i += 1
    ) {
        array.push(i.toString());
    }

    function goPage(e) {
        if (e.target.innerHTML === '1') {
            object.params.delete('page');
        } else {
            object.params.set('page', e.target.innerHTML);
        }
        object.navigator(`${object.url.pathname}?${object.params.toString()}`);
    }

    function goBack() {
        object.params.set('page', buttonStartNumber - 6);
        object.navigator(`${object.url.pathname}?${object.params.toString()}`);
    }

    function goNext() {
        object.params.set('page', buttonStartNumber + 6);
        object.navigator(`${object.url.pathname}?${object.params.toString()}`);
    }

    if (total === '0') {
        return <div />;
    }
    return (
        <PageButtonsStyle>
            {array.includes('1') ? (
                <span />
            ) : (
                <span>
                    <PageButtonStyle color="#7A7A7A" onClick={goPage}>
                        1
                    </PageButtonStyle>
                    <PageButtonStyle onClick={goBack}> {`<`} </PageButtonStyle>
                </span>
            )}
            {array.map(a => (
                <PageButtonStyle
                    key={a}
                    color={a === current ? '#0054FD' : '#7A7A7A'}
                    onClick={goPage}
                >
                    {a}
                </PageButtonStyle>
            ))}
            {array.includes(total) ? (
                <span />
            ) : (
                <span>
                    <PageButtonStyle onClick={goNext}>{`>`}</PageButtonStyle>
                    <PageButtonStyle color="#7A7A7A" onClick={goPage}>
                        {total}
                    </PageButtonStyle>
                </span>
            )}
        </PageButtonsStyle>
    );
}

export default PageButtons;

const PageButtonsStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
`;

const PageButtonStyle = styled.button`
    width: 36px;
    height: 36px;
    background-color: white;
    color: ${props => props.color};
    cursor: pointer;
    border: 1px solid ${props => props.color};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    border-radius: 4px;
    margin-left: 6px;
    margin-right: 6px;
    margin-bottom: 5px;
`;
