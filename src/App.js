import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';
import ScrollToTop from './components/ScrollToTop';

function App() {
    // // axios 공통 설정, 한 번만
    // axios.defaults.withCredentials = true;
    // axios.defaults.baseURL = 'https://yunhochoi.com';

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
