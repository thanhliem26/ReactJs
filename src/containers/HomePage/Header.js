import React from "react";
import './Header.scss';
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { handleChangeLanguage } from '../../store/actions/index';

const HomePage = () => {
    const language = useSelector((state) => state.app.language);

    const dispatch = useDispatch();

    const handleChangeLg= (type) => {
        dispatch(handleChangeLanguage(type))
    }

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
                        <h2><FormattedMessage id="home-header.speciality"/></h2>
                        <p><FormattedMessage id="home-header.search-doctor"/></p>
                    </div>
                    <div className="child_content">
                        <h2><FormattedMessage id="home-header.health-facilities"/></h2>
                        <p><FormattedMessage id="home-header.hospital-clnic"/></p>
                    </div>
                    <div className="child_content">
                        <h2><FormattedMessage id="home-header.doctor"/></h2>
                        <p><FormattedMessage id="home-header.doctor-good"/></p>
                    </div>
                    <div className="child_content">
                        <h2><FormattedMessage id="home-header.checkup-package"/></h2>
                        <p><FormattedMessage id="home-header.health-check"/></p>
                    </div>
                </div>
                <div className="header_support">
                <i className="fas fa-question"></i>
                <span><FormattedMessage id="home-header.support"/></span>
                <div className="language">
                    <span onClick={() => handleChangeLg("vi")} className={language === "vi" ? "active_language" : ""}>VN</span>
                    <span onClick={() => handleChangeLg("en")} className={language === "en" ? "active_language" : ""}>EN</span>
                </div>
                </div>
            </div>
        </div>
        <div className="header_background">
            <div className="header_background-content">
            <div className="header_title">
                <h3><FormattedMessage id="banner.medical-background"/></h3>
                <p><FormattedMessage id="banner.headlth-care"/></p>
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
                    <p><FormattedMessage id="banner.child-1"/></p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <p><FormattedMessage id="banner.child-2"/></p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-address-book" aria-hidden="true"></i>
                    </div>
                    <p><FormattedMessage id="banner.child-3"/></p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-address-book" aria-hidden="true"></i>
                    </div>
                    <p><FormattedMessage id="banner.child-4"/></p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <p> <FormattedMessage id="banner.child-5"/></p>
                </div>
                <div className="form_group">
                    <div className="icon">
                    <i className="fa fa-h-square" aria-hidden="true"></i>
                    </div>
                    <p><FormattedMessage id="banner.child-6"/></p>
                </div>
            </div>
            </div>
            
        </div>
        </>
      
    )
}

export default HomePage;