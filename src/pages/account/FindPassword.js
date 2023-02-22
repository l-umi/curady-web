import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    return (
        <FindPasswordStyled>
            <TitleStyle>비밀번호를 잊어버리셨나요?</TitleStyle>
            <TextStyle>
                가입하실 때 사용하신 이메일을 입력하시면 비밀번호 재설정 메일을
                보내드립니다.
            </TextStyle>

            <SubTitleStyle>이메일</SubTitleStyle>
            <form>
                <InputStyle
                    type="email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    placeholder="example@curady.kr"
                />

                <ButtonStyle
                    type="submit"
                    onClick={() => {
                        navigate('/findpassword/checkemail', {
                            state: {
                                email,
                            },
                        });
                    }}
                >
                    비밀번호 찾기
                </ButtonStyle>
            </form>
        </FindPasswordStyled>
    );
}

export default FindPassword;

const FindPasswordStyled = styled.div`
    margin-top: 64px;
    width: 480px;
    position: relative;
    left: 50%;
    margin-left: -240px;
    height: calc(100vh - 304px);
    min-height: 320px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 26px;
`;

const TextStyle = styled.div`
    font-size: 14px;
`;

const SubTitleStyle = styled.div`
    font-size: 16px;
    margin-top: 35px;
`;
const InputStyle = styled.input`
    border-radius: 4px;
    width: 464px;
    height: 48px;
    font-size: 14px;
    border-color: #dddddd;
    border-style: solid;
    border-width: 1px;
    padding-left: 12px;
    margin-top: 10px;
    margin-bottom: 28px;
`;

const ButtonStyle = styled.button`
    width: 480px;
    height: 48px;
    border-radius: 4px;
    border-style: none;
    font-size: 16px;
    color: #ffffff;
    background: #0054fd;
    cursor: pointer;
`;
