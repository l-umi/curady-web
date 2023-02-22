import styled from 'styled-components';
import thumbUpIcon from '../images/thumb_up.png';

function MyReviews({ reviews }) {
    return (
        <MyReviewsStyle>
            {reviews.map((el, index) => (
                <TextReviewComponentStyle key={el.id}>
                    {el.lectureName}
                    <ProviderStyle
                        src={`https://curady.kr/logos/${el.lectureVendorName}.png`}
                        alt={el.lectureVendorName}
                    />
                    <ReviewContentStyle>
                        {el.content.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </ReviewContentStyle>
                    {el.keywordContent.map((keyword, index) => {
                        return (
                            <ReviewKeywordStyle key={index}>
                                {keyword}
                            </ReviewKeywordStyle>
                        );
                    })}
                    <div align="right">
                        <LikeButtonStyle>
                            <IconImgStyle
                                size="20px"
                                src={thumbUpIcon}
                                alt=""
                            />
                            좋아요 {el.likes}
                        </LikeButtonStyle>
                    </div>
                    {/* <LikeContainerStyle> */}
                    {/* </LikeContainerStyle> */}
                </TextReviewComponentStyle>
            ))}
        </MyReviewsStyle>
    );
}

export default MyReviews;

const MyReviewsStyle = styled.div`
    margin: 16px 16px 0 16px;
    height: 100%;
    font-size: 16px;
    line-height: 23px;
`;

const TextReviewComponentStyle = styled.div`
    width: calc(100% - 34px);
    margin-bottom: 16px;
    border: solid 1px #dddddd;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 16px 16px 16px 16px;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
`;

const ReviewContentStyle = styled.div`
    margin: 8px 0 16px 0;
    font-weight: 400;
`;

const ReviewKeywordStyle = styled.button`
    height: 40px;
    background-color: #e6eeff;
    border: none;
    border-radius: 8px;
    margin-right: 8px;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 4px;
    padding: 8px 15px;
`;

const LikeButtonStyle = styled.div`
    border: 1px solid #0ea441;
    padding: 0px 18px 0px 18px;
    border-radius: 100px;
    height: 36px;
    background-color: white;
    color: #0ea441;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    cursor: default;
`;

const ProviderStyle = styled.img`
    height: 14px;
    margin-left: 12px;
    object-fit: contain;
    object-position: left;
`;

const IconImgStyle = styled.img`
    width: 20px;
    height: 20px;
    padding: 0 0 0 0;
    margin: 0 4px 0 0;
`;
