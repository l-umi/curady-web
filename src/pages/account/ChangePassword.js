import styled from 'styled-components';

function ChangePassword() {
    return (
        <ChangePasswordStyle>
            <TitleStyle>
                <BordStyle>새 비밀번호</BordStyle>를 입력해주세요.
            </TitleStyle>
            비밀번호
            <InputStyle placeholder="*******" type="password" />
            비밀번호 확인
            <InputStyle placeholder="*******" type="password" />
            <ButtonStyle>비밀번호 변경</ButtonStyle>
        </ChangePasswordStyle>
    );
}

export default ChangePassword;

const ChangePasswordStyle = styled.div`
    width: 86vw;
    margin: 64px auto 96px auto;
    max-width: 1238.4px; /* calc(1440px * 0.86); */
    min-height: calc(100vh - 400px);
    width: 480px;
    font-size: 16px;
    line-height: 23px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    text-align: left;
    margin-bottom: 36px;
`;

const BordStyle = styled.span`
    font-weight: 700;
`;

const InputStyle = styled.input`
    margin: 4px 0 16px 0;
    padding: 12px 14px 12px 14px;
    border-radius: 4px;
    width: 452px;
    height: 22px;
    font-size: 14px;
    line-height: 20px;
    border-color: #dddddd;
    border-style: solid;
    border-width: 1px;
    padding-left: 12px;

    &:focus {
        outline: none;
        border-color: #0054fd;
    }
`;

const ButtonStyle = styled.button`
    margin-top: 40px;
    width: 480px;
    height: 48px;
    border-radius: 4px;
    border-style: none;
    font-size: 16px;
    color: #ffffff;
    background: #0054fd;
    cursor: pointer;
    margin-top: 57px;
`;
