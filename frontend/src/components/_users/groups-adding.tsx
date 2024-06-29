import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { RoleType } from "src/lib/type";
import { createRoles } from "src/services/roleService";
import axios from "axios";
import { handleError } from "src/lib/func";
import useAuth from "src/hooks/auth.hook";
import FillButton from "../button/fill-button";

interface RoleListType {
  [key: string]: any;
}

const initialRoleList: RoleListType = {
  role1: {
    url: "",
    description: "",
    isValid: true,
  },
};

const GroupsAdding = () => {
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
      toast.success(data.EM);
      setRoleList({
        role1: {
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
          toast.error(error.response?.data.EM || "Bad Request");
        }
      }
    }
  };

  return (
    <div className="group-adding-container">
      <div className="content-container">
        <h3 className="group-title">Manage groups</h3>
        <div className="group-parent">
          {Object.entries(roleList).map(([key, value], index) => {
            return (
              <div className="group-child" key={key}>
                <div className="group-input form-group">
                  <label htmlFor="url">Url:</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      !value.isValid ? "is-invalid" : ""
                    }`}
                    placeholder="Example: BA..."
                    value={value.url}
                    onChange={(e) => onChangeRole(key, e)}
                  />
                </div>
                <div className="group-input form-group">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Example: Business Analyst..."
                    value={value.description}
                    onChange={(e) => onChangeRole(key, e)}
                  />
                </div>
                <div className="group-input">
                  {Object.entries(roleList).length - 1 === index && (
                    <FillButton onClickFunction={onAddInput}>
                      <FiPlusCircle />
                    </FillButton>
                  )}
                  {Object.entries(roleList).length > 1 && (
                    <FillButton onClickFunction={() => onDeleteRole(key)}>
                      <MdDelete />
                    </FillButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="group-bottom">
          <FillButton onClickFunction={onSubmit}>Save new groups</FillButton>
        </div>
      </div>
    </div>
  );
};

export default GroupsAdding;
