import { React, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RequestDonation from "./RequestDonation";

const ConfirmDonationModal = () => {
  const Navigate = useNavigate();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (

    <div className="app">
    <Modal show={show} onHide={handleClose} style={{zIndex:1051}} >
        <Modal.Header closeButton onClick={Navigate("/ngohome")}>
          <Modal.Title>Request Donation...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RequestDonation />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfirmDonationModal;
