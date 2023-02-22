import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //  react strict mode render twice!!!
    // 문서를 보면 아시겠지만 개발 모드에서만 2번씩 호출하고 실제 프로덕션으로 내보낼 때는 코드대로 동작한다고 되어있습니다. 뭐 어쩌구저쩌구

    //  <React.StrictMode>
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    //  </React.StrictMode>
);
