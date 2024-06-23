import React, { useState } from "react";
import "./roles.scss";
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";

interface RoleListType {
  [key: string]: any;
}

const initialRoleList: RoleListType = {
  role1: {
    url: "",
    description: "",
  },
};

const Roles = () => {
  const [roleList, setRoleList] = useState(initialRoleList);

  const onChangeRole = (key: string, e: any) => {
    const tmpList = { ...roleList };
    console.log(key);
    tmpList[key][e.target.name] = e.target.value;
    setRoleList(tmpList);
  };

  const onAddInput = () => {
    const tmpList = { ...roleList };
    const newIndex = uuid();
    tmpList[`child-${newIndex}`] = {
      url: "",
      description: "",
    };
    setRoleList(tmpList);
  };

  const onDeleteRole = (key: string) => {
    const tmpList = { ...roleList };
    if (delete tmpList[key]) {
      setRoleList(tmpList);
    }
  };

  return (
    <div className="role-container">
      <div className="container">
        <h3 className="role-title">Manage roles</h3>
        <div className="role-parent">
          {Object.entries(roleList).map(([key, value], index) => {
            return (
              <div className="role-child row" key={`child-${key}`}>
                <div className="role-input col-5 form-group">
                  <label htmlFor="url">Url:</label>
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="Example: /user/design..."
                    value={value.url}
                    onChange={(e) => onChangeRole(key, e)}
                  />
                </div>
                <div className="role-input col-5 form-group">
                  <label htmlFor="url">Description:</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Example: Design user..."
                    value={value.description}
                    onChange={(e) => onChangeRole(key, e)}
                  />
                </div>
                <div className="role-input col-2">
                  {Object.entries(roleList).length - 1 === index && (
                    <button className="btn btn-primary" onClick={onAddInput}>
                      <FiPlusCircle />
                    </button>
                  )}
                  {Object.entries(roleList).length > 1 && (
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteRole(key)}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="role-bottom">
          <button className="btn btn-primary">Save new roles</button>
        </div>
      </div>
    </div>
  );
};

export default Roles;
