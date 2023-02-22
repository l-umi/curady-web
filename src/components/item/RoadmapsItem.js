import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import goodImg from '../../images/3d_good.png';

function RoadmapsItem({ data }) {
    return (
        <RoadmapsItemStyle>
            {data.map(d => (
                // <LinkStyle key={d.id} to="/404">
                <LinkStyle to={`/roadmap/${d.id}`} key={d.id}>
                    <ItemWrapStyle>
                        <ImgWrapStyle
                            src={
                                d.data.image === 'goodImg'
                                    ? goodImg
                                    : d.data.image
                            }
                        />

                        <ContentsStyle>
                            <div>
                                <KeywordsStyle>
                                    {d.data.keyword.map(k => (
                                        <KeywordStyle key={k}>
                                            #{k}
                                        </KeywordStyle>
                                    ))}
                                </KeywordsStyle>
                                <RoadmapNameStyle>
                                    {d.data.roadmapName}
                                </RoadmapNameStyle>
                            </div>
                            <div>
                                <ProviderNameStyle
                                    src={
                                        d.data.providers === 'curady'
                                            ? logo
                                            : `https://curady.kr/logos/${d.data.providers}.png`
                                    }
                                    alt={d.data.providers}
                                />
                                <CountProviderStyle>
                                    • {d.data.number}개 강의
                                </CountProviderStyle>
                            </div>
                        </ContentsStyle>
                    </ItemWrapStyle>
                </LinkStyle>
            ))}
        </RoadmapsItemStyle>
    );
}

export default RoadmapsItem;

const RoadmapsItemStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    width: 100%;
    margin-top: 40px;
`;

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 16px;
    // 아이템 간의 거리 20px
    @media screen and (min-width: 1025px) {
        width: calc(25% - 15px);
        height: calc((21vw - 15px) * 1.2);
        max-height: 353.51px;
        margin: 0 7.5px 20px 7.5px;
    }
    @media screen and (max-width: 1024px) {
        width: calc((100% - 40px) / 3);
        height: calc((84vw - 40px) / 3 * 1.2);
        margin: 0 5px 20px 5px;
    }
    @media screen and (max-width: 768px) {
        width: calc(50% - 10px);
        height: calc((42vw - 20px) * 1.2);
        margin: 0 5px 20px 5px;
    }
`;

// 아이템 하나를 감싸는 테두리
const ItemWrapStyle = styled.div`
    display: inline-block;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    width: 100%;
    height: 100%;
`;

const ImgWrapStyle = styled.img`
    display: inline-block;
    width: 100%;
    background-size: cover;
    height: 48.33%;
    border-radius: 8px 8px 0px 0px;
`;

const ContentsStyle = styled.div`
    text-align: left;
    padding-top: 6px;
    height: calc(51.67% - 15px);
    margin: 0 3% 0 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const KeywordsStyle = styled.div`
    height: 32px;
    overflow-y: auto;
`;

const KeywordStyle = styled.span`
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 30px;
    max-height: 30px;
    background-color: #e6eeff;
    border-radius: 8px;
    padding: 0 8px 0 8px;
    margin: 0 8px 4px 0;
`;

const RoadmapNameStyle = styled.div`
    font-weight: 400;
    text-align: left;
    line-height: 23.17px;
    /* 2줄 넘으면 ...로 표시 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const ProviderNameStyle = styled.img`
    height: 15px;
    object-fit: contain;
    margin-right: 10px;
    vertical-align: middle;
`;

const CountProviderStyle = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #7a7a7a;
`;
