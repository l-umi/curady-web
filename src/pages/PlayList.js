import styled from 'styled-components';
import PlayItem from '../components/item/PlayItem';
import playlist from '../data/playList.json';
// 헤더 푸터 없애기?
function PlayList() {
    return (
        <SearchResultStyle>
            <ResultsStyle>
                <ItemContainerStyle id="container">
                    <PlayItem data={playlist} />
                </ItemContainerStyle>
                <div />
            </ResultsStyle>
        </SearchResultStyle>
    );
}

export default PlayList;

const SearchResultStyle = styled.div`
    padding-bottom: 100px;
    padding-top: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 410px);
    /* min-height: 400px; */
    font-size: 24px;
    font-weight: 500;
`;

const ResultsStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 86%;
    max-width: 1238.4px;
    align-items: center;
`;

const ItemContainerStyle = styled.div`
    width: 100%;
    @media screen and (max-width: 768px) {
        width: calc(100% - 10px);
        margin: 0 10px;
    }
`;
