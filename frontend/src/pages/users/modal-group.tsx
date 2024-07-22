import { Modal } from "react-bootstrap";
import { GroupDBGet, GroupPostType, ModalTextProps } from "lib/type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "lib/func";
import axios from "axios";
import useAuth from "hooks/auth.hook";
import LineButton from "components/button/line-button";
import FillButton from "components/button/fill-button";
import { updateGroup } from "services/groupService";

interface ModalGroupProps {
  show: boolean;
  text: ModalTextProps;
  handleClose: () => void;
  handleConfirm: () => void;
  group: GroupDBGet | null;
}

interface ModalGroupFormState {
  name: boolean;
  description: boolean;
}

const initialFormState: ModalGroupFormState = {
  name: true,
  description: true,
};

const ModalGroup = ({
  show,
  text,
  handleClose,
  handleConfirm,
  group,
}: ModalGroupProps) => {
  const { handleLogOut } = useAuth();

  const [form, setForm] = useState<GroupPostType>({
    name: "",
    description: "",
  });
  const [formState, setFormState] =
    useState<ModalGroupFormState>(initialFormState);

  useEffect(() => {
    if (group) {
      setForm({
        name: group.name,
        description: group.description,
      });
    }
  }, [group]);

  const handleFormChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClose = () => {
    setForm({
      name: "",
      description: "",
    });
    setFormState(initialFormState);
    handleClose();
  };

  const isValidateInputUpdate = () => {
    setFormState(initialFormState);
    if (!form.name) {
      setFormState((prev) => ({ ...prev, name: false }));
      toast.error("Field name cannot be empty!");
      return false;
    }

    return true;
  };

  const handleSubmitUpdate = async () => {
    try {
      if (!group) return;
      const isValid = isValidateInputUpdate();
      if (!isValid) return;
      let response = await updateGroup(Number(group.id), form);
      toast.success(response.message);
      onClose();
      handleConfirm();
    } catch (error) {
      console.log(">>>>check");
      if (axios.isAxiosError(error)) {
        let status = handleError(error.response?.status || 500);
        if (status === 400) {
          let data = error.response?.data;
          console.log(data);
          if (data.message) toast.error(data.message);
          if (data.data) {
            setFormState((prev) => ({
              ...prev,
              ...data.data,
            }));
          }
        } else if (status === 401) {
          handleLogOut();
        }
      }
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={onClose}
        centered
        className="modal modal-group"
      >
        <Modal.Header closeButton>
          <Modal.Title>{text.headingText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div className="content-body row">
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="name">
                  Group name (<span className="text-danger">*</span>):
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    !formState.name ? "is-invalid" : ""
                  }`}
                  name="name"
                  autoFocus
                  value={form.name}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <LineButton onClickFunction={onClose}>Close</LineButton>
          <FillButton onClickFunction={handleSubmitUpdate}>
            Save Changes
          </FillButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGroup;
