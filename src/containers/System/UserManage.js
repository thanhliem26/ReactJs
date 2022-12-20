import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { userService } from '../../services/index';
import ModalUser from './Modal';
import ModalDelete from './ModalDelete';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            isOpen: false,
            idSelected: null,
            isOpenDelete: false,
            type: "create"
        }
    }

    async componentDidMount() {
        this.handleGetListUser()
    }

    handleGetListUser = async () => {
        try {
            const response = await userService.getAllUser("ALL");
            if (response && response.errCode === 0) {
                this.setState({ userList: response.users })
            }
        } catch (e) {
            console.log("e", e)
        }
    }

    handleAddNewUser = () => {
        this.setState({isOpen: true, type: "create"})
    }

    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    handleDeleteUser = async (item) => {
        this.setState({idSelected: item.id});
        this.setState({isOpenDelete: true});
    }

    handleConfirmDelete = async () => {
        try {
            await userService.handleDeleteUser(this.state.idSelected);
            this.setState({idSelected: null, isOpenDelete: false})
            this.handleGetListUser()
        } catch(e) {
            console.log("error", e)
        }
    }

    hanldleUpdateuser = (item) => {
        this.setState({idSelected: item, isOpen: true, type: "edit"});
    }

    render() {
        return (
            <div className="user-container">
                <ModalUser 
                    isOpen={this.state.isOpen}
                    toggle={this.handleToggle}
                    handleSubmit={this.handleGetListUser}
                    itemSelected={this.state.idSelected}
                    type={this.state.type}
                />
                <ModalDelete 
                    isOpen={this.state.isOpenDelete}
                    toggle={() => this.setState({isOpenDelete: !this.state.isOpenDelete, idSelected: null})}
                    handleSubmit={this.handleConfirmDelete}
                />
                <div className='title text-center'>Manage users with Education</div>
                <button
                    className='btn-add'
                    onClick={this.handleAddNewUser}
                >
                    <i class="fas fa-plus"></i> Add user
                </button>
                <table id="customers" className='mt-4 ml-1 '>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList && (
                            this.state.userList.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className='action'>
                                        <button onClick={() => this.hanldleUpdateuser(item)}><i className="fas pencil fa-pencil-alt"></i></button>
                                        <button onClick={() => this.handleDeleteUser(item)}><i className="fas trash fa-trash"></i></button>
                                    </td>
                                </tr>)
                            })
                        )}
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
