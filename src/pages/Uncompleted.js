import development from '../images/development.png';

function Uncompleted() {
    return (
        <div
            style={{
                fontSize: '50px',
                textAlign: 'center',
                margin: '100px 0px 0px 0px',
                height: 'calc(100vh - 341px)',
                minHeight: '550px',
            }}
        >
            <img src={development} width="40%" alt="NotFound" />
            <br />
            서비스 준비중입니다!
            <br />
        </div>
    );
}

export default Uncompleted;
