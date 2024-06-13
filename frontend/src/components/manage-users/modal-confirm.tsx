import { Button, Modal } from "react-bootstrap";
import { ModalTextProps } from "../../lib/type";

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
        className="model-confirm"
      >
        <Modal.Header closeButton>
          <Modal.Title>{text.headingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text.bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
