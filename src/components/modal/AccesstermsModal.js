import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
// 이용약관, 개인정보 수집 및 이용, 개인정보 제공 내용에 관한 내용을 담은 모달
function AccesstermsModal({ setModalopen }) {
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
                    <TitleTextStyle>이용약관</TitleTextStyle>
                    <SubTextStyle>
                        환영합니다. 큐레디를 방문해 주셔서 감사합니다. 다양한
                        큐레디의 서비스를 즐겨보세요.
                        <br />
                        회원으로 가입하시면 보다 편리하게 이용할 수 있습니다.{' '}
                        <BlueStyle>
                            언제든지 서비스 이용계약을 해지하실 수 있습니다.
                        </BlueStyle>
                        <br /> 서비스 이용과 관련하여 몇 가지 주의사항이
                        있습니다. 이와 관련하여 합리적인 절차를 준수해주시길
                        바랍니다.
                        <br />
                        큐레디 서비스와 관련하여 궁금하신 사항이 있으시면{' '}
                        <BlueStyle>curady13@gmail.com</BlueStyle>로 문의 주시기
                        바랍니다.
                        <br />
                    </SubTextStyle>
                    <br />
                    <TitleTextStyle>개인정보 수집 및 이용</TitleTextStyle>
                    <SubTextStyle>
                        큐레디는 기획부터 종료까지 개인정보보호법 등 국내의
                        개인정보 보호 법령을 철저히 준수합니다. 또한 OECD의
                        개인정보 보호 가이드라인 등 국제 기준을 준수하여
                        서비스를 제공합니다.
                        <br />
                        <BlueStyle>수집하는 개인정보</BlueStyle> <br />
                        회원 가입 시에 ‘이메일, 비밀번호, 닉네임’을 필수항목으로
                        수집합니다.
                        <br />
                        이용자가 추천, 리뷰 작성, 좋아요 등과 같이 개인화 혹은
                        회원제 서비스를 이용하기 위해 회원가입을 할 경우, 필요한
                        최소한의 개인정보를 수집합니다. 이용자는 회원가입을 하지
                        않아도 정보 검색, 보기 등 일부 서비스를 회원과 동일하게
                        이용할 수 있습니다.
                        <br />
                        <BlueStyle>수집한 개인정보의 이용</BlueStyle>
                        <br />
                        서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한
                        통계, 데이터 분석 및 통계에 따른 맞춤 서비스 제공 및
                        서비스 개선 등에 개인정보를 이용합니다.
                        <br />
                    </SubTextStyle>
                    <br />
                    <TitleTextStyle>개인정보 제공 내용</TitleTextStyle>
                    <SubTextStyle>
                        큐레디는 정보주체의 동의 혹은 법률의 특별한 규정 등에
                        해당하지 않는 경우를 제외하고, 개인정보를 제3자에게
                        제공하지 않습니다.
                        <br />
                        큐레디는 이용자가 안전하게 서비스를 이용할 수 있도록
                        이용자의 개인정보 보호를 위한 보안을 준수하고 있으며,
                        개인정보의 취급위탁은 하지 않고 있습니다.
                        <br />
                        <br />
                        <BlueStyle>유의사항</BlueStyle> <br />
                        회원은 사이트가 공지한 사항들을 준수하여야 하며, 사이트
                        내 허위 정보를 기재하여서는 안 됩니다. <br /> 타인을
                        모욕하거나 타인의 권리를 침해하는 행동은 안 됩니다.{' '}
                        서비스 업무에 방해되는 행위 혹은 기타 부당한 행위를
                        하여서는 안 됩니다. 저작권법 등 관련 법률에 따라
                        허용되는 범위를 벗어나는 행동에 주의가 필요합니다.
                        <Link to="/helps">
                            <DetailButton> 자세히 보기 </DetailButton>
                        </Link>
                    </SubTextStyle>
                </div>
            </ModalStyle>
        </div>
    );
}

export default AccesstermsModal;

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

const DetailButton = styled.button`
    float: right;
    border: none;
    color: rgb(134, 142, 150);
    margin-top: 15px;
    background-color: white;
    cursor: pointer;
`;
