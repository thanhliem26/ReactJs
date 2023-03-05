import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    componentDidMount() {
        const { userInfo } = this.props;
       
        if(userInfo && !_.isEmpty(userInfo)) {
            const role = userInfo.roleId;

            if(role === "R1") {
                this.setState({menuApp: adminMenu})
            } else {
                this.setState({menuApp: doctorMenu})
            }
        }
    }

    render() {
        const { processLogout, language, handleChangeLanguage, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className='container_round_left'>
                    <span className='welcome'><FormattedMessage id="home-header.welcome"/>, {userInfo && `${userInfo.firstName}${userInfo.lastName}`}!</span>
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        handleChangeLanguage: (language) => dispatch(actions.handleChangeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
