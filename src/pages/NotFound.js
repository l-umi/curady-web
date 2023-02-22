import styled from 'styled-components';
// 헤더 푸터 없애기?
function NotFound() {
    return (
        <NotFoundStyle>
            {/* 
                URL 주소가 잘못 입력되었거나 변경되어  */}
            잘못된 주소이거나, 로그인이 필요합니다
            {/* 존재하지 않는 페이지입니다 */}
        </NotFoundStyle>
    );
}

export default NotFound;
const NotFoundStyle = styled.div`
    padding-top: 120px;
    font-size: 24px;
    padding-bottom: 100px;
    line-height: 30px;
    text-align: center;
    min-height: calc(100vh - 460px);
    font-weight: 500;
`;
