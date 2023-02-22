import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function FindPasswordChangePassword() {
    const [pwd, setPwd] = useState('');
    const [pwdre, setPwdre] = useState('');
    return (
        <FindPasswordChangePasswordStyle>
            <TitleStyle>비밀번호를 재설정해주세요.</TitleStyle>

            <div>
                <SubTitleStyle>비밀번호</SubTitleStyle>
                <InputStyle
                    value={pwd}
                    onChange={e => {
                        setPwd(e.target.value);
                    }}
                    placeholder="*******"
                    type="password"
                />
            </div>

            <div>
                <SubTitleStyle>비밀번호 확인</SubTitleStyle>
                <InputStyle
                    value={pwdre}
                    onChange={e => {
                        setPwdre(e.target.value);
                    }}
                    placeholder="*******"
                    type="password"
                />
            </div>

            <Link to="/">
                <ButtonStyle>비밀번호 변경</ButtonStyle>
            </Link>
        </FindPasswordChangePasswordStyle>
    );
}

export default FindPasswordChangePassword;

const FindPasswordChangePasswordStyle = styled.div`
    padding-top: 64px;
    width: 480px;
    height: calc(100vh - 304px);
    position: relative;
    left: 50%;
    margin-left: -240px;
    min-height: 420px;
`;

const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 36px;
`;

const SubTitleStyle = styled.div`
    font-size: 16px;
    margin-top: 20px;
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
    margin-top: 8px;
    margin-bottom: 0px;
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
    margin-top: 57px;
`;
