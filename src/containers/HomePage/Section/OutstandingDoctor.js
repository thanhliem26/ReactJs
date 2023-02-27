import React from 'react';
import Slider from "react-slick";
import * as images from '../../../assets/index';
import { userService } from '../../../services'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

const OutstandingDoctor = () => {
  const [doctorList, setDoctorList] = React.useState([]);

  const language = useSelector((state) => state.app.language);
  const history = useHistory();

  React.useEffect(() => {
    new Promise(async (resolve, reject) => {
      const result = await userService.getTopDocTorService(10);
      try {
        if(result.errCode === 0) {
          setDoctorList(result.data)
        } else {
          toast.error(result.message);
        } 
      } catch(e) {
        toast.error(e);
      }
     
    })
  }, [])

  const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        // autoplay: true,
  };

  const handleRederiect = (item) => {
    history.push(`/detail-doctor/${item.id}`)
  }

  return (
    <div className='specialty'>
      <div className='specialty-title'>
        <h4><FormattedMessage id="homepage.out-standing-doctor"/></h4>
        <button><FormattedMessage id="homepage.more-info"/></button>
      </div>
      <div className='specialty-images'>
        <Slider {...settings}>
          {doctorList.map((item, index) => {
            const nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
            const nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
            const imageBase64 = item.image ? 
            new Buffer(item.image, 'base64').toString('binary') : 
            images.backgroundHospital;

            return (
              <div key={index} className="image_hospital">
                <img src={imageBase64} onClick={() => handleRederiect(item)}/>
                <span>{language === "vi" ? nameVi : nameEn}</span>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default OutstandingDoctor