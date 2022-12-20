import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { userService } from '../../services/index';

const ModalDelete = ({ isOpen, toggle, handleSubmit }) => {
    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            className="modal_user"
        // {...args}
        >
            <ModalHeader toggle={toggle}>Are you sure to delete user!</ModalHeader>
            <ModalFooter>
                <Button color="primary" onClick={() => handleSubmit()}>
                    Submit
                </Button>
                <Button color="secondary" onClick={() => {
                    toggle()
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalDelete;