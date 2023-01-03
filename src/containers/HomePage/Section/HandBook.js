import React from 'react';
import Slider from "react-slick";
import * as images from '../../../assets/index';

const HandBook = () => {

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
      <h4>Cam nang</h4>
      <button>Xem them</button>
    </div>
    <div className='specialty-images'>
      <Slider {...settings}>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
        <div className="image_hospital">
          <img src={images.HandBook} />
          <span>Cam nang</span>
        </div>
      </Slider>
    </div>
  </div>
  )
}

export default HandBook