import { Modal } from "react-bootstrap";
import { ModalTextProps } from "lib/type";
import FillButton from "components/button/fill-button";
import LineButton from "components/button/line-button";

interface ModalConfirmProps {
  show: boolean;
  text: ModalTextProps;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ModalConfirm = ({
  show,
  handleClose,
  text,
  handleConfirm,
}: ModalConfirmProps) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal modal-confirm"
      >
        <Modal.Header closeButton>
          <Modal.Title>{text.headingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text.bodyText}</Modal.Body>
        <Modal.Footer>
          <LineButton onClickFunction={handleClose}>Close</LineButton>
          <FillButton onClickFunction={handleConfirm}>Save Changes</FillButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
