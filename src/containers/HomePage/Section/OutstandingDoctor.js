import React from 'react';
import Slider from "react-slick";
import * as images from '../../../assets/index';

const OutstandingDoctor = () => {

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
    <div className='specialty'>
      <div className='specialty-title'>
        <h4>Bác sĩ nổi bật tuần qua</h4>
        <button>Xem them</button>
      </div>
      <div className='specialty-images'>
        <Slider {...settings}>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Thac si, Bac si Nguyen Viet Chung</span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Kham Tai Trung Tam Tieu Hoa Doctor</span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Bac si Chuyen khoa Vo Tran Thanh</span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Kham Nam hoc, Benh vien Nam hoc va hien muon Ha Noi</span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Pho giao su, Tien Su, Bac si cao cap Nguyen Duy Hung </span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Bac si chuye khoa Tran Minh Khuyen</span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Bac si chuyen khoa Phi Thi Tuyet Nga</span>
          </div>
          <div className="image_hospital">
            <img src={images.backgroundHospital} />
            <span>Pho giao su, Tien si, Bac si Nguyen Thi Hoa An</span>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default OutstandingDoctor