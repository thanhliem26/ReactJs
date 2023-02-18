import React from 'react';
import Slider from "react-slick";
import * as images from '../../../assets/index';
import { userService } from '../../../services'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const OutstandingDoctor = () => {
  const [doctorList, setDoctorList] = React.useState([]);

  const language = useSelector((state) => state.app.language);
  console.log("🚀 ~ doctorList", doctorList)

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

  return (
    <div className='specialty'>
      <div className='specialty-title'>
        <h4>Bác sĩ nổi bật tuần qua</h4>
        <button>Xem them</button>
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
                <img src={imageBase64} />
                <span>{language === "vi" ? nameVi : nameEn}</span>
              </div>
            )
          })}
          {/* <div className="image_hospital">
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
          </div> */}
        </Slider>
      </div>
    </div>
  )
}

export default OutstandingDoctor