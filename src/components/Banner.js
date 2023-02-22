import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import banner1 from '../images/banner/banner1.png';
import banner2 from '../images/banner/banner2.png';
import banner3_left from '../images/banner/banner3_left.png';
import banner3_middle from '../images/banner/banner3_middle.png';
import banner3_right from '../images/banner/banner3_right.png';
import banner4_left from '../images/banner/banner4_left.png';
import banner4_middle from '../images/banner/banner4_middle.png';
import banner4_right from '../images/banner/banner4_right.png';
import mobile_banner1 from '../images/banner/mobile_banner1.png';
import mobile_banner2 from '../images/banner/mobile_banner2.png';
import mobile_banner4 from '../images/banner/mobile_banner4.png';
import mobile_banner3_left from '../images/banner/mobile_banner3_left.png';
import mobile_banner3_middle from '../images/banner/mobile_banner3_middle.png';
import mobile_banner3_right from '../images/banner/mobile_banner3_right.png';

function Banner() {
    return (
        <BannerStyle>
            <Swiper
                slidesPerView="1"
                loop
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
            >
                <SwiperSlide key="1">
                    <DesktopBannerStyle>
                        <BannerLeftImgStyle src={banner1} />
                    </DesktopBannerStyle>
                    <MobileBannerStyle>
                        <BannerLeftImgStyle src={mobile_banner1} />
                    </MobileBannerStyle>
                </SwiperSlide>
                <SwiperSlide key="2">
                    <DesktopBannerStyle>
                        <BannerCenterImgStyle src={banner2} />
                    </DesktopBannerStyle>
                    <MobileBannerStyle>
                        <BannerCenterImgStyle src={mobile_banner2} />
                    </MobileBannerStyle>
                </SwiperSlide>
                <SwiperSlide>
                    <DesktopBannerStyle>
                        <BannerLeftImgStyle src={banner3_left} />
                        <BannerCenterImgStyle src={banner3_middle} />
                        <BannerRightImgStyle src={banner3_right} />
                    </DesktopBannerStyle>
                    <MobileBannerStyle>
                        <BannerLeftImgStyle src={mobile_banner3_left} />
                        <BannerCenterImgStyle src={mobile_banner3_middle} />
                        <BannerRightImgStyle src={mobile_banner3_right} />
                    </MobileBannerStyle>
                </SwiperSlide>
                <SwiperSlide>
                    <DesktopBannerStyle>
                        <BannerLeftImgStyle src={banner4_left} />
                        <BannerCenterImgStyle src={banner4_middle} />
                        <BannerRightImgStyle src={banner4_right} />
                    </DesktopBannerStyle>
                    <MobileBannerStyle>
                        <BannerCenterImgStyle src={mobile_banner4} />
                    </MobileBannerStyle>
                </SwiperSlide>
            </Swiper>
        </BannerStyle>
    );
}

export default Banner;

const BannerStyle = styled.div`
    height: 280px;
    width: 86vw;
    max-width: 1238px;
    margin-bottom: 20px;
    margin-top: 30px;
    border-radius: 8px;

    @media screen and (max-width: 768px) {
        height: 280px;
        width: 100%;
        max-width: 100vw;
        margin: 1px 0 20px 0;
    }
    z-index: 0;
`;

const BannerLeftImgStyle = styled.img`
    @media screen and (min-width: 769px) {
        border-radius: 8px;
    }
    height: 280px;
    width: 100%;
    object-fit: cover;
    position: absolute;
    object-position: left;
`;

const BannerCenterImgStyle = styled.img`
    @media screen and (min-width: 769px) {
        border-radius: 8px;
    }
    height: 278px;
    width: 100%;
    object-fit: cover;
    border-top: solid 1px white;
    border-bottom: solid 1px white;
    position: absolute;
    z-index: -1;
`;

const BannerRightImgStyle = styled.img`
    height: 280px;
    width: 100%;
    object-fit: cover;
    object-position: right;
`;

const DesktopBannerStyle = styled.div`
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const MobileBannerStyle = styled.div`
    @media screen and (min-width: 769px) {
        display: none;
    }
`;
