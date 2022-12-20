import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { userService } from '../../services/index';

const ModalUser = ({ isOpen, toggle, handleSubmit, itemSelected, type = "create" }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = React.useState(0);
    const [address, setAddress] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    React.useEffect(() => {
        if(itemSelected) {
            setEmail(itemSelected.email);
            setPassword(itemSelected.password);
            setFirstName(itemSelected.firstName);
            setLastName(itemSelected.lastName);
            setGender(itemSelected.gender);
            setAddress(itemSelected.address);
            setPhoneNumber(itemSelected.phoneNumber);
        } 
    }, [itemSelected])

    const handleReset = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setGender('');
        setAddress('');
        setPhoneNumber('')
    }

    const handleSubmitUser = async () => {
        if(type === "edit") {
            try {
                const response = await userService.handleUpdateUser({email, firstName, lastName, gender, address, phoneNumber, id: itemSelected.id})
                handleReset();
                toggle();
                handleSubmit()
            } catch(e) {
                console.log("error", e.response)
            }
            return;
        }
        if(!email || !password || !firstName || !lastName) {
            alert("Missing parameter!");
            return;
        }

        try {
            const response = await userService.addNewUser({email, password, firstName, lastName, gender, address, phoneNumber});
            if(response.errCode === 0) {
                toggle()
                handleReset()
                handleSubmit()
            } else {
                alert(response.message);
            }
        } catch(e) {
            console.log("error", e)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            className="modal_user"
        // {...args}
        >
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <div className="container">
                    <div className="row">
                        <div className={`${type === "edit" ? "d_none" : ''} form-group col-md-6`}>
                            <label for="inputEmail4">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                class="form-control" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        <div className={`${type === "edit" ? "d_none" : ''} form-group col-md-6`}>
                            <label for="inputEmail4">password</label>
                            <input 
                                type="password" 
                                name="password" 
                                class="form-control" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">firstName</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                class="form-control" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">LastName</label>
                            <input 
                                type="text" 
                                name="LastName" 
                                className="form-control" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">Gender</label>
                            <select id="inputState" className="form-control" value={gender} name="gender" onChange={(e) => setGender(e.target.value)}>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="form-group col-md-9">
                            <label for="inputEmail4">PhoneNumber</label>
                            <input 
                                type="text" 
                                name="PhoneNumber" 
                                className="form-control" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Address</label>
                            <input 
                                type="text" 
                                name="PhoneNumber" 
                                className="form-control" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => handleSubmitUser()}>
                    Submit
                </Button>
                <Button color="secondary" onClick={() => {
                    toggle()
                    handleReset()
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalUser;