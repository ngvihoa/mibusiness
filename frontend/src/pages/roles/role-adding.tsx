import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { RoleType } from "lib/type";
import { createRoles } from "services/roleService";
import axios from "axios";
import { handleError } from "lib/func";
import useAuth from "hooks/auth.hook";
import FillButton from "components/button/fill-button";
import GeneralLayout from "components/layout/general-layout";
import LineButton from "components/button/line-button";

interface RoleListType {
  [key: string]: any;
}

const initialRoleList: RoleListType = {
  role1: {
    method: "GET",
    url: "",
    description: "",
    isValid: true,
  },
};

const methodList = ["GET", "POST", "PUT", "DELETE"];

const RoleAdding = () => {
  const { handleLogOut } = useAuth();
  const [roleList, setRoleList] = useState(initialRoleList);

  const onChangeRole = (key: string, e: any) => {
    const tmpList = { ...roleList };
    tmpList[key][e.target.name] = e.target.value;
    if (tmpList[key].url === "" && tmpList[key].isValid) {
      tmpList[key].isValid = false;
    } else if (tmpList[key].url !== "" && !tmpList[key].isValid) {
      tmpList[key].isValid = true;
    }
    setRoleList(tmpList);
  };

  const onAddInput = () => {
    const tmpList = { ...roleList };
    const newIndex = uuid();
    tmpList[`child-${newIndex}`] = {
      method: "GET",
      url: "",
      description: "",
      isValid: true,
    };
    setRoleList(tmpList);
  };

  const onDeleteRole = (key: string) => {
    const tmpList = { ...roleList };
    if (delete tmpList[key]) {
      setRoleList(tmpList);
    }
  };

  const handleValidateRoles = () => {
    const tmpValid = { ...roleList };
    let re = true;
    for (const key in roleList) {
      if (roleList[key].url === "") {
        tmpValid[key].isValid = false;
        re = false;
      } else if (roleList[key].url !== "" && !tmpValid[key].isValid) {
        tmpValid[key].isValid = true;
      }
    }
    setRoleList(tmpValid);

    if (!re) toast.error("Please enter all url fields!");
    return re;
  };

  const buildDatatoPersist = (): RoleType[] => {
    const tmpList = { ...roleList };
    const dataToPersist: RoleType[] = [];
    for (const key in tmpList) {
      dataToPersist.push({
        method: tmpList[key].method,
        url: tmpList[key].url,
        description: tmpList[key].description,
      });
    }

    return dataToPersist;
  };

  const onSubmit = async () => {
    const check = handleValidateRoles();
    if (!check) return;
    const roles = buildDatatoPersist();
    try {
      let data = await createRoles(roles);
      toast.success(data.message);
      setRoleList({
        role1: {
          method: "GET",
          url: "",
          description: "",
          isValid: true,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = handleError(error.response?.status || 500);
        if (status === 401) {
          handleLogOut();
        } else if (status === 400) {
          toast.error(error.response?.data.message || "Bad Request");
        }
      }
    }
  };

  return (
    <GeneralLayout
      classContainer="role-adding-container"
      name="Role Management"
    >
      <div className="role-parent">
        {Object.entries(roleList).map(([key, value], index) => {
          return (
            <div className="role-child" key={key}>
              <div className="role-input form-group">
                <label htmlFor="method">Method:</label>
                <select
                  className="form-select"
                  name="method"
                  value={value.method}
                  onChange={(e) => onChangeRole(key, e)}
                >
                  {methodList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="role-input form-group">
                <label htmlFor="url">
                  Url (<span className="text-danger">*</span>):
                </label>
                <input
                  type="text"
                  name="url"
                  className={`form-control ${
                    !value.isValid ? "is-invalid" : ""
                  }`}
                  placeholder="Example: /user/design..."
                  value={value.url}
                  onChange={(e) => onChangeRole(key, e)}
                />
              </div>
              <div className="role-input form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Example: Design user..."
                  value={value.description}
                  onChange={(e) => onChangeRole(key, e)}
                />
              </div>
              {Object.entries(roleList).length > 1 && (
                <div className="role-input delete-button">
                  <FillButton onClickFunction={() => onDeleteRole(key)}>
                    <MdDelete />
                  </FillButton>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="role-bottom">
        <FillButton onClickFunction={onSubmit}>Save new roles</FillButton>
        <LineButton onClickFunction={onAddInput}>Add new form</LineButton>
      </div>
    </GeneralLayout>
  );
};

export default RoleAdding;
