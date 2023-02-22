import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import playData from '../data/playData.json';
// import favorite from '../images/favorite.png';
// import nonfavorite from '../images/nonfavorite.png';
// import starIcon from '../images/starIcon.png';
// 재생목록 총 시간은 https://ytplaylist-len.sharats.dev/
import uncheckedIcon from '../images/downIcon_24.png';
import checkedIcon from '../images/upIcon_24.png';

function Play() {
    const playId = document.location.pathname.slice(6);
    const [data, setData] = useState();
    useEffect(() => {
        playData.map(e => {
            if (e.id == playId) {
                setData(e);
            }
        });
    });

    const goDownIconClick = useCallback(() => {
        const location = document.querySelector('#reviewOver').offsetTop;
        window.scrollTo({ top: location - 20, behavior: 'smooth' });
    });
    if (!data) {
        return <PlayStyle />;
    }
    return (
        <PlayStyle>
            <TopStyle>
                {data.name}
                {/* <IconStyle src={favorite} />
                <IconStyle onClick={goDownIconClick} src={starIcon} /> */}
                <LineStyle />
            </TopStyle>
            <MiddleStyle>
                {data.number === 1 ? (
                    <div>
                        <VideoStyle>
                            <IframStyle
                                src={`https://www.youtube-nocookie.com/embed/${data.lectures[0].videoUrl}?rel=0&modestbranding=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="fullscreen"
                                allowfullscreen
                            />
                        </VideoStyle>
                        {data.lectures[0].text ? (
                            <TextStyle>
                                {data.lectures[0].text
                                    .split('\n')
                                    .map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                            </TextStyle>
                        ) : (
                            <TextStyle />
                        )}
                    </div>
                ) : (
                    <div>
                        {data.lectures.map(lecture => (
                            <BoxContainerStyle>
                                <LabelStyle htmlFor={`checkbox${lecture.id}`}>
                                    {lecture.name}
                                </LabelStyle>
                                <CheckboxStyle
                                    type="checkbox"
                                    id={`checkbox${lecture.id}`}
                                    // defaultChecked={lecture.id === 1}
                                />
                                <ContentStyle id={lecture.id}>
                                    <VideoStyle>
                                        <IframStyle
                                            src={`https://www.youtube-nocookie.com/embed/${lecture.videoUrl}?rel=0&modestbranding=1`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="fullscreen"
                                            allowfullscreen
                                        />
                                    </VideoStyle>
                                    {lecture.text ? (
                                        <TextStyle>
                                            {lecture.text
                                                .split('\n')
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                        </TextStyle>
                                    ) : null}
                                </ContentStyle>
                            </BoxContainerStyle>
                        ))}
                    </div>
                )}

                <DescriptionStly>
                    {data.description.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </DescriptionStly>
            </MiddleStyle>
            {/* <BottomStyle id="reviewOver">
                <ReviewStyle>리뷰</ReviewStyle>
                <RemoconStyle>댓글?Q&A?</RemoconStyle>
            </BottomStyle> */}
        </PlayStyle>
    );
}

export default Play;
// 16:9 0.5625
const PlayStyle = styled.div`
    margin: 40px auto 80px auto;
    width: 86vw;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    min-height: calc(100vh - 367px);
`;

const TopStyle = styled.div`
    margin-bottom: 13px;
    font-size: 32px;
    font-weight: 700;
    line-height: 46px;
    margin-bottom: 32px;
`;

const IconStyle = styled.img`
    height: 24px;
    float: right;
    margin-top: 12px;
    cursor: pointer;
    margin-left: 8px;
    &:active {
        transition: all 0.01s;
        transform: scale(1.05);
    }
`;

const LineStyle = styled.div`
    border-bottom: 1px solid #d0d0d0;
    margin: 12px 0px 24px 0px;
`;

const MiddleStyle = styled.div``;

const IframStyle = styled.iframe`
    margin: 20px 0 10px 0;
    width: calc(100% - 2px);
    height: calc(100% - 1px);
    border-radius: 8px;
    /* border: solid 1px #d0d0d0; */
    display: block;
`;

const TextStyle = styled.div`
    color: #777;
    margin: 12px 0 20px 0;
    padding: 0px 8px 0px 8px;
    /* font-size: 20px; */
    /* line-height: 29px; */
    font-size: 18px;
    line-height: 24px;
`;

const BoxContainerStyle = styled.div`
    min-height: 30px;
    margin-bottom: 20px;
    border: solid 1px #dddddd;
    border-radius: 8px;
`;

const LabelStyle = styled.label`
    display: inline-block;
    line-height: 30px;
    width: calc(100% - 55px);
    cursor: pointer;
    margin: 0 10px 0 10px;
    font-size: 20px;
    font-weight: 500;

    //한줄
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CheckboxStyle = styled.input`
    appearance: none;
    height: 30px;
    width: 30px;
    background-size: contain;
    vertical-align: bottom;
    cursor: pointer;
    background-image: url(${uncheckedIcon});
    &:checked {
        background-image: url(${checkedIcon});
        + div {
            display: block;
        }
    }
    &:focus {
        border: none;
    }
`;

const ContentStyle = styled.div`
    display: none;
    transform-origin: top center;
    width: 100%;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation: fadein 1s;
`;

const VideoStyle = styled.div`
    width: 86vw;
    max-width: 1238.4px;
    height: calc(86vw * 0.5625);
    max-height: 696.6px;
    ${TextStyle}:hover & {
        border: solid 1px pink;
    }
`;

const DescriptionStly = styled.div`
    color: #666;
    padding: 12px 8px 12px 8px;
    font-size: 18px;
    line-height: 24px;
`;

const BottomStyle = styled.div`
    border: solid 1px grey;
    text-align: center;
    margin-top: 32px;
    /* border: solid gray 1px; */
`;

const ReviewStyle = styled.div``;

const RemoconStyle = styled.div``;
