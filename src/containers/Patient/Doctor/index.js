import React from 'react';
import { useParams } from 'react-router';
import { userService } from '../../../services'
import HeaderHome from '../../HomePage/Header';
import BookingModal from '../Modal/BookingModal';
import style from './index.scss';

import DoctorSchedule from './DoctorSchedule';

import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

const DetailDoctor = () => {
  const [infoDoctor, setInfoDoctor] = React.useState({});
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const language = useSelector((state) => state.app.language);

  const { id } = useParams();

  React.useEffect(() => {
    new Promise(async (resolve, reject) => {
      try {
        const response = await userService.getDetailDocTor(id)
        if (response?.errCode === 0) {
          setInfoDoctor(response.data);
        }
      } catch (e) {
        reject(e)
      }
    })
  }, [])

  const imageDoctor = React.useMemo(() => {
    const imageBase64 = infoDoctor.image ?
      new Buffer(infoDoctor.image, 'base64').toString('binary') :
      '';
    return imageBase64;

  }, [infoDoctor])

  const handleSelected = (item) => {
    setSelected(item);
    setIsOpenModal(true);
  }

  return (
    <>
      <HeaderHome isShowBack={false} />
      <BookingModal 
        isOpen={isOpenModal}
        toggle={() => setIsOpenModal(!isOpenModal)}
        itemSelected={selected}
        image={imageDoctor}
        description={infoDoctor?.Markdown?.description}
        infoDoctor={infoDoctor}
        id={id}
        // type={this.state.type}
      />
      <div className={`doctor-detail-container`}>
        <div className='intro-doctor'>
          <Row gutter={[16, 16]}>
            <Col md={6}>
              <div className='image_doctor'>
                <img src={imageDoctor}/>
              </div>
            </Col>
            <Col md={18}>
              <p className='name_doctor'>
                {infoDoctor?.positionData?.[language === "vi" ? "valueVi" : "valueEn"]}: 
                {`${infoDoctor.firstName} ${infoDoctor.lastName}`}</p>
              <p>{infoDoctor?.Markdown?.description}</p>
            </Col>
          </Row>
        </div>
        <div className='schedule-doctor'>
          <div className="content_left">
            <DoctorSchedule doctorId={id} handleSelected={handleSelected}/>
          </div>
          <div className="content_right">
         <p> ĐỊA CHỈ KHÁM:</p>
         <p>{infoDoctor.addressClinic}</p>
         <p> GIÁ KHÁM:</p>
         <p>{infoDoctor.provinceId  }</p>
          </div>
        </div>
        <div className='detail-info-doctor'>
          <div className='render_text' dangerouslySetInnerHTML={{__html: infoDoctor?.Markdown?.contentHTML}}></div>
        </div>
      </div>
    </>

  )
}

export default DetailDoctor