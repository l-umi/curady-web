import styled from 'styled-components';
import logo from '../logo.svg';

function Footer() {
    return (
        <FooterStyle>
            <InnerFooterStyle>
                <img src={logo} alt="logo" />
                <DescriptionTextStyle>
                    모든 온라인 강의 정보를 한곳에 모아놓은 CURADY에서 원하는
                    온라인 강의를 손쉽게 찾아보세요
                </DescriptionTextStyle>
                <ServiceTestStyle>서비스 관련 문의</ServiceTestStyle>{' '}
                <EmailTextStyle>curady13@gmail.com</EmailTextStyle>
            </InnerFooterStyle>
        </FooterStyle>
    );
}

export default Footer;

const FooterStyle = styled.div`
    background-color: #f5f5f5;
    height: 160px;
    display: flex;
    min-width: 280px;
`;

const InnerFooterStyle = styled.div`
    width: 90%;
    max-width: 1296px; /* calc(1440px * 0.9); */
    padding: 0px 5%;
    margin: auto;

    font-size: 16px;
    line-height: 23px;
    @media screen and (max-width: 768px) {
        width: calc(100% - 20px);
        padding: 0px 20px 0px 20px;
        font-size: 12px;
        line-height: 17px;
    }
`;
const DescriptionTextStyle = styled.div`
    font-weight: 400;
    padding-top: 0px;
    padding-bottom: 10px;
`;

const ServiceTestStyle = styled.span`
    color: #0054fd;
    font-weight: 700;
`;

const EmailTextStyle = styled.span`
    margin-left: 12px;
    font-weight: 400;
`;
