import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    render() {
        const { processLogout, language, handleChangeLanguage } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className='container_round_left'>
                    <div className='languages'>
                        <span className={`language_vi ${language === "vi" ? "active" : ""}`} onClick={() => handleChangeLanguage("vi")}>
                            VI
                        </span>
                        <span className={`language_en ${language === "en" ? "active" : ""}`} onClick={() => handleChangeLanguage("en")}>
                            EN
                        </span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        handleChangeLanguage: (language) => dispatch(actions.handleChangeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
