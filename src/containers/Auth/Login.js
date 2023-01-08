import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../services/index';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPass: false,
            errMessage: '',
        }
    }

    handleOnchange = (e) => {
        this.setState({ username: e.target.value, errMessage: '' })
    }

    handleOnchangePass = (e) => {
        this.setState({ password: e.target.value, errMessage: ''  })
    }

    handleLogin = async () => {
        try {
            const data = await userService.handleLogin(this.state.username, this.state.password);
            if(data.errCode !== 0) {
                this.setState({errMessage: data.message});
            } else {
                this.props.userLoginSuccess(data.user)
            }
        } catch(e) {
            if(e.response && e.response.data) {
                this.setState({errMessage: e.response.data.message});
            }
        }
        
    }

    handleShowPass = (type) => {
        this.setState({showPass: type})
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row '>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input
                                value={this.state.username}
                                type="text"
                                className="form-control"
                                placeholder='Enter your name'
                                onChange={(e) => this.handleOnchange(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>PassWord:</label>
                            <div className='form_password'>
                                <input
                                    value={this.state.password}
                                    type={this.state.showPass ? "text" : "password"}
                                    className="form-control"
                                    placeholder='Enter your password'
                                    onChange={(e) => this.handleOnchangePass(e)}
                                />
                                {!this.state.showPass && <i className="fas fa-eye" onClick={() => this.handleShowPass(true)}></i>}
                                {this.state.showPass && <i className="fas fa-eye-slash" onClick={() => this.handleShowPass(false)}></i>}
                            </div>

                        </div>
                        <div className='message_err'>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='text-forgot'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            Or Login With
                        </div>
                        <div className='text-other-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-square facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSucces(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
