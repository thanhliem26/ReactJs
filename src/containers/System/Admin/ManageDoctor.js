import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './manageDoctor.scss';
import { userService } from '../../../services/index';
import { toast } from 'react-toastify';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            doctors: [],
            isEdit: false,
            //save info doctor
            priceList: [],
            paymentList: [],
            provinceList: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    async componentDidMount() {

        try {
            const { data, errCode } = await userService.getAllDoctor();

            const doctors = data.map((item) => {
                return { value: item.id, label: `${item.firstName} ${item.lastName}` }
            })

            if (errCode === 0) {
                this.setState({ doctors: doctors })
            }

        } catch (e) {
            throw new Error(e);
        }

        this.handleGetAllCode("price")
        .then(res => {
            const priceList = res.map((item) => {
                return {
                    value: item.id,
                    label:  item.valueEn,
                }
            })

            this.setState({priceList: priceList})
        })

        this.handleGetAllCode("payment")
        .then(res => {
             const paymentList = res.map((item) => {
                return {
                    value: item.id,
                    label: item.valueEn,
                }
            })

            this.setState({paymentList: paymentList})
        })

        this.handleGetAllCode("province")
        .then(res => {
            const provinceList = res.map((item) => {
                return {
                    value: item.id,
                    label: item.valueEn,
                }
            })

            this.setState({provinceList: provinceList})
        })
    }
    
    handleGetAllCode = async (type) => {
        try {
            const result = await userService.getAllCodeService(type);
            return result.data;
        } catch (e) {
            console.log("error", e)
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    SaveMarkDown = async () => {
        const { errCode, message } = await userService.saveInfoDoctor(this.state);

        if (errCode === 0) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    handleChange = async (selectedOption) => {
        try {
            const { errCode, data } = await userService.getDetailDocTor(selectedOption.value);
            const { priceList, paymentList, provinceList } = this.state;
            if (errCode === 0) {
                const priceSL = priceList.find((item) => {
                    return item.value == data.priceId;
                })

                const paymentSL = paymentList.find((item) => {
                    return item.value == data.paymentId;
                })

                const provinceSL = provinceList.find((item) => {
                    return item.value == data.provinceId;
                })

                this.setState({
                    selectedOption: selectedOption.value,
                    id: selectedOption.value,
                    contentHTML: data?.Markdown?.contentHTML ? data?.Markdown?.contentHTML : "",
                    contentMarkdown: data?.Markdown?.contentMarkdown ? data?.Markdown?.contentMarkdown : "",
                    description: data?.Markdown?.description ? data?.Markdown?.description : "",
                    isEdit: true,
                    addressClinic: data?.addressClinic,
                    selectedPrice: priceSL,
                    selectedPayment: paymentSL,
                    selectedProvince: provinceSL,
                    note: data?.note,
                })
            }
        } catch (e) {
            throw new Error(e)
        }
    };

    handleOnChangeDesc = (e) => {
        this.setState({ description: e.target.value })
    }

    render() {
        console.log("this state", this.state)
        return (
            <div className="manage-doctor-container">
                <div className='manage-doctor-title'>
                    <FormattedMessage id="manage_doctor.title"/>
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label> <FormattedMessage id="manage_doctor.introductory"/></label>
                        <textarea
                            className='form-control'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                    <div className='content-right'>
                        <label> <FormattedMessage id="manage_doctor.choose_doctor"/></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            className="mt_15"
                        />
                    </div>
                </div>
                <div className='more_info-doctor'>
                <div className='row'>
                        <div className="form-group col-md-4">
                            <label for="inputEmail4"> <FormattedMessage id="manage_doctor.choose_price"/></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={(selectedPrice) => {this.setState({selectedPrice: selectedPrice})}}
                                options={this.state.priceList}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputEmail4"> <FormattedMessage id="manage_doctor.select_payment_method"/></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={(selectedPayment) => {this.setState({selectedPayment: selectedPayment})}}
                                options={this.state.paymentList}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputEmail4"> <FormattedMessage id="manage_doctor.province"/></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={(selectedProvince) => {this.setState({selectedProvince: selectedProvince})}}
                                options={this.state.provinceList}
                            />
                        </div>

                        <div className="form-group mt_15 col-md-4">
                            <label for="inputEmail4"> <FormattedMessage id="manage_doctor.Clinic_name"/></label>
                            <input value={this.state.nameClinic} className="form-control" onChange={(e) => this.setState({nameClinic: e.target.value})}/>
                        </div>
                        <div className="form-group mt_15 col-md-4">
                            <label for="inputEmail4"> <FormattedMessage id="manage_doctor.Address_of_examination"/></label>
                            <input value={this.state.addressClinic} className="form-control" onChange={(e) => this.setState({addressClinic: e.target.value})}/>
                        </div>
                        <div className="form-group  mt_15 col-md-4">
                            <label for="inputEmail4"> <FormattedMessage id="manage_doctor.Note"/></label>
                            <input value={this.state.note} className="form-control" onChange={(e) => this.setState({note: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className='form_btn'>
                    {this.state.isEdit ?
                        <button
                            className='btn_save'
                            onClick={() => this.SaveMarkDown()}
                        >
                            <FormattedMessage id="manage_doctor.edit_information"/>
                        </button> :
                        <button
                            className='btn_save'
                            onClick={() => this.SaveMarkDown()}
                        >
                            <FormattedMessage id="manage_doctor.save_information"/>
                        </button>}
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
