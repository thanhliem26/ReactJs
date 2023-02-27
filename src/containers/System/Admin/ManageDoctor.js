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
            if (errCode === 0) {
                this.setState({
                    selectedOption,
                    id: selectedOption.value,
                    contentHTML: data?.Markdown?.contentHTML ? data?.Markdown?.contentHTML : "",
                    contentMarkdown: data?.Markdown?.contentMarkdown ? data?.Markdown?.contentMarkdown : "",
                    description: data?.Markdown?.description ? data?.Markdown?.description : "",
                    isEdit: true,
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

        return (
            <div className="manage-doctor-container">
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin doctor
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Thong tin giới thiệu</label>
                        <textarea
                            className='form-control'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                    <div className='content-right'>
                        <label>Chon bac si</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            className="mt_15"
                        />
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
                            Edit thong tin
                        </button> :
                        <button
                            className='btn_save'
                            onClick={() => this.SaveMarkDown()}
                        >
                            Lưu thông tin
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
