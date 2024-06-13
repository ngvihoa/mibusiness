import { Button, Modal } from "react-bootstrap";
import {
  GroupDBGet,
  ModalTextProps,
  createUserFormProps,
  createUserFormStateProps,
} from "../../lib/type";
import { fetchGroups } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ModalUserProps {
  show: boolean;
  text: ModalTextProps;
  handleClose: () => void;
  handleConfirm: () => void;
}

const initialForm = {
  email: "",
  username: "",
  phone: "",
  password: "",
  gender: "",
  group: "",
  address: "",
};

const initialFormState = {
  isValidEmail: true,
  isValidUsername: true,
  isValidPhone: true,
  isValidPassword: true,
  isValidGender: true,
  isValidAddress: true,
  isValidGroup: true,
};

const ModalUser = ({
  show,
  handleClose,
  text,
  handleConfirm,
}: ModalUserProps) => {
  const [group, setGroup] = useState<GroupDBGet[]>([]);
  const [form, setForm] = useState<createUserFormProps>(initialForm);
  const [formState, setFormState] =
    useState<createUserFormStateProps>(initialFormState);

  const getGroups = async () => {
    try {
      let { data } = await fetchGroups();
      if (data && +data.EC === 0) {
        console.log(data.DT);
        setGroup(data.DT);
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      toast.error("Cannot fetching data!");
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      {group.length > 0 && (
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          centered
          className="modal-user"
        >
          <Modal.Header closeButton>
            <Modal.Title>{text.headingText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content-body row">
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="email">
                  Email address (<span className="red">*</span>):
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  autoFocus
                />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="phone">
                  Phone number (<span className="red">*</span>):
                </label>
                <input type="text" className="form-control" name="phone" />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="username">
                  Username (<span className="red">*</span>):
                </label>
                <input type="text" className="form-control" name="username" />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="password">
                  Password (<span className="red">*</span>):
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
              <div className="col-12 form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" className="form-control" name="address" />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-select"
                  name="gender"
                  defaultValue={"male"}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="group">
                  Group (<span className="red">*</span>):
                </label>
                <select className="form-select" name="group">
                  {group.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalUser;
