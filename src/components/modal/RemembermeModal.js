import styled from 'styled-components';
import logo from '../../logo.svg';

// 로그인 상태 유지에 관한 내용을 담은 모달
function RemembermeModal({ setModalopen }) {
    return (
        <div>
            <BackgroundStyle
                onClick={() => {
                    setModalopen(false);
                }}
            />
            <ModalStyle>
                <div>
                    <LogoStyle src={logo} alt="logo" />
                </div>
                <LineStyle />
                <div>
                    {' '}
                    <TitleTextStyle>
                        ‘로그인 상태 유지’가 무엇인가요?
                    </TitleTextStyle>
                    <SubTextStyle>
                        매번 아이디와 비밀번호를 입력하지 않고 편리하게 로그인
                        상태를 유지할 수 있는 기능입니다.
                        <BrStyle />
                        ‘로그인 상태 유지’를 선택하고 로그인을 완료하면{' '}
                        <BlueStyle>
                            직접 로그아웃을 누르기 전까지 계속 로그인 상태가
                            유지됩니다.
                        </BlueStyle>
                        <BrStyle />
                        ‘로그인 상태 유지’를 선택하지 않고 로그인을 완료하면{' '}
                        페이지 새로고침 시 혹은 30분 후 자동으로 로그아웃이
                        됩니다.
                        <BrStyle />
                        <BlueStyle>
                            로그인 후, 로그인 상태 유지를 해제하려면 어떻게
                            하나요?
                        </BlueStyle>
                        <br />- 직접 로그아웃 버튼을 눌러주거나
                        <br />- 폰으로 접속해 다시 로그인해주세요.
                        <br />
                        <BrStyle />
                        다음의 경우, 로그인 상태 유지는 해제됩니다.
                        <br />- 다른 곳에서 로그인을 한 경우
                        <br />- 브라우저의 쿠키를 삭제하는 경우
                        <br />- 일주일 동안 사이트를 방문하지 않은 경우
                        <br />
                        - 동일한 기기와 브라우저로 접속하지 않은 경우
                        <br />
                        <BrStyle />
                        <BlueStyle>유의사항</BlueStyle>
                        <br />- 개인정보 보호를 위해 개인 기기(PC, 스마트폰
                        등)에서만 사용해주세요.
                        <br />- 브라우저에서 제공하는 ‘개인정보보호
                        브라우징(시크릿 모드)’ 상태로 이용하면 ‘로그인 상태
                        유지’ 기능을 사용할 수 없습니다.
                        <br />- 회원가입으로 진행하면 로그인 상태 유지가
                        자동으로 선택됩니다.
                    </SubTextStyle>
                </div>
            </ModalStyle>
        </div>
    );
}

export default RemembermeModal;

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
    padding: 0px 19px 18px 19px;
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
    height: 370px;
    max-height: 80vh;
    overflow-y: auto;
    scroll-behavior: smooth;
`;

const LogoStyle = styled.img`
    flex-direction: right;
    margin-top: 20px;
    margin-left: calc(50% - 74px);
    margin-bottom: 30px;
    width: 147px;
    height: 27px;
    display: block;
`;

const TitleTextStyle = styled.div`
    font-weight: 600;
    line-height: 27px;
`;

const SubTextStyle = styled.span`
    line-height: 23px;
    font-size: 15px;
`;

const LineStyle = styled.div`
    width: 316px;
    border-bottom: 1px solid #d0d0d0;
    margin: 12px -2px 16px;
`;

const BlueStyle = styled.span`
    color: #0054fd;
`;

const BrStyle = styled.div`
    margin: 12px 0 12px 0;
`;
