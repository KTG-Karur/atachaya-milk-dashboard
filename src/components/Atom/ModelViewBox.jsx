import React, { useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalViewBox = ({ show, setshow, fullscreen, size, cancelTitle, savetitle, onClose, onSubmit, ...props }) => {

    const handleClose = () => {
        setshow(false);
    };

    return (
        <Fragment>
            <Modal centered fullscreen={fullscreen} size={size || 'lg'} show={show} onHide={handleClose} {...props}>
                <Modal.Header className="text-secondary d-flex flex-wrap justify-content-between align-items-center" >
                    {props.title && <h5 className="m-0 text-secondary">{props.title}</h5>}
                    <i
                        className="i-Close-Window cursor-pointer text-18"
                        onClick={handleClose}
                    ></i>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        onClose && (
                            <Button variant="secondary" onClick={handleClose}>
                                {cancelTitle || "Close"}
                            </Button>
                        )
                    }
                    {
                        onSubmit && (
                            <Button variant="primary" onClick={onSubmit}>
                                {savetitle || "Save Changes"}
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default ModalViewBox;

