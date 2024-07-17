import { Modal } from "react-bootstrap";
import {
  GroupDBGet,
  ModalTextProps,
  UsersType,
  createUserFormProps,
  createUserFormStateProps,
} from "lib/type";
import { createNewUser, updateUser } from "services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError, validateEmail, validatePhone } from "lib/func";
import axios from "axios";
import useAuth from "hooks/auth.hook";
import LineButton from "components/button/line-button";
import FillButton from "components/button/fill-button";
import { fetchGroups } from "services/groupService";

interface ModalUserProps {
  show: boolean;
  text: ModalTextProps;
  handleClose: () => void;
  handleConfirm: () => void;
  existData: UsersType | null;
}

const initialForm = {
  email: "",
  username: "",
  phone: "",
  password: "",
  sex: "male",
  groupId: "",
  address: "",
};

const initialFormState = {
  email: true,
  username: true,
  phone: true,
  password: true,
  sex: true,
  groupId: true,
  address: true,
};

const ModalUser = ({
  show,
  text,
  handleClose,
  handleConfirm,
  existData,
}: ModalUserProps) => {
  const { handleLogOut } = useAuth();

  const [group, setGroup] = useState<GroupDBGet[]>([]);
  const [form, setForm] = useState<createUserFormProps>(initialForm);
  const [formState, setFormState] =
    useState<createUserFormStateProps>(initialFormState);

  const getGroups = async () => {
    try {
      let data = await fetchGroups();
      setGroup(data.DT);
      setForm((prev) => ({
        ...prev,
        groupId: data.DT[0].id,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Access to config, request, and response
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        }
      }
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (existData) {
      setForm({
        email: existData.email,
        username: existData.username,
        phone: existData.phone,
        password: "",
        sex: existData.sex ?? "other",
        groupId: existData.Group
          ? String(existData.Group.id)
          : String(group[0].id),
        address: existData.address ?? "",
      });
    }
  }, [existData]);

  const handleFormChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClose = () => {
    setForm({
      ...initialForm,
      groupId: group.length ? String(group[0].id) : "",
    });
    setFormState(initialFormState);
    handleClose();
  };

  const isValidateInputCreate = () => {
    setFormState(initialFormState);

    let checkArr = ["email", "phone", "username", "password", "groupId"];
    for (let i = 0; i < checkArr.length; i++) {
      if (!form[checkArr[i]]) {
        toast.error(`Input ${checkArr[i]} is required!`);
        setFormState({
          ...initialFormState,
          [checkArr[i]]: false,
        });
        return false;
      }
    }

    if (!validateEmail(form.email)) {
      toast.error("Invalid email adddress");
      setFormState({
        ...initialFormState,
        email: false,
      });
      return false;
    }

    if (!validatePhone(form.phone)) {
      toast.warning("Phone number should have 10 digits");
      setFormState({
        ...initialFormState,
        phone: false,
      });
      return false;
    }

    if (form.password.length < 8) {
      toast.warning("Please enter at least 8 characters for the password.");
      setFormState({
        ...initialFormState,
        password: false,
      });
      return false;
    }

    return true;
  };

  const isValidateInputUpdate = () => {
    setFormState(initialFormState);

    let checkArr = ["username", "groupId"];
    for (let i = 0; i < checkArr.length; i++) {
      if (!form[checkArr[i]]) {
        toast.error(`Input ${checkArr[i]} is required!`);
        setFormState({
          ...initialFormState,
          [checkArr[i]]: false,
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmitCreate = async () => {
    try {
      const isValid = isValidateInputCreate();
      if (!isValid) return;
      let data = await createNewUser(form);
      toast.success("New user is created!");
      onClose();
      handleConfirm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let status = handleError(error.response?.status || 500);
        if (status === 400) {
          let data = error.response?.data;
          if (data.DT) {
            toast.error(data.EM);
            setFormState((prev) => ({
              ...prev,
              ...data.DT,
            }));
          }
        } else if (status === 401) {
          handleLogOut();
        }
      }
    }
  };

  const handleSubmitUpdate = async () => {
    if (!existData) return;
    try {
      const isValid = isValidateInputUpdate();
      if (!isValid) return;
      await updateUser(Number(existData.id), form);
      toast.success(`User ${existData.id} is updated!`);
      onClose();
      handleConfirm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let status = handleError(error.response?.status || 500);
        if (status === 400) {
          let data = error.response?.data;
          if (data.DT) {
            toast.error(data.EM);
            setFormState((prev) => ({
              ...prev,
              ...data.DT,
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
      {group.length > 0 && (
        <Modal
          size="lg"
          show={show}
          onHide={onClose}
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
                  className={`form-control ${
                    !formState.email ? "is-invalid" : ""
                  }`}
                  name="email"
                  autoFocus
                  value={form.email}
                  onChange={(e) => handleFormChange(e)}
                  disabled={existData != null}
                />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="phone">
                  Phone number (<span className="red">*</span>):
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    !formState.phone ? "is-invalid" : ""
                  }`}
                  name="phone"
                  value={form.phone}
                  onChange={(e) => handleFormChange(e)}
                  disabled={existData != null}
                />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="username">
                  Username (<span className="red">*</span>):
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    !formState.username ? "is-invalid" : ""
                  }`}
                  name="username"
                  value={form.username}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              {!existData ? (
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="password">
                    Password (<span className="red">*</span>):
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      !formState.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    value={form.password}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
              ) : null}
              <div
                className={`col-12 form-group ${existData ? "col-md-6" : ""}`}
              >
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  className={`form-control`}
                  name="address"
                  value={form.address}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="sex">Gender:</label>
                <select
                  className={`form-select`}
                  name="sex"
                  value={form.sex}
                  onChange={(e) => handleFormChange(e)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12 col-md-6 form-group">
                <label htmlFor="groupId">
                  Group (<span className="red">*</span>):
                </label>
                <select
                  className={`form-select ${
                    !formState.groupId ? "is-invalid" : ""
                  }`}
                  name="groupId"
                  value={form.groupId}
                  onChange={(e) => handleFormChange(e)}
                >
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
            <LineButton onClickFunction={onClose}>Close</LineButton>
            <FillButton
              onClickFunction={
                existData ? handleSubmitUpdate : handleSubmitCreate
              }
            >
              Save Changes
            </FillButton>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalUser;
