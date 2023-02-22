import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// 재사용을 위한 모달
function YesNoModal({ setModalopen, titleText, innerText, yesFunction }) {
    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, []);
    return (
        <div>
            <BackgroundStyle />
            <ModalStyle>
                <TitleTextStyle>{titleText}</TitleTextStyle>

                <LineStyle />
                <div>
                    <InnerTextStyle>{innerText}</InnerTextStyle>
                </div>
                <div>
                    <YesButtonStyle onClick={yesFunction}>확인</YesButtonStyle>
                    <NoButtonStyle
                        onClick={() => {
                            setModalopen(false);
                        }}
                    >
                        취소
                    </NoButtonStyle>
                </div>
            </ModalStyle>
        </div>
    );
}

export default YesNoModal;
const BackgroundStyle = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1003;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalStyle = styled.div`
    overflow: auto;
    padding: 0px 19px 0px 19px;
    width: 312px;
    background: #ffffff;
    border-radius: 8px;
    border-width: 20px 0px 20px 0px;
    border-style: solid;
    border-color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1004;
    /* height: 110px; */
    max-height: 80vh;
    overflow-y: auto;
    scroll-behavior: smooth;
`;

const TitleTextStyle = styled.div`
    font-weight: 600;
    line-height: 27px;
    font-size: 20px;
`;

const InnerTextStyle = styled.span`
    line-height: 23px;
    font-size: 15px;
`;

const LineStyle = styled.div`
    width: 316px;
    border-bottom: 1px solid #d0d0d0;
    margin: 12px -2px 10px;
`;

const YesButtonStyle = styled.button`
    color: #0054fd;
    height: 32px;
    width: 50px;
    border: solid 1px #0054fd;
    background-color: #0054fd;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    margin-left: 200px;
    margin-right: 8px;
`;

const NoButtonStyle = styled.button`
    border: solid 1px #0054fd;
    width: 50px;
    height: 32px;
    color: #0054fd;
    border-radius: 8px;
    margin-top: 15px;
    background-color: white;
    cursor: pointer;
`;
