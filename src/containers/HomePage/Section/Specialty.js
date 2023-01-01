import React from 'react';
import './index.scss';
import { Carousel } from 'antd';
import Slider from "react-slick";
import * as images from '../../../assets/index';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Specialty = () => {
  const carouselRef = React.useRef();
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    return <i class="fas fa-chevron-circle-left prev" {...props}></i>
  }

  const SlickArrowRight  = ({ currentSlide, slideCount, ...props }) => {
    return <i class="fas fa-chevron-circle-right next" {...props}></i>
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // autoplay: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };


  return (
    <div className='specialty'>
      <div className='specialty-title'>
        <h4>Chuyên khoa phổ biến</h4>
        <button>Xem them</button>
      </div>
      <div className='specialty-images'>
        <Slider {...settings}>
          <div className="image_hospital">
            <img src={images.hospital1} />
            <span>Co xuong khop</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital2} />
            <span>Than Kinh</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital3} />
            <span>Tieu hoa</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital4} />
            <span>Tim mach</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital5} />
            <span>Tai mui hong</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital6} />
            <span>Cot song</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital7} />
            <span>Y hoc co truyen</span>
          </div>
          <div className="image_hospital">
            <img src={images.hospital8} />
            <span>Cham cuu</span>
          </div>
        </Slider>
        {/* <div className='handle_slider'>
          <i class="fas fa-chevron-circle-left prev"></i>
          <i class="fas fa-chevron-circle-right next"></i>
        </div> */}
      </div>
    </div>
  )
}

export default Specialty