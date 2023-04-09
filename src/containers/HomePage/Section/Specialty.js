import React from 'react';
import { Carousel } from 'antd';
import Slider from "react-slick";
import * as images from '../../../assets/index';
import { userService } from "../../../services/index";
import { FormattedMessage } from 'react-intl';

const Specialty = () => {

  const [data, setData] = React.useState([]);
  console.log("🚀 ~ data:", data)

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // autoplay: true,
  };

  React.useEffect(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userService.getAllSpecialty();

        if(response.errCode === 0) {
          setData(response.data)
        }
      } catch(e) {
        reject(e)
      }
    })
  }, [])


  return (
    <div className='specialty'>
      <div className='specialty-title'>
        <h4><FormattedMessage id="homepage.specialty-popular"/></h4>
        <button><FormattedMessage id="homepage.more-info"/></button>
      </div>
      <div className='specialty-images'>
        <Slider {...settings}>
          {data.map((item) => {
            return (
              <div className="image_hospital">
              <img src={item.image} />
              <span>{item.name}</span>
            </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default Specialty