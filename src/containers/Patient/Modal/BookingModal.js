import React from 'react';
import './Bookingmodal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { userService } from '../../../services';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, toggle, itemSelected, image,  description, infoDoctor, id}) => {
    const language = useSelector((state) => state.app.language);
    const [data, setData] = React.useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        gender: '1',
    })

    const handleSubmit = async () => {
        try {
            const response = await userService.postPatientAppoiment({...data, doctorId: id, timeType: itemSelected.timeType});   
            console.log("🚀 ~ response:", response)
            if(response.errCode == 0) {
                toast.success(response.message);
                toggle()
            } else {
                toast.error(response.message);
            }   
        } catch(e) {
            toast.error(e);
        }
    }

  return (
    <Modal
    isOpen={isOpen}
    toggle={toggle}
    className="modal_user"
// {...args}
>
    <ModalHeader toggle={toggle}>Thông tin đặt lịch khám</ModalHeader>
    <ModalBody>
        <div className="container">
        <Row gutter={[16, 16]}>
            <Col md={6}>
              <div className='image_doctor'>
                <img src={image}/>
              </div>
            </Col>
            <Col md={18}>
              <p className='name_doctor'>
                {infoDoctor?.positionData?.[language === "vi" ? "valueVi" : "valueEn"]}: 
                {`${infoDoctor.firstName} ${infoDoctor.lastName}`}</p>
              <p>{description}</p>
            </Col>
          </Row>
            <p>Giá khám: {infoDoctor?.priceId}</p>
            <div className="row">
                <div className={`form-group col-md-6`}>
                    <label for="inputEmail4">Họ tên</label>
                    <input 
                        type="text" 
                        value={data.fullName}
                        onChange={(e) => {
                            setData({...data, fullName: e.target.value})
                        }} 
                        className="form-control" 
                        placeholder="name" 
                    />
                </div>
                <div className={`form-group col-md-6`}>
                    <label for="inputEmail4">Số điện thoại</label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        className="form-control" 
                        value={data.phoneNumber}
                        onChange={(e) => {
                            setData({...data, phoneNumber: e.target.value})
                        }} 
                    />
                </div>
                <div className="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        value={data.email}
                        onChange={(e) => {
                            setData({...data, email: e.target.value})
                        }} 
                    />
                </div>
                <div className="form-group col-md-6">
                    <label for="inputEmail4">Địa chỉ liên hệ</label>
                    <input 
                        type="text" 
                        name="address" 
                        className="form-control" 
                        value={data.address}
                        onChange={(e) => {
                            setData({...data, address: e.target.value})
                        }} 
                        />
                </div>
                <div className="form-group col-md-3">
                    <label for="inputState">Gender</label>
                    <select 
                        id="inputState" 
                        className="form-control" 
                        value={data.gender}
                        onChange={(e) => {
                            setData({...data, gender: e.target.value})
                        }} 
                    >
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                    </select>
                </div>
                <div className="form-group col-md-9">
                    <label for="inputEmail4">Đặt cho ai</label>
                    <input 
                        type="text" 
                        name="user" 
                        className="form-control" 
                        // value={data.address}
                        // onChange={(e) => {
                        //     setData({...data, address: e.target.value})
                        // }} 
                    />
                </div>
                <div className="form-group col-md-12">
                    <label for="inputEmail4">Lí do khám</label>
                    <input 
                        type="text" 
                        name="reason" 
                        className="form-control" 
                        value={data.reason}
                        onChange={(e) => {
                            setData({...data, reason: e.target.value})
                        }} 
                    />
                </div>
          
            </div>
        </div>
    </ModalBody>
    <ModalFooter>
        <Button 
            color="primary" 
            onClick={handleSubmit}
        >
            Submit
        </Button>
        <Button 
            color="secondary" 
        //     onClick={() => {
        //     toggle()
        //     handleReset()
        // }}
        >
            Cancel
        </Button>
    </ModalFooter>
</Modal>
  )
}

export default BookingModal