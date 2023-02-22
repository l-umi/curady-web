import styled from 'styled-components';
import spinner from '../images/spinner_0054fd_200px.gif';

function Loading() {
    return <LoadingStyle src={spinner} alt="로딩중" />;
}

export default Loading;

const LoadingStyle = styled.img`
    background: rgba(255, 255, 255, 0.4);
    height: 100%;
    width: 100%;
    margin-top: -200px;
    padding-bottom: 274px;
    object-fit: none;
    position: fixed;
    z-index: 1;
`;
