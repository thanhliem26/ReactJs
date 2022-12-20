import React from "react";
import './Header.scss';
import { Col, Row } from 'antd';

const HomePage = () => {
    return (
        <div className="home-header-container">
            <div className="home_header_content">
                <div className="header_logo">
                <i class="fas fa-bars"></i>
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
                <i class="fas fa-question"></i>
                <span>Support</span>
                </div>
            </div>
        </div>
    )
}

export default HomePage;