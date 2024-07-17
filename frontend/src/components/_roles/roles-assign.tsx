import { useEffect, useState } from "react";
import {
  GroupDBGet,
  GroupRoleType,
  ModalTextProps,
  RoleDBType,
} from "lib/type";
import {
  assignRoles,
  fetchAllRoles,
  fetchRolesByGroup,
} from "services/roleService";
import axios from "axios";
import { handleError } from "lib/func";
import useAuth from "hooks/auth.hook";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { fetchGroups } from "services/groupService";
import FillButton from "components/button/fill-button";

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

  const handlebuildDataToSave = () => {
    if (!rolePersist || !groupId) return [];

    const re: GroupRoleType[] = [];
    rolePersist.forEach((item) => {
      if (item.isAssigned) {
        re.push({
          groupId: groupId,
          roleId: item.id,
        });
      }
    });
    return re;
  };

  const handleSave = async () => {
    const dataToSave = handlebuildDataToSave();
    try {
      const data = await assignRoles(groupId!, dataToSave);
      toast.success("The roles are assigned!");
      console.log(data);
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

  return (
    <div className="role-assign-container">
      <div className="content-container">
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
                <FillButton className="mt-3" onClickFunction={handleSave}>
                  Save changes
                </FillButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesAssign;
