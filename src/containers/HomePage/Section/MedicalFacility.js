import React from 'react';
import Slider from "react-slick";
import * as images from '../../../assets/index';

const MedicalFacility = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        // autoplay: true,
    };

    return (
        <div className='specialty odd'>
            <div className='specialty-title'>
                <h4>Cơ sở y tế nổi bật</h4>
                <button>Xem them</button>
            </div>
            <div className='specialty-images'>
                <Slider {...settings}>
                    <div className="image_hospital">
                        <img src={images.section1} />
                        <span>Benh vien Huu nghi Viet Duc</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section2} />
                        <span>Benh vien Cho Ray</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section3} />
                        <span>Phong kham Benh vien Dai hoc Y Duoc 1</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section4} />
                        <span>Benh vien K - Co so Phan Chu Trinh</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section5} />
                        <span>Trung tam Kham suc kheo dinh ki, Benh vien Trung Uong Quan doi 108</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section6} />
                        <span>Benh vien Ung buou Hung Viet</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section7} />
                        <span>He thong y te MEDLATEC</span>
                    </div>
                    <div className="image_hospital">
                        <img src={images.section8} />
                        <span>Trung tam xet nghiem Diag Laboratories</span>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default MedicalFacility