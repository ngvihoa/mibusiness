import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { GroupDBGet, ModalTextProps, RoleDBType } from "src/lib/type";
import {
  deleteRole,
  fetchAllRoles,
  fetchRolesByGroup,
} from "src/services/roleService";
import axios from "axios";
import { handleError } from "src/lib/func";
import useAuth from "src/hooks/auth.hook";
import { toast } from "react-toastify";
import ModalConfirm from "src/components/users/modal-confirm";
import "./roles.scss";
import { Form } from "react-bootstrap";
import { fetchGroups } from "src/services/userService";

const mock: RoleDBType[] = [
  {
    id: 1,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 2,
    url: "/user/read",
    description: "",
  },
  {
    id: 3,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
  {
    id: 4,
    url: "/user/read",
    description: "Get user list",
  },
];

const initModal: ModalTextProps = {
  headingText: "",
  bodyText: "",
};

type RolePersistType = RoleDBType & {
  isAssigned: boolean;
};

const RolesAssign = () => {
  const { handleLogOut } = useAuth();

  const [groupList, setGroupList] = useState<GroupDBGet[] | null>(null);
  const [groupId, setGroupId] = useState<number | null>(null);
  const [roleList, setRoleList] = useState<RoleDBType[] | null>(null);
  const [rolePersist, setRolePersist] = useState<RolePersistType[] | null>(
    null
  );

  const handleChangeRoleAssigned = (index: number) => {
    if (!rolePersist) return;
    const newRolePersist = [...rolePersist];
    newRolePersist[index].isAssigned = !newRolePersist[index].isAssigned;
    setRolePersist(newRolePersist);
  };

  const handleBuildDataPersist = (
    roleList: RoleDBType[],
    roleAssign: RoleDBType[]
  ) => {
    if (!roleList || !roleAssign) return [];

    const tmp: RolePersistType[] = [];

    roleList.forEach((role) => {
      const tmpRole: RolePersistType = {
        ...role,
        isAssigned: roleAssign.some((role2) => role2.url === role.url),
      };
      tmp.push(tmpRole);
    });

    return tmp;
  };

  const handleChangeSelect = (id: string) => {
    if (id === "") setGroupId(null);
    else setGroupId(parseInt(id));
  };

  const getGroups = async () => {
    try {
      let data = await fetchGroups();
      setGroupList(data.DT);
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

  const getAllRoles = async () => {
    try {
      let data = await fetchAllRoles();
      setRoleList(data.DT);
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
    getAllRoles();
  }, []);

  const getRolesByGroup = async () => {
    try {
      if (groupId === null) return;
      let data = await fetchRolesByGroup(groupId);
      const res = handleBuildDataPersist(roleList!, data.DT);
      setRolePersist(res);
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
    if (groupId !== null) {
      getRolesByGroup();
    }
  }, [groupId]);

  return (
    <div className="role-assign-container">
      <div className="container">
        <h3 className="role-title">Assign roles</h3>
        <div className="role-parent">
          {groupList === null && <div>Fetching data failed...</div>}
          {groupList && groupList.length === 0 && (
            <div>No group has been created yet...</div>
          )}
          {groupList && groupList.length > 0 && (
            <>
              <div className="select-container">
                <label htmlFor="group">
                  Select group (<i>*</i>):
                </label>
                <Form.Select
                  name="group"
                  onChange={(e) => handleChangeSelect(e.target.value)}
                >
                  <option value="">Choose a group...</option>
                  {groupList.map((item, index) => (
                    <option key={index + "-" + item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="group-role-container">
                {!groupId && <div>Please choose a user group...</div>}
                {!rolePersist && groupId && (
                  <div>No role has been created yet...</div>
                )}
                {rolePersist &&
                  groupId &&
                  rolePersist.map((item, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.id}
                        id={`role-${index}`}
                        checked={item.isAssigned}
                        onChange={() => handleChangeRoleAssigned(index)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`role-${index}`}
                      >
                        {item.url}
                      </label>
                    </div>
                  ))}
              </div>
              {groupId && (
                <button className="btn btn-primary mt-3">Save changes</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesAssign;
