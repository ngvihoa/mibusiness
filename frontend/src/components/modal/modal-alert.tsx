import { Modal } from "react-bootstrap";
import { ModalTextProps } from "lib/type";
import FillButton from "components/button/fill-button";

interface ModalAlertProps {
  show: boolean;
  text: ModalTextProps;
  handleClose: () => void;
}

const ModalAlert = ({ show, handleClose, text }: ModalAlertProps) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal modal-alert"
      >
        <Modal.Header closeButton>
          <Modal.Title>{text.headingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text.bodyText}</Modal.Body>
        <Modal.Footer>
          <FillButton onClickFunction={handleClose}>OK</FillButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlert;
