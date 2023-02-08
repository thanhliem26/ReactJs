import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import { userService } from '../../../services/index';
import { toast } from 'react-toastify';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            idSelected: null,
            isOpenDelete: false,
            type: "create"
        }
    }

    async componentDidMount() {

    }

    handleAddNewUser = () => {
        this.setState({ isOpen: true, type: "create" })
    }

    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleDeleteUser = async (item) => {
        const id = item.id;
        try {
            const response = await userService.handleDeleteUser(item.id);
            if(response.errCode === 0) {
                this.props.handleGetListUser()
                toast.error("Delete user succes!");
            } else {
                alert(response.message)
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    handleConfirmDelete = async () => {
        try {
            await userService.handleDeleteUser(this.state.idSelected);
            this.setState({ idSelected: null, isOpenDelete: false })
        } catch (e) {
            console.log("error", e)
        }
    }

    // hanldleUpdateuser = (item) => {
    //     this.setState({ idSelected: item, isOpen: true, type: "edit" });
    // }

    render() {
        const { userList, setEdit } = this.props;

        return (
            <div className="user-container">
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
                        {userList && (
                            userList.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className='action'>
                                        <button onClick={() => setEdit(item)}><i className="fas pencil fa-pencil-alt"></i></button>
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
