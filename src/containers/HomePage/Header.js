import React from "react";
import './Header.scss';
import { Col, Row } from 'antd';

const HomePage = () => {
    return (
        <>
          <div className="home-header-container">
            <div className="home_header_content">
                <div className="header_logo">
                <i className="fas fa-bars"></i>
                <div className="header_logo_img"></div>
                </div>
                <div className="header_handle">
                    <div className="child_content">
                        <h2>Chuyên khoa</h2>
                        <p>Tìm bác sĩ theo chuyên khoa</p>
                    </div>
                    <div className="child_content">
                        <h2>Cơ sở y tế </h2>
                        <p>Chọn bệnh viện phòng khám</p>
                    </div>
                    <div className="child_content">
                        <h2>Bác sĩ</h2>
                        <p>Chọn bác sĩ giỏi</p>
                    </div>
                    <div className="child_content">
                        <h2>Gói khám</h2>
                        <p>Khám sức khoẻ tổng quát</p>
                    </div>
                </div>
                <div className="header_support">
                <i className="fas fa-question"></i>
                <span>Support</span>
                </div>
            </div>
        </div>
        <div className="header_background">
            <div className="header_background-content">
            <div className="header_title">
                <h3>NỀN TẢNG Y TẾ</h3>
                <p>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</p>
                <div className="header_search">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Tìm bệnh viện"/>
                </div>
            </div>
            <div className="header_handle">
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-h-square" aria-hidden="true"></i>
                    </div>
                    <p>Khám <br />Chuyên khoa</p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <p>Khám <br />từ xa </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-address-book" aria-hidden="true"></i>
                    </div>
                    <p>Khám <br />tổng quát </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-address-book" aria-hidden="true"></i>
                    </div>
                    <p>Xét nghiệm <br />y học </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <p> Sức khỏe <br />tinh thần </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-h-square" aria-hidden="true"></i>
                    </div>
                    <p>Khám <br />nha khoa </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-h-square" aria-hidden="true"></i>
                    </div>
                    <p> Gói <br />Phẫu thuật </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-car" aria-hidden="true"></i>
                    </div>
                    <p> Sản phẩm <br />Y tế </p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                    <p>  Sức khỏe <br />Doanh nghiệp</p>
                </div>
            </div>
            </div>
            
        </div>
        </>
      
    )
}

export default HomePage;